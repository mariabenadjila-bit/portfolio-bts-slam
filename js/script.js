// Animation de chargement
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    
    setTimeout(() => {
        loader.classList.add('hidden');
        document.querySelector('#accueil').classList.add('visible');
    }, 2500);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer pour les animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animer les barres de compétences
            if (entry.target.id === 'competences' || entry.target.id === 'outils') {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

// Observer toutes les sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Gestion du formulaire de contact
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    
    // Simulation d'envoi
    formMessage.className = 'form-message success';
    formMessage.textContent = `Merci ${nom} ! Votre message a été envoyé avec succès. Je vous répondrai rapidement à ${email}.`;
    
    // Réinitialiser le formulaire
    this.reset();
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

/* ==========================================
   ANIMATION DU NOM (TYPING EFFECT + COEUR)
   ========================================== */
const nameText = "Maria Benadjila";
const typedNameElement = document.getElementById("typedName");
const cursorElement = document.querySelector(".cursor");
const heartElement = document.querySelector(".heart-animation");

let charIndex = 0;
const typingSpeed = 120;
const pauseAfterTyping = 1200;  // pause après écriture
const pauseAfterHeart = 2000;   // pause après le cœur

function typeWriter() {
    if (charIndex < nameText.length) {
        typedNameElement.textContent += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Fin écriture → cacher curseur + afficher cœur
        cursorElement.classList.add("hidden");
        heartElement.classList.add("show");

        // Attendre un peu puis recommencer
        setTimeout(resetAnimation, pauseAfterHeart);
    }
}

function resetAnimation() {
    // Reset tout
    charIndex = 0;
    typedNameElement.textContent = "";

    cursorElement.classList.remove("hidden");
    heartElement.classList.remove("show");

    // Petite pause avant de retaper
    setTimeout(typeWriter, pauseAfterTyping);
}

// Démarrage initial après chargement
window.addEventListener("load", () => {
    setTimeout(typeWriter, 2000);
});

// Démarrer l'animation après le chargement
window.addEventListener('load', () => {
    setTimeout(() => {
        typeWriter();
    }, 3000);
});

/* ==========================================
   TABLEAU DE COMPÉTENCES - MODAL
   ========================================== */
const modal = document.getElementById('screenshotModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');
const currentImageNumber = document.getElementById('currentImageNumber');
const totalImages = document.getElementById('totalImages');

let currentProject = '';
let currentImageIndex = 0;
let projectImages = {};

// Définir les captures d'écran pour chaque projet
projectImages = {
    
    'Blog Évasion': ['images/screenshots/Blog Évasion/1.png', 'images/screenshots/Blog Évasion/2.png', 'images/screenshots/Blog Évasion/3.png', 'images/screenshots/Blog Évasion/4.png', 'images/screenshots/Blog Évasion/5.png', 'images/screenshots/Blog Évasion/6.png'],
    'Installation de GLPI': ['images/screenshots/Installation de GLPI/1.png', 'images/screenshots/Installation de GLPI/2.png', 'images/screenshots/GLPI/3.png'],
    'E-Enseignements': ['images/screenshots/E-Enseignements/1.png', 'images/screenshots/E-Enseignements/2.png', 'images/screenshots/E-Enseignements/3.png'],
    'Shopify': ['images/screenshots/Shopify/1.png', 'images/screenshots/Shopify/2.png', 'images/screenshots/Shopify/3.png'],
    'Snake en C': ['images/screenshots/Snake en C/1.png', 'images/screenshots/Snake en C/2.png', 'images/screenshots/Snake en C/2.png'],
    'MoodScents': ['images/screenshots/MoodScents/1.png', 'images/screenshots/MoodScents/2.png', 'images/screenshots/MoodScents/3.png'],
    'Autoecole': ['images/screenshots/Autoecole/1.png', 'images/screenshots/Autoecole/2.png', 'images/screenshots/Autoecole/3.png'],
    'API': ['images/screenshots/API/1.jpeg', 'images/screenshots/API/2.jpeg', 'images/screenshots/API/3.jpeg', 'images/screenshots/API/4.jpeg', 'images/screenshots/API/5.jpeg', 'images/screenshots/API/6.jpeg'],
    'Coding game': ['images/screenshots/Coding game/1.png', 'images/screenshots/Coding game/2.png', 'images/screenshots/Coding game/3.png'],
 
};

// Ouvrir la modal au clic sur une cellule
document.querySelectorAll('.cell-filled').forEach(cell => {
    cell.addEventListener('click', function() {
        // Vérifier si c'est la case LinkedIn
        const linkedinUrl = this.getAttribute('data-linkedin');
        if (linkedinUrl) {
            window.open(linkedinUrl, '_blank');
            return;
        }
        
        // Vérifier si c'est une case GitHub
        const githubUrl = this.getAttribute('data-github');
        if (githubUrl) {
            window.open(githubUrl, '_blank');
            return;
        }
        
        // Sinon, ouvrir la galerie d'images
        currentProject = this.getAttribute('data-project');
        if (projectImages[currentProject]) {
            currentImageIndex = 0;
            showModal();
        }
    });
});

// Ouvrir la modal pour les thumbnails des projets
document.querySelectorAll('.project-thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        currentProject = this.getAttribute('data-project');
        // Définir les images pour les nouveaux projets
        if (!projectImages[currentProject]) {
            projectImages[currentProject] = [
                `images/screenshots/${currentProject}/1.png`,
                `images/screenshots/${currentProject}/2.png`,
                `images/screenshots/${currentProject}/3.png`
            ];
        }
        currentImageIndex = 0;
        showModal();
    });
});

function showModal() {
    modal.classList.add('active');
    updateImage();
}

function updateImage() {
    const images = projectImages[currentProject];
    if (images && images[currentImageIndex]) {
        modalImage.src = images[currentImageIndex];
        currentImageNumber.textContent = currentImageIndex + 1;
        totalImages.textContent = images.length;
    }
}

// Fermer la modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Navigation dans les images
modalPrev.addEventListener('click', () => {
    const images = projectImages[currentProject];
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateImage();
    }
});

modalNext.addEventListener('click', () => {
    const images = projectImages[currentProject];
    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        updateImage();
    }
});

// Navigation au clavier
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            modalPrev.click();
        } else if (e.key === 'ArrowRight') {
            modalNext.click();
        } else if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    }
});
