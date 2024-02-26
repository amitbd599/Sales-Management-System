// Mobile Menu Control

$(".open").click(function () {
  $(".menu").toggleClass("show");
});

// Serialscrolling Implement
$(document).ready(function () {
  $("[data-serialscrolling]").serialscrolling();
});
