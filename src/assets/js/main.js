jQuery(document).ready(function($){
	$('#nav-icon2').click(function(){
		$(this).toggleClass('open');
	});

     $('.sm-search').on('click', function(){

       
      $( '.search-sm' ).toggleClass( "search-sm-y" );
       
	 });
	 $('.search-btn').on('click', function(){

       
      $( '.search-sm' ).toggleClass( "search-sm-y" );
       
	 });
	 /* .replace(/[^a-z0-9 -]/g, ' ')
	 $('.getbtn').on('click', function(){
          $("html, body").animate({ scrollTop: 0 }, "slow");
          return false;
	 });
	$(window).scroll(function(){
	  var y = $(window).scrollTop();
	  if( y > 0 ){
	      $("#top-shadow").css({'display':'block', 'opacity':y/20});
	  } else {
	      $("#top-shadow").css({'display':'block', 'opacity':y/20});
	  }
	  if( y == 0 ){
          $("#top-shadow").css({'display':'none', 'opacity':y/20});
	  }
     */
	/* var scrollValue = $(window).scrollTop();
		if (scrollValue == settings.scrollTopPx || scrollValue > 70) {
			$('.sidebar').addClass('fixed');
		} */
		
	 //});

	 

});


$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('fa-minus').addClass('fa-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('fa-plus').addClass('fa-minus');
    }
});
$(document).on('focus', '.panel-footer .chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('fa-plus').addClass('fa-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});
