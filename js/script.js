
const rotatingDiv = document.getElementById('main');
const container = document.querySelector('.container');

/*const path = "../static/";
const randomNum = Math.floor((Math.random() * 2) + 1);
const background = path + randomNum + '.jpg';

document.body.style.backgroundImage = `url('${background}')`;*/

// Get container bounds
function updateRotation(e) {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation angles (limit the rotation for better effect)
    const maxRotation = 10  ; // Maximum rotation in degrees
    const rotateX = (mouseY / (rect.height / 2)) * -maxRotation;
    const rotateY = (mouseX / (rect.width / 2)) * maxRotation;
    
    // Apply the transformation
    rotatingDiv.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(20px)
    `;
}

// Reset rotation when mouse leaves
function resetRotation() {
    rotatingDiv.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        translateZ(0px)
    `;
}

// Add event listeners only for the rotating div
rotatingDiv.addEventListener('mouseenter', function() {
    document.addEventListener('mousemove', updateRotation);
});

rotatingDiv.addEventListener('mouseleave', function() {
    document.removeEventListener('mousemove', updateRotation);
    resetRotation();
});

// Add click effect
rotatingDiv.addEventListener('click', function() {
    this.style.transform += ' scale(0.95)';
    setTimeout(() => {
        this.style.transform = this.style.transform.replace(' scale(0.95)', '');
    }, 150);
});