
// Seleciona todas as imagens do carrossel
const images = document.querySelectorAll('.carousel-images img');
let currentIndex = 0;

// Configura o evento de clique para o botão "next"
document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
});

// Configura o evento de clique para o botão "prev"
document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
});

// Função para atualizar o carrossel, aplicando a transição
function updateCarousel() {
    document.querySelector('.carousel-images').style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Inicializa a posição do carrossel
updateCarousel();




document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.scroll-animation');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    document.addEventListener("DOMContentLoaded", function () {
        // Animação para o header ficar visível ao rolar a página
        gsap.to("header", {
            opacity: 1, // Define a opacidade para 1 (visível)
            duration: 1, // Duração da animação
            ease: "power2.out", // Efeito de transição
            scrollTrigger: {
                trigger: "#sobre", // Inicia a animação quando chegar na seção "sobre"
                start: "top top", // Inicia a animação quando o topo do "sobre" alcançar o topo da viewport
                toggleActions: "play none none none" // Ativa a animação sem reverter
            }
        });
    });
});

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*========== Ativa link da seção ao rolar ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
              // Torna o header sticky e visível quando rolar para baixo
    header.classList.toggle('sticky', window.scrollY > 100);

    // Fecha o menu quando rolar
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
        }
    });

    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.scroll-animation');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);  // Para de observar após a animação ser ativada
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
});


// Configurações do ScrollReveal
ScrollReveal({
    distance: '250px', // Aumenta a distância para maior impacto
    duration: 2500,    // Tempo de duração da animação
    delay: 350,        // Atraso para os elementos aparecerem
    easing: 'ease-in-out', // Efeito de aceleração para suavidade
    opacity: 0,        // Começa com opacidade 0 para um efeito de fade-in
    reset: true        // Permite que o efeito aconteça novamente ao rolar a página
});

// Animações de revelação
ScrollReveal().reveal('.home-content , .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });


/*========== Inicializa o swiper ==========*/
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// Alterna o modo escuro
let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};

// Configurações do ScrollReveal
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

// Animações de revelação
ScrollReveal().reveal('.home-content , .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });

// Configurações do GSAP com ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
let speed = 100;

// Definições de animação para a cena 1
let scene1 = gsap.timeline();
ScrollTrigger.create({
    animation: scene1,
    trigger: ".scrollElement",
    start: "top top",
    end: "45% 100%",
    scrub: 3,
});

scene1.to("#h1-1", { y: 3 * speed, x: 1 * speed, scale: 0.9, ease: "power1.in" }, 0);
// (continua com as animações restantes para cena 1, 2, etc.)

// Função para resetar a posição do scrollbar após refresh
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};

// Controle de tela cheia
let fullscreen;
let fsEnter = document.getElementById('fullscr');
fsEnter.addEventListener('click', function (e) {
    e.preventDefault();
    if (!fullscreen) {
        fullscreen = true;
        document.documentElement.requestFullscreen();
        fsEnter.innerHTML = "Exit Fullscreen";
    } else {
        fullscreen = false;
        document.exitFullscreen();
        fsEnter.innerHTML = "Go Fullscreen";
    }
});
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
