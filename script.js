//navbar
function toggleMenu() {
    var navLinks = document.getElementById("navLinks");
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
    }
}

// Empêcher la fermeture automatique sur grand écran
document.addEventListener("click", function(event) {
    var navLinks = document.getElementById("navLinks");
    var menuToggle = document.querySelector(".menu-toggle");

    // Vérifie si l'écran est petit (mobile)
    if (window.innerWidth <= 1000) {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.style.display = "none";
        }
    }
});


//chargement

  window.addEventListener("load", function() {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // doit être égal à la transition CSS
  });


//apparition de header
let lastScrollTop = 0;
const header = document.getElementById("mainHeader");
const hideThreshold = 150; // seuil à partir duquel le header peut se cacher

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop <= hideThreshold) {
    // Tant qu'on est proche du haut, le header reste visible
    header.style.top = "0";
  } else {
    if (scrollTop > lastScrollTop) {
      // On descend après avoir dépassé le seuil → cacher le header
      header.style.top = "-140px"; // ou la hauteur de ton header
    } else {
      // On remonte → montrer le header
      header.style.top = "0";
    }
  }

  lastScrollTop = scrollTop;
});


//slide 
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".slide-content h1, .slide-content .select-box1, .select-box2");
    items.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      setTimeout(() => {
        el.style.transition = "all 1s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, index * 500);
    });
  });




//calendrier



//pourquoi nous choisir
document.addEventListener("DOMContentLoaded", function() {
    let whyChooseUs = document.getElementById("whyChooseUs");
    let question = document.querySelector(".question");
    let slider = document.querySelector(".features-slider");
    let slides = document.querySelectorAll(".features");
    let currentSlide = 0;

    setTimeout(() => {
        whyChooseUs.classList.add("visible");
        question.classList.add("visible");
    }, 1000);

    setTimeout(() => {
        slider.classList.add("visible");
        showSlide(0);
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 4000);
    }, 2000);

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }
});



//nos logements
const track = document.getElementById('carouselItems');
const indicators = document.getElementById('carouselIndicators');
const leftBtn = document.querySelector('.nav-left');
const rightBtn = document.querySelector('.nav-right');

const cards = Array.from(track.children);
const visible = 3;
let current = 0;
let cardWidth = 0;
let maxIndex = 0;

function updateDimensions() {
  if (cards.length > 0) {
    cardWidth = cards[0].offsetWidth + 24; // largeur carte + gap
    maxIndex = cards.length - visible;
  }
  shiftCarousel(0, true); // repositionnement
  refreshIndicators();
  refreshButtons();
}

function shiftCarousel(step, force = false) {
  if (!force) current += step;
  if (current < 0) current = 0;
  if (current > maxIndex) current = maxIndex;

  track.style.transform = `translateX(-${current * cardWidth}px)`;
  refreshIndicators();
  refreshButtons();
}

function jumpTo(index) {
  current = index;
  track.style.transform = `translateX(-${current * cardWidth}px)`;
  refreshIndicators();
  refreshButtons();
}

function refreshButtons() {
  leftBtn.disabled = current === 0;
  rightBtn.disabled = current === maxIndex;

  leftBtn.style.opacity = current === 0 ? "0.4" : "1";
  leftBtn.style.cursor = current === 0 ? "not-allowed" : "pointer";

  rightBtn.style.opacity = current === maxIndex ? "0.4" : "1";
  rightBtn.style.cursor = current === maxIndex ? "not-allowed" : "pointer";
}

function refreshIndicators() {
  const all = document.querySelectorAll('#carouselIndicators span');
  all.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === current);
  });
}

function createIndicators() {
  indicators.innerHTML = '';
  for (let i = 0; i <= cards.length - visible; i++) {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => jumpTo(i));
    indicators.appendChild(dot);
  }
}

window.addEventListener('resize', updateDimensions);

createIndicators();
updateDimensions();


//travel guide
const conteneurParcours = document.getElementById("conteneurParcours");
const pointsNavigation = document.getElementById("pointsNavigation");
const btnGauche = document.querySelector(".btn-nav.gauche");
const btnDroite = document.querySelector(".btn-nav.droite");

const nombreTotalCartes = 6;
const cartesVisibles = 2;
let indexActuel = 0;

function defilerCartes(direction) {
  const indexMax = nombreTotalCartes - cartesVisibles;
  indexActuel += direction;
  if (indexActuel < 0) indexActuel = 0;
  if (indexActuel > indexMax) indexActuel = indexMax;
  mettreAJourParcours();
}

function mettreAJourParcours() {
  const decalage = -(indexActuel * (350 + 50));
  conteneurParcours.style.transform = `translateX(${decalage}px)`;
  mettreAJourPoints();
  mettreAJourBoutons();
}

function mettreAJourPoints() {
  pointsNavigation.innerHTML = "";
  const nombrePoints = nombreTotalCartes - cartesVisibles + 1;
  for (let i = 0; i < nombrePoints; i++) {
    const point = document.createElement("span");
    point.className = i === indexActuel ? "actif" : "";
    point.onclick = () => {
      indexActuel = i;
      mettreAJourParcours();
    };
    pointsNavigation.appendChild(point);
  }
}

function mettreAJourBoutons() {
  const indexMax = nombreTotalCartes - cartesVisibles;

  // Gérer le bouton gauche
  btnGauche.disabled = indexActuel === 0;
  btnGauche.style.opacity = indexActuel === 0 ? "0.4" : "1";
  btnGauche.style.cursor = indexActuel === 0 ? "not-allowed" : "pointer";

  // Gérer le bouton droite
  btnDroite.disabled = indexActuel === indexMax;
  btnDroite.style.opacity = indexActuel === indexMax ? "0.4" : "1";
  btnDroite.style.cursor = indexActuel === indexMax ? "not-allowed" : "pointer";
}

mettreAJourParcours();




    

/* pour ne pas voir le code source de la page */
 // Empêcher clic droit
 document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // Empêcher Ctrl+U, Ctrl+S, Ctrl+Shift+I, F12, etc.
  document.addEventListener('keydown', function(e) {
    if (
      e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'U' || e.key === 'S') ||
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'C'))
    ) {
      e.preventDefault();
    }
  });

  // Empêcher glisser-déposer d'image/texte
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
  });





