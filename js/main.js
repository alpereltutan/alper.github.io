let currentX = 0;
let currentY = 0;
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0; // Dokunmatik cihazları kontrol et

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

document.addEventListener("mousemove", (event) => {
    if (!isTouchDevice) { // Eğer dokunmatik bir cihaz değilse
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const targetX = (mouseX / windowWidth - 0.5) * 5;
        const targetY = (mouseY / windowHeight - 0.5) * 5;

        // Hareketi daha yumuşak hale getirmek için animasyon döngüsüne al
        requestAnimationFrame(() => animateBackground(targetX, targetY));
    }
});

function animateBackground(targetX, targetY) {
    currentX = lerp(currentX, targetX, 0.2); // Küçük t değeri daha yumuşak geçiş sağlar
    currentY = lerp(currentY, targetY, 0.2);

    document.querySelector(".background").style.transform = `scale(1.10) translate(${currentX}vw, ${currentY}vh)`;
}

// Her 'mouseup' olayında .social sınıfındaki öğeleri yenile
document.addEventListener('mouseup', () => {
    document.querySelectorAll('.social').forEach(el => {
        el.classList.remove('social-active'); // Durumu sıfırla
    });
});

// '.social' öğesine 'mousedown' (basılı tutma) olayı ekle
document.querySelectorAll('.social').forEach(el => {
    el.addEventListener('mousedown', () => {
        el.classList.add('social-active');
    });
});


document.addEventListener("DOMContentLoaded", () => {
    particlesJS.load('particles-js', 'js/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

    // Intersection Observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Tüm kartları gözlemlemeye ekle
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});