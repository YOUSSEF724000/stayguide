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






