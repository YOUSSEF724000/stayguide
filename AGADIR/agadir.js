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





