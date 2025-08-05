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

// Position initiale : Marrakech centre
var initialView = { lat: 31.6295, lng: -7.9811, zoom: 9.4 };

// Couches
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: ''
});

const satelliteLayer = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: '',
    maxZoom: 19
  }
);

// Initialiser la carte
const map = L.map('map', {
  fullscreenControl: true,
  center: [initialView.lat, initialView.lng],
  zoom: initialView.zoom,
  minZoom: 7,
  maxZoom: 19,
  layers: [osmLayer]
});

// Contrôle de couches
const baseMaps = {
  "Plan": osmLayer,
  "Satellite": satelliteLayer
};

L.control.layers(baseMaps, null, {
  position: 'bottomleft'
}).addTo(map);

// Création d'icône personnalisée
function createCustomIcon(svg) {
    return L.divIcon({
        className: '',
        html: `<div class="custom-marker"><img src="data:image/svg+xml;base64,${btoa(svg)}" /></div>`,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50]
    });
}



// Icônes SVG
var locationSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#48cc02" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tree-palm-icon lucide-tree-palm"><path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"/><path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"/><path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"/><path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"/></svg>`;
var starSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(199, 87, 41)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-locate-fixed-icon lucide-locate-fixed"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/></svg>`;
var natureSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mountain-snow-icon lucide-mountain-snow"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/></svg>`;

// Liste des lieux
var marrakechPoints = [
  { lat: 31.6258, lng: -7.9892, name: "Jemaa el-Fna", type: "star" },
  { lat: 31.6295, lng: -7.9811, name: "Ruelles de la Médina", type: "star" },
  { lat: 31.633469, lng: -7.999307, name: "Bab Doukkala", type: "star" },
  { lat: 31.619451, lng: -7.983913, name: "Quartier Mellah", type: "star" },
  { lat: 31.632968, lng: -8.008693, name: "Quartier Guéliz", type: "star" },
  { lat: 31.6290, lng: -7.9866, name: "Remparts de Marrakech", type: "star" },

  // Jardins
  { lat: 31.626915, lng: -8.000504, name: "Cyber Parc Arsat Moulay", type: "location" },
  { lat: 31.622783, lng: -7.992775, name: "La Koutoubia", type: "location" },
  { lat: 31.629878, lng: -8.010235, name: "El Harti", type: "location" },
  { lat: 31.6156, lng: -8.0214, name: "La Ménara", type: "location" },
  { lat: 31.623067, lng: -7.994975, name: "Lalla Hasna", type: "location" },

  // Excursions
  { lat: 31.225196, lng: -7.676103, name: "Setti Fatma (Ourika)", type: "nature" },
  { lat: 31.370062, lng: -7.788660, name: "Vallée de l'Ourika", type: "nature" },
  { lat: 31.2000, lng: -7.8550, name: "Oukaïmeden", type: "nature" },
  { lat: 31.484894, lng: -8.198430, name: "Désert d’Agafay", type: "nature" },
  { lat: 32.015152, lng: -6.719763, name: "Cascade d’Ouzoud", type: "nature" },
];

// Choisir l’icône en fonction du type
function getSVGByType(type) {
    switch (type) {
        case "star": return starSVG;
        case "location": return locationSVG;
        case "nature": return natureSVG;
        default: return locationSVG;
    }
}

// Ajouter marqueur
function addMarker(lat, lng, name, type) {
    var iconSVG = getSVGByType(type);
    var markerIcon = createCustomIcon(iconSVG);
    var marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);

    marker.bindPopup(`<div style="text-align:center;"><strong>${name}</strong></div>`);
}

// Afficher tous les marqueurs
marrakechPoints.forEach(p => addMarker(p.lat, p.lng, p.name, p.type));


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

