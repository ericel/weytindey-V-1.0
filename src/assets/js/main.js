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
