var main = function() {
  $('.notificationnew img').click(function() {
    $('.notificationnew-menu').toggle();
  }); 
  
  $('.post .btn').click(function() {
    $(this).toggleClass('btn-like'); 
  }); 
}; 
$(document).ready(main); 