import torch
import torch.nn as nn
import torch.nn.functional as F
# Define the PyramidNet architecture
class PyrBlock(nn.Module):
    def __init__(self, in_channels, out_channels, stride):
        super(PyrBlock, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, stride=stride, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, stride=1, padding=1, bias=False)
        self.bn2 = nn.BatchNorm2d(out_channels)
        self.relu = nn.ReLU(inplace=True)
        self.stride = stride

    def forward(self, x):
        identity = x

        out = self.conv1(x)
        out = self.bn1(out)
        out = self.relu(out)

        out = self.conv2(out)
        out = self.bn2(out)

        if self.stride != 1 or x.size(1) != out.size(1):
            identity = F.avg_pool2d(identity, kernel_size=1, stride=self.stride)
            identity = torch.cat((identity, torch.zeros(identity.size(0), out.size(1) - identity.size(1), identity.size(2), identity.size(3))), 1)

        out += identity
        out = self.relu(out)

        return out

class PyramidNet(nn.Module):
    def __init__(self, block, num_blocks, alpha=48, input_channels=3):
        super(PyramidNet, self).__init__()
        self.in_channels = 16

        self.conv1 = nn.Conv2d(input_channels, 16, kernel_size=3, stride=1, padding=1, bias=False)
        self.bn1 = nn.BatchNorm2d(16)
        self.relu = nn.ReLU(inplace=True)
        self.layer1 = self._make_layer(block, alpha, num_blocks[0], stride=1)
        self.layer2 = self._make_layer(block, alpha, num_blocks[1], stride=2)
        self.layer3 = self._make_layer(block, alpha, num_blocks[2], stride=2)
        self.layer4 = self._make_layer(block, alpha, num_blocks[3], stride=2)
        self.avgpool = nn.AdaptiveAvgPool2d((1, 1))
        self.fc = nn.Linear(alpha, 1)

        # Initialize weights
        for m in self.modules():
            if isinstance(m, nn.Conv2d):
                nn.init.kaiming_normal_(m.weight, mode='fan_out', nonlinearity='relu')
            elif isinstance(m, nn.BatchNorm2d):
                nn.init.constant_(m.weight, 1)
                nn.init.constant_(m.bias, 0)

    def _make_layer(self, block, alpha, num_blocks, stride):
        strides = [stride] + [1] * (num_blocks - 1)
        layers = []
        for stride in strides:
            layers.append(block(self.in_channels, alpha, stride))
            self.in_channels = alpha
        return nn.Sequential(*layers)

    def forward(self, x):
        x = self.conv1(x)
        x = self.bn1(x)
        x = self.relu(x)

        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = self.layer4(x)

        x = self.avgpool(x)
        x = torch.flatten(x, 1)
        x = self.fc(x)

        return torch.sigmoid(x)

def pyramidnet_glaucoma(input_channels=3):
    return PyramidNet(PyrBlock, [3, 4, 6, 3], alpha=48, input_channels=input_channels)