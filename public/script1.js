var main = function() {
  $('.addrequest i').click(function() {
    $('.addrequest-menu').toggle();
  });

  $('.post .btn').click(function() {
    $(this).toggleClass('btn-like');
  });
};
$(document).ready(main);