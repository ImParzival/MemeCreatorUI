// Initialize Fabric.js Canvas
const canvas = new fabric.Canvas('canvas', {
    width: 600,
    height: 400,
    backgroundColor: '#ffffff'
});

// Image Upload Functionality
document.getElementById('uploadButton').onclick = function() {
    document.getElementById('imageInput').click();
};

document.getElementById('imageInput').onchange = function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        fabric.Image.fromURL(event.target.result, function(img) {
            img.set({
                left: 50,
                top: 50,
                scaleX: 0.5,
                scaleY: 0.5
            });
            canvas.add(img);
            canvas.setActiveObject(img);
        });
    };
    reader.readAsDataURL(e.target.files[0]);
};

// Adding Predefined Elements to Canvas
const elements = document.querySelectorAll('.element');
elements.forEach(element => {
    element.onclick = function() {
        const imgURL = element.src;
        fabric.Image.fromURL(imgURL, function(img) {
            img.set({
                left: 100,
                top: 100,
                scaleX: 0.3,
                scaleY: 0.3,
                angle: 0
            });
            canvas.add(img);
            canvas.setActiveObject(img);
        });
    };
});

// Layer Controls
document.getElementById('bringToFront').onclick = function() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) canvas.bringToFront(activeObject);
};

document.getElementById('bringForward').onclick = function() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) canvas.bringForward(activeObject);
};

document.getElementById('sendBackward').onclick = function() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) canvas.sendBackwards(activeObject);
};

document.getElementById('sendToBack').onclick = function() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) canvas.sendToBack(activeObject);
};

// Text Font and Color Controls
document.getElementById('fontSelect').onchange = function() {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
        activeObject.set("fontFamily", this.value);
        canvas.renderAll();
    }
};

document.getElementById('colorPicker').onchange = function() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        activeObject.set("fill", this.value);
        canvas.renderAll();
    }
};

// Download Functionality
document.getElementById('downloadButton').onclick = function() {
    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas-image.png';
    link.click();
};
