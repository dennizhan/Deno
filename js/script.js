
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


document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('myAudio');
    const currentTimeSpan = document.getElementById('currentTime');
    const totalTimeSpan = document.getElementById('totalTime');

    // Function to format time (e.g., 65 seconds becomes 1:05)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Event listener for when the audio metadata is loaded (to get total duration)
    audio.addEventListener('loadedmetadata', function() {
        totalTimeSpan.textContent = formatTime(audio.duration);
        // Autoplay politikasından dolayı ilk başta çalmayabilir,
        // ancak metadata yüklendiğinde süreyi gösterebiliriz.
    });

    // Event listener for time updates
    audio.addEventListener('timeupdate', function() {
        const currentTime = audio.currentTime;
        // Update the current time display
        currentTimeSpan.textContent = formatTime(currentTime);
    });

    // Ses yüklenemediğinde veya oynatma engellendiğinde hata ayıklama için
    audio.addEventListener('error', function(e) {
        console.error("Müzik yüklenirken veya oynatılırken bir hata oluştu:", e);
    });

    // Tarayıcının autoplay politikaları nedeniyle bazen `play()`'i
    // kullanıcı etkileşimi olmadan çağırmak başarısız olabilir.
    // Ancak `autoplay` ve `loop` HTML'de olduğu için genellikle JavaScript tarafında
    // manuel `play()` çağrısına gerek kalmaz.
    // Eğer müzik hiç başlamazsa ve bu HTML'deki autoplay nedeniyle değilse,
    // bir kullanıcı etkileşimi (örneğin bir tıklama) sonrası `audio.play()` deneyebilirsiniz.
});

const startScreen = document.getElementById('start-screen');

startScreen.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    const audio = document.getElementById("audio");

    audio.play().catch((err) => {
        console.error("Ses oynatılamadı:", err);
        alert("Tarayıcı ses çalmaya izin vermedi.");
    });
});