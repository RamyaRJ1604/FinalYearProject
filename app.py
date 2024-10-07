from flask import Flask, render_template, request, redirect, url_for, jsonify
from PIL import Image
import torchvision.transforms as transforms
import torch
from model import pyramidnet_glaucoma

app = Flask(__name__)

# Define the transformation for image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Load the PyTorch model
model = pyramidnet_glaucoma()
model.load_state_dict(torch.load('pyramidnet_glaucoma_model_200.h5', map_location="cpu"))
model.eval()

# Define class labels
class_labels = {1: 'Normal', 0: 'Glaucoma'}

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Check if an image file is provided in the request
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        # Read the image file from the request
        image_file = request.files['image']

        # Open the image using PIL
        image = Image.open(image_file).convert('RGB')

        # Preprocess the image
        image = transform(image).unsqueeze(0)  # Add batch dimension

        # Make prediction
        with torch.no_grad():
            output = model(image)
            predicted_class = torch.round(output).item()
            predicted_label = class_labels[predicted_class]

        # Redirect to result page with prediction
        return redirect(url_for('result', prediction=predicted_label))

    return render_template('index.html')

@app.route('/result/<prediction>')
def result(prediction):
    return render_template('result.html', prediction=prediction)

if __name__ == '__main__':
    app.run(debug=True)