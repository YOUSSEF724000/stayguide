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

// Loader
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
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

// detail

function toggleDetails(event) {
  const section = event.target.closest(".section");
  if (!section) return;

  const details = section.querySelector(".details");
  if (!details) return;

  const isOpen = section.classList.contains("open");

  if (isOpen) {
    // Fermer la section avec animation
    details.style.maxHeight = "0";
    details.style.opacity = "0";

    // Scroll vers le haut de la section fermée
    const offsetTop = section.getBoundingClientRect().top + window.scrollY - 200;
    setTimeout(() => {
      details.style.display = "none";
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }, 300); // attendre la fin de l'animation

    section.classList.remove("open");
  } else {
    // Ouvrir la section
    details.style.display = "block";
    details.style.maxHeight = `${details.scrollHeight}px`;
    details.style.opacity = "1";
    section.classList.add("open");

    // Scroll vers la section ouverte
    const offsetTop = section.getBoundingClientRect().top + window.scrollY - 200;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;

  // Si on a un #id dans l'URL
  if (hash) {
    const section = document.querySelector(hash);
    if (section && section.classList.contains("section")) {
      const details = section.querySelector(".details");
      if (details) {
        details.style.display = "block";
        details.style.maxHeight = `${details.scrollHeight}px`;
        details.style.opacity = "1";
        section.classList.add("open");

        setTimeout(() => {
          const offsetTop = section.getBoundingClientRect().top + window.scrollY - 200;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }, 100);
      }
    }
  }

  // Sinon on ouvre la première section
  else {
    const firstSection = document.querySelector(".section");
    if (firstSection) {
      const details = firstSection.querySelector(".details");
      if (details) {
        details.style.display = "block";
        details.style.maxHeight = `${details.scrollHeight}px`;
        details.style.opacity = "1";
        firstSection.classList.add("open");
      }
    }
  }
});




//ouvrir et aller
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;

    if (hash) {
      const section = document.querySelector(hash);
      if (section && section.classList.contains("section")) {
        const details = section.querySelector(".details");

        if (details) {
          // Ouvrir la section comme avant
          details.style.display = "block";
          details.style.maxHeight = `${details.scrollHeight}px`;
          details.style.opacity = "1";
          section.classList.add("open");

          // Scroll avec un décalage (ex: 80px)
          setTimeout(() => {
            const offsetTop = section.getBoundingClientRect().top + window.scrollY - 380;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }, 100); // léger délai pour que le DOM s'ajuste
        }
      }
    }
  });







/*carte*/

var initialView = { lat: 30.524498, lng: -9.660678, zoom: 11 };

