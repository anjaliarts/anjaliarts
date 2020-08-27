// for navbar transparent to solid color
$(window).on("scroll", function() {
    if($(window).scrollTop() > 50) {
        $("#navbar").addClass("active");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
       $("#navbar").removeClass("active");
    }
});


// for animation for the each elements in component
var Animation = function({ offset } = { offset: 10 }) {
  var _elements;
  
  // Define a dobra superior, inferior e laterais da tela
  var windowTop = offset * window.innerHeight / 100;
  var windowBottom = window.innerHeight - windowTop;
  var windowLeft = 0;
  var windowRight = window.innerWidth;
  
  function start(element) {
    // Seta os atributos customizados
    element.style.animationDelay = element.dataset.animationDelay;
    element.style.animationDuration = element.dataset.animationDuration;
    // Inicia a animacao setando a classe da animacao
    element.classList.add(element.dataset.animation);
    // Seta o elemento como animado
    element.dataset.animated = "true";
  }
  
  function isElementOnScreen(element) {
    // Obtem o boundingbox do elemento
    var elementRect = element.getBoundingClientRect();
    var elementTop =
      elementRect.top + parseInt(element.dataset.animationOffset) ||
      elementRect.top;
    var elementBottom =
      elementRect.bottom - parseInt(element.dataset.animationOffset) ||
      elementRect.bottom;
    var elementLeft = elementRect.left;
    var elementRight = elementRect.right;
  
    // Verifica se o elemento esta na tela
    return (
      elementTop <= windowBottom &&
      elementBottom >= windowTop &&
      elementLeft <= windowRight &&
      elementRight >= windowLeft
    );
  }
  
  // Percorre o array de elementos, verifica se o elemento está na tela e inicia animação
  function checkElementsOnScreen(els = _elements) {
    for (var i = 0, len = els.length; i < len; i++) {
      // Passa para o proximo laço se o elemento ja estiver animado
      if (els[i].dataset.animated) continue;
  
      isElementOnScreen(els[i]) && start(els[i]);
    }
  }
  
  // Atualiza a lista de elementos a serem animados
  function update() {
    _elements = document.querySelectorAll(
      "[data-animation]:not([data-animated])"
    );
    checkElementsOnScreen(_elements);
  }
  
  // Inicia os eventos
  window.addEventListener("load", update, false);
  window.addEventListener("scroll", () => checkElementsOnScreen(_elements), { passive: true });
  window.addEventListener("resize", () => checkElementsOnScreen(_elements), false);
  
  // Retorna funcoes publicas
  return {
    start,
    isElementOnScreen,
    update
  };
};
  

// for to top button
// Initialize
var options = {
  offset: 20 //percentage of window
};
var animation = new Animation(options);


$(document).ready(function(){ 
  $(window).scroll(function(){ 
      if ($(this).scrollTop() > 100) { 
          $('#scroll').fadeIn(); 
          console.log('scrolling');
      } else { 
          $('#scroll').fadeOut(); 
      } 
  }); 
  $('#scroll').click(function(){ 
      $("html, body").animate({ scrollTop: 0 }, 600); 
      return false; 
  }); 
});

// for toggling the navbar collabsible bar
const navbar = document.getElementById("navbar");
const navbarToggle = navbar.querySelector(".navbar-toggle");

function openMobileNavbar() {
  navbar.classList.add("opened");
  console.log("opened");
  navbarToggle.setAttribute("aria-label", "Close navigation menu.");
}

function closeMobileNavbar() {
  navbar.classList.remove("opened");
  console.log("Closed");
  navbarToggle.setAttribute("aria-label", "Open navigation menu.");
}

navbarToggle.addEventListener("click", () => {
  if (navbar.classList.contains("opened")) {
    closeMobileNavbar();
  } else {
    openMobileNavbar();
  }
});

const navbarMenu = navbar.querySelector(".navbar-menu");
const navbarLinksContainer = navbar.querySelector(".navbar-links");

navbarLinksContainer.addEventListener("click", (clickEvent) => {
  clickEvent.stopPropagation();
});

navbarMenu.addEventListener("click", closeMobileNavbar);
