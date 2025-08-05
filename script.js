// Navbar mobile avec animation fluide + dropdown villes avec transition + header qui disparaît au scroll

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("showing");
}

// Slide toggle helpers
function slideDown(element) {
  element.style.display = 'flex';
  element.style.height = '0px';
  element.classList.add('showing');
  const fullHeight = element.scrollHeight + "px";
  requestAnimationFrame(() => {
    element.style.height = fullHeight;
  });
  setTimeout(() => {
    element.style.height = 'auto';
  }, 400);
}

function slideUp(element) {
  element.style.height = element.scrollHeight + "px";
  requestAnimationFrame(() => {
    element.style.height = '0px';
  });
  setTimeout(() => {
    element.style.display = 'none';
    element.classList.remove('showing');
  }, 400);
}

function toggleDropdown(contentId, containerId) {
  const dropdown = document.getElementById(contentId);
  const container = document.getElementById(containerId);
  const isOpen = dropdown.classList.contains('showing');

  // Fermer tous les autres
  document.querySelectorAll('.fullwidth-dropdown-content').forEach(el => {
    if (el !== dropdown && el.classList.contains('showing')) {
      slideUp(el);
    }
  });

  document.querySelectorAll('.dropdown').forEach(el => {
    if (el !== container) {
      el.classList.remove('open');
    }
  });

  if (!isOpen) {
    slideDown(dropdown);
    container.classList.add('open');
  } else {
    slideUp(dropdown);
    container.classList.remove('open');
  }
}

// Fermer dropdowns et menu si on clique ailleurs
document.addEventListener("click", function (e) {
  if (!e.target.closest('.dropdown') && !e.target.closest('.fullwidth-dropdown-content')) {
    document.querySelectorAll('.fullwidth-dropdown-content.showing').forEach(el => slideUp(el));
    document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));
  }
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("navLinks");
  if (window.innerWidth <= 1000 && !menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("showing");
  }
});



// Apparition/disparition du header + fermeture menu/dropdown au scroll
let lastScrollTop = 0;
const header = document.getElementById("mainHeader");
const navLinks = document.getElementById("navLinks");
const hideThreshold = 150;

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop <= hideThreshold) {
    header.style.top = "0";
  } else {
    if (scrollTop > lastScrollTop) {
      // Scroll vers le bas → cacher header
      header.style.top = "-140px";

      // Fermer tous les dropdowns
      document.querySelectorAll('.fullwidth-dropdown-content.showing').forEach(el => slideUp(el));
      document.querySelectorAll('.dropdown.open').forEach(el => el.classList.remove('open'));

      // Fermer menu mobile
      if (window.innerWidth <= 1000) {
        navLinks.classList.remove("showing");
      }

    } else {
      // Scroll vers le haut → montrer header
      header.style.top = "0";
    }
  }

  lastScrollTop = scrollTop;
});


//direction select
function redirectHebergement() {
    const ville = document.getElementById("ville1").value.toLowerCase();
    if (ville === "agadir") {
      window.location.href = "../locations-vacances-agadir/";
    } else if (ville === "marrakech") {
      window.location.href = "../locations-vacances-marrakech/";
    }
  }

  function redirectGuide() {
    const ville = document.getElementById("ville2").value.toLowerCase();
    if (ville === "agadir") {
      window.location.href = "../guide-agadir/";
    } else if (ville === "marrakech") {
      window.location.href = "../guide-marrakech/";
    }
  }


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

// les cards de ville
 document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.carddis');
    const dots = document.querySelectorAll('.dot');
    let current = 0;

    function showCard(index) {
      cards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
        dots[i].classList.toggle('active-dot', i === index);
      });
      current = index;
    }

    // Auto-change every 5s
    setInterval(() => {
      let next = (current + 1) % cards.length;
      showCard(next);
    }, 4000);

    // Navigation par clic
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showCard(index));
    });
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

const nombreTotalCartes = 10;
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




 


//dropdown footer
function toggleFooterDropdown(contentId, toggleElement) {
  const dropdown = document.getElementById(contentId);
  const container = toggleElement.closest(".footer-dropdown");

  const isOpen = container.classList.contains("open");

  // Fermer tous les autres
  document.querySelectorAll(".footer-dropdown").forEach(el => {
    el.classList.remove("open");
    const content = el.querySelector(".footer-dropdown-content");
    if (content) content.style.height = "0px";
  });

  if (!isOpen) {
    container.classList.add("open");
    const content = container.querySelector(".footer-dropdown-content");
    const fullHeight = content.scrollHeight + "px";
    content.style.height = fullHeight;

    // Remettre à auto après animation
    setTimeout(() => {
      content.style.height = "auto";
    }, 400);
  }
}

// Fermer si on clique ailleurs
document.addEventListener("click", function (e) {
  const isInsideFooterDropdown = e.target.closest(".footer-dropdown");
  if (!isInsideFooterDropdown) {
    document.querySelectorAll(".footer-dropdown").forEach(el => {
      el.classList.remove("open");
      const content = el.querySelector(".footer-dropdown-content");
      if (content) content.style.height = "0px";
    });
  }
});




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





