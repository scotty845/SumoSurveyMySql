$(document).ready(function() {
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
  

});

function hoverSword(element) {
    element.setAttribute('src', 'assets/img/samuraisword1red.png');
}
function unhoverSword(element) {
    element.setAttribute('src', 'assets/img/samuraisword1.png');
}