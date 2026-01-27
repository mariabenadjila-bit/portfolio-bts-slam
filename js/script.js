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
    'linkedin': ['images/screenshots/linkedin/1.jpg', 'images/screenshots/linkedin/2.jpg'],
    'site-orange': ['images/screenshots/site-orange/1.jpg', 'images/screenshots/site-orange/2.jpg', 'images/screenshots/site-orange/3.jpg'],
    'glpi': ['images/screenshots/glpi/1.jpg', 'images/screenshots/glpi/2.jpg'],
    'wordpress': ['images/screenshots/wordpress/1.jpg', 'images/screenshots/wordpress/2.jpg'],
    'shopify': ['images/screenshots/shopify/1.jpg'],
    'projet-c': ['images/screenshots/projet-c/1.jpg', 'images/screenshots/projet-c/2.jpg'],
    'calculatrice': ['images/screenshots/calculatrice/1.jpg'],
    'page-liens': ['images/screenshots/page-liens/1.jpg'],
    'jeu-bulle': ['images/screenshots/jeu-bulle/1.jpg', 'images/screenshots/jeu-bulle/2.jpg'],
    'la-base-1': ['images/screenshots/la-base-1/1.jpg'],
    'la-base-2': ['images/screenshots/la-base-2/1.jpg'],
    'bacchus': ['images/screenshots/bacchus/1.jpg', 'images/screenshots/bacchus/2.jpg'],
    'back-office': ['images/screenshots/back-office/1.jpg', 'images/screenshots/back-office/2.jpg']
};

// Ouvrir la modal au clic sur une cellule
document.querySelectorAll('.cell-filled').forEach(cell => {
    cell.addEventListener('click', function() {
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
                `images/projects/${currentProject}/1.jpg`,
                `images/projects/${currentProject}/2.jpg`,
                `images/projects/${currentProject}/3.jpg`
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
