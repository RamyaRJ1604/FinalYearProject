const texts = [ 
                { 
                  title: "The Opening Act ;)"
                },
                { title: "Meet Sarah", 
                  text: "Sarah loves spending time outdoors, reading books, and enjoying the company of her family. She has always cherished her vision and the beauty of the world around her."
                },
                { title: "The Silent Thief", 
                  text: "One day, Sarah learns about glaucoma, often called \"the silent thief of sight.\" It's like a sneaky villain that steals vision without warning, often without noticeable symptoms until it's too late."
                }, 
                { title: "The Eyes' Drainage System", 
                  text: "Sarah learns that everyone's eyes have a drainage system, much like a sink. This drainage system helps maintain the right pressure inside the eye. But in glaucoma, this system gets clogged, causing pressure to build up."
                },
                { title: "Damage to the Optic Nerve", 
                  text: "As pressure builds, it damages the optic nerve, the cable-like structure that carries visual information from the eye to the brain. This damage is irreversible, leading to permanent vision loss."
                },
                { title: "Risk Factors", 
                  text: "Sarah discovers that while anyone can develop glaucoma, certain factors increase the risk, like age, family history, high eye pressure, and certain medical conditions like diabetes."
                },
                { title: "Types of Glaucoma", 
                  text: "There are different types of glaucoma, including open-angle and angle-closure glaucoma. Each type has its own characteristics and treatment approaches."
                },
                { title: "Regular Eye Exams", 
                  text: "Sarah learns that the best defense against glaucoma is early detection. Regular eye exams, even without symptoms, can catch glaucoma in its early stages when treatments are most effective."
                },
                { title: "The Importance of Eye Pressure", 
                  text: "Eye pressure, also known as intraocular pressure (IOP), is a key factor in glaucoma. However, not everyone with high eye pressure has glaucoma, and vice versa. Regular eye exams help monitor this crucial indicator."
                },
                { title: "Treatment Options", 
                  text: "If diagnosed with glaucoma, Sarah learns that treatments can help manage the condition and prevent further vision loss. These may include eye drops, oral medications, laser therapy, or surgery, depending on the type and severity of glaucoma."
                },
                { title: "Lifestyle Choices", 
                  text: "Sarah discovers that certain lifestyle choices, like maintaining a healthy diet, exercising regularly, protecting her eyes from injury, and avoiding smoking, can also help lower the risk of developing glaucoma."
                },
                { title: "Vision Rehabilitation", 
                  text: "Although glaucoma-related vision loss is irreversible, Sarah finds hope in vision rehabilitation programs. These programs offer strategies and tools to help individuals with vision loss lead fulfilling lives."
                },
                { title: "Spreading Awareness", 
                  text: "Inspired by her newfound knowledge, Sarah becomes an advocate for glaucoma awareness. She shares what she's learned with her friends, family, and community, encouraging everyone to prioritize their vision health and get regular eye check-ups."
                },
                { 
                  title: "That's all folks!"
                }
              ]; 

let currentIndex = 0;
const textContainer = document.getElementById("textContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Create text divs and store them in an array
const textDivs = texts.map(item => {
  const div = document.createElement("div");
  div.classList.add("text");
  
  // Create title element
  const title = document.createElement("h2");
  title.textContent = item.title;
  title.classList.add("title")
  
  // Create text element
  const text = document.createElement("p");
  text.textContent = item.text;
  
  // Append title and text elements to the div
  div.appendChild(title);
  div.appendChild(text);

  return div;
});

console.log(textDivs)

// Function to fade in text
function fadeInText(div) {
  div.style.opacity = 1;
}

// Function to fade out text
function fadeOutText(div) {
  div.style.opacity = 0;
}

// Function to set current text
function setText(index) {
  if(index >= 0 && index <= 11){
    textContainer.innerHTML = ""; // Clear previous text
    textContainer.appendChild(textDivs[index]); // Append the current text div
  }
  else if (index >= textDivs.length) {
    textContainer.innerHTML = "";
    textContainer.appendChild(textDivs[textDivs.length-1]);
  } else if (index < 0) {
    textContainer.innerHTML = ""; 
    textContainer.appendChild(textDivs[0]);
  }
}

// Function to show next text
function showNextText() {
  fadeOutText(textDivs[currentIndex]);
  setTimeout(() => {
    currentIndex = (currentIndex + 1);
    setText(currentIndex);
    fadeInText(textDivs[currentIndex]);
  }, 1000);
}

// Function to show previous text
function showPrevText() {
  fadeOutText(textDivs[currentIndex]);
  setTimeout(() => {
    currentIndex = (currentIndex - 1);
    setText(currentIndex);
    fadeInText(textDivs[currentIndex]);
  }, 1000);
}

setText(currentIndex);

nextBtn.addEventListener("click", showNextText);

prevBtn.addEventListener("click", showPrevText);


















// let currentIndex = 0;
// const textContainer = document.getElementById("textContainer");
// const prevBtn = document.getElementById("prevBtn");
// const nextBtn = document.getElementById("nextBtn");

// function fadeInText() {
//   textContainer.style.opacity = 1;
// }

// function fadeOutText() {
//   textContainer.style.opacity = 0;
// }

// function setText() {
//   textContainer.innerText = texts[currentIndex];
// }

// function showNextText() {
//   fadeOutText();
//   setTimeout(() => {
//     currentIndex = (currentIndex + 1) % texts.length;
//     setText();
//     fadeInText();
//   }, 500);
// }

// function showPrevText() {
//   fadeOutText();
//   setTimeout(() => {
//     currentIndex = (currentIndex - 1 + texts.length) % texts.length;
//     setText();
//     fadeInText();
//   }, 500);
// }

// setText();

// nextBtn.addEventListener("click", showNextText);
// prevBtn.addEventListener("click", showPrevText);

// Your list of strings
// const texts = ["String 1", "String 2", "String 3"];