var map = L.map('map', {
    attributionControl: false,
    fullscreenControl: true
}).setView([initialView.lat, initialView.lng], initialView.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function createCustomIcon(svg) {
    return L.divIcon({
        className: '',
        html: `<div class="custom-marker"><img src="data:image/svg+xml;base64,${btoa(svg)}" /></div>`,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    });
}
// Contrôle de couches déplacé en bas à gauche
  var baseMaps = {
    "Plan": osmLayer,
    "Satellite": satelliteLayer
  };

  L.control.layers(baseMaps, null, {
    position: 'bottomleft'
  }).addTo(map);

// SVG Icons
var houseSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#48cc02" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tree-palm-icon lucide-tree-palm"><path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"/><path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"/><path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"/><path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/></svg>`;
var locationSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00abd6" stroke-width="1.95" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waves-icon lucide-waves"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`;
var starSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-footprints-icon lucide-footprints"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4"/><path d="M4 13h4"/></svg>`;
var hotelSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#48dbd1" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-locate-fixed-icon lucide-locate-fixed"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/></svg>`;
var parasvg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3fa659" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tent-tree-icon lucide-tent-tree"><circle cx="4" cy="4" r="2"/><path d="m14 5 3-3 3 3"/><path d="m14 10 3-3 3 3"/><path d="M17 14V2"/><path d="M17 14H7l-5 8h20Z"/><path d="M8 14v8"/><path d="m9 14 5 8"/></svg>`
// Définition des localisations avec types différents
var houses = [
    { lat: 30.436366, lng: -9.582084, name: "Taddart", type: "house" },
    { lat: 30.412573, lng: -9.593867, name: "Al inbiâat", type: "house" },
    { lat: 30.419520, lng: -9.592550, name: "Ibn Zaidoun", type: "house" },
    { lat: 30.424688, lng: -9.597242, name: "Olhao", type: "house" },
    { lat: 30.420786, lng: -9.606475, name: "Belvédère", type: "house" },
    { lat: 30.407366, lng: -9.552051, name: "Abderahmane Elyoussefi", type: "house" },
    { lat: 30.413043, lng: -9.586619, name: "Lalla Meryem", type: "house" },
    { lat: 30.408705, lng: -9.603353, name: "Plage d'Agadir", type: "location" },
    { lat: 30.448235, lng: -9.661473, name: "Anza", type: "location" },
    { lat: 30.509087, lng: -9.687703, name: "Imourane", type: "location" },
    { lat: 30.519978, lng: -9.690790, name: "Tamraght", type: "location" },
    { lat: 30.543751, lng: -9.709965, name: "Taghazout", type: "location" },
    { lat: 30.584703, lng: -9.758897, name: "Imi Ouaddar", type: "location" },
    { lat: 30.604176, lng: -9.780249, name: "Aghroud", type: "location" },
    { lat: 30.572096, lng: -9.745955, name: "25KM", type: "location" },
    { lat: 30.587675, lng: -9.528120, name: "paradis", type: "para" },
    { lat: 30.419069, lng: -9.607031, name: "la côte", type: "star" },
    { lat: 30.454443, lng: -9.663708, name: "Anza", type: "star" },
    { lat: 30.513187, lng: -9.687640, name: "Tamraght", type: "star" },
    { lat: 30.412646, lng: -9.579907, name: "Souk El Had", type: "hotel" },
    { lat: 30.429459, lng: -9.623756, name: "La Kasbah d'Agadir", type: "hotel" },
    { lat: 30.423182, lng: -9.616716, name: "Marina", type: "hotel" },
    { lat: 30.545218, lng: -9.709398, name: "Taghazout", type: "hotel" },
    { lat: 30.506805, lng: -9.688421, name: "Roche d'Imourane", type: "hotel" },
    
];

// Fonction pour retourner le bon SVG selon le type
function getSVGByType(type) {
    switch (type) {
        case "house": return houseSVG;
        case "location": return locationSVG;
        case "star": return starSVG;
        case "para": return parasvg
        case "hotel": return hotelSVG;
        default: return houseSVG;
    }
}

function addMarker(lat, lng, name, type) {
    var iconSVG = getSVGByType(type);
    var markerIcon = createCustomIcon(iconSVG);
    var marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);

    marker.bindPopup(`
        <div style="text-align:center;">
            <strong>${name}</strong>
        </div>
    `);
}

houses.forEach(house => addMarker(house.lat, house.lng, house.name, house.type));



//guide conseils
function toggleGuideConseils(event, element) {
    event.stopPropagation();

    const details = element.querySelector(".guideConseils-details");

    if (details.style.display === "block") {
        details.style.maxHeight = "0";
        details.style.opacity = "0";
        setTimeout(() => { details.style.display = "none"; }, 300);
        element.classList.remove("open");
    } else {
        details.style.display = "block";
        setTimeout(() => {
            details.style.maxHeight = "2300px";
            details.style.opacity = "1";
        }, 10);
        element.classList.add("open");
    }
}

window.onload = function() {
    const hash = window.location.hash;
    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            toggleGuideConseils(new Event('click'), targetSection);
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    }
};






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




 // Désactive clic droit (ordinateur)
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // Désactive Ctrl+S, Ctrl+U, Ctrl+C, Ctrl+P, F12 (ordinateur)
  document.addEventListener('keydown', function(e) {
    if (
      (e.ctrlKey && ['s', 'u', 'c', 'p'].includes(e.key.toLowerCase())) ||
      e.key === 'F12'
    ) {
      e.preventDefault();
    }
  });

  // Désactive la sélection (ordinateur + mobile)
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
  });

  // Désactive le copier (tous appareils)
  document.addEventListener('copy', function(e) {
    e.preventDefault();
  });

  // Désactive long press (mobile)
  let touchTimer;
  document.addEventListener('touchstart', function(e) {
    touchTimer = setTimeout(function() {
      e.preventDefault(); // empêche menu copier/coller
    }, 500);
  });

  document.addEventListener('touchend', function(e) {
    clearTimeout(touchTimer);
  });

  // Empêche drag (glisser-déposer images/textes)
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
  });






document.getElementById("profitez-guide").addEventListener("click", function() {
  gtag('event', 'click_profitez_guide', {
    event_category: 'Bouton',
    event_label: 'Profitez du guide'
  });
});

