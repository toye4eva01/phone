/*----------------------------- Parallax --------------------------*/
(function($) {
  "use strict";

  //Parallax  
      $(window).bind('load', function () {
          parallaxInit();                       
      });

    function parallaxInit() {
        $('#home').parallax("30%", 0.1);
        $('#saparator1').parallax("30%", 0.1);
        $('#saparator1').parallax("30%", 0.1);
        $('#saparator2').parallax("30%", 0.1);
        $('#saparator3').parallax("30%", 0.1);
        $('#saparator4').parallax("30%", 0.1);
        $('#saparator5').parallax("30%", 0.1);
    }

})(jQuery);



(function($) {
  "use strict";   
  /*----------------------------- Fullscreen Slider --------------------------*/
      $('#fullscreen-slider').superslides({
        animation: 'slide',
        pagination: 'false',
        play: 8000
      });

   //SliderCaptions   
    function metroSlideconfig(){
      $('.slider-captions').each(function(){
        var windowHeight = ($(window).height()/2),
        windowWidth = ($(window).width()/2),
        captionHeight = ($('.slider-captions').height()/2),
        captionWidth = ($('.slider-captions').width()/2);

          
        $('#fullscreen-slider').css({'height': (windowHeight * 2 ) + 'px' });
        $('#fullscreen-slider li').css({'width': $(window).width() + 'px' });
        
          
      });
    };
    metroSlideconfig()
    jQuery(window).resize(metroSlideconfig);   
    
  /*----------------------------- Home Video --------------------------*/
    $('.video-h').magnificPopup({
      type: 'iframe',
    iframe: {
      markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
              '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

      patterns: {
        youtube: {
          index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

          id: 'v=', // String that splits URL in a two parts, second part should be %id%
          // Or null - full URL will be returned
          // Or a function that should return %id%, for example:
          // id: function(url) { return 'parsed id'; } 

          src: 'http://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe. 
        },
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: 'http://player.vimeo.com/video/%id%?autoplay=1'
        },
        gmaps: {
          index: '//maps.google.',
          src: '%id%&output=embed'
        }
      },
    }  
    });


})(jQuery);

/*----------------------------- Navigation --------------------------*/
(function($) {
  "use strict";

  //OnePage Navigation
    $('#nav').onePageNav({
          currentClass: 'active',   
          filter: ':not(.external)', 
          scrollOffset: 30   
    });

    $('.nav a.colapse-menu1').click(function () { $(".navbar-collapse").collapse("hide") });
    $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });  

     jQuery(window).on('scroll', function (){   
        if ($(this).scrollTop() > 700){
            $('#main-menu').addClass('is-sticky');
          } else {
            $('#main-menu').removeClass('is-sticky');
          }
     });  

   //Smoothscroll
      smoothScroll.init({
          speed: 200 
      }); 
  //Responsive Nav
     $( "ul.sub-menu").parent().append("<span class='toggle_nav_button'>+</span>");
        $(".toggle_nav_button").click(
          function(){
            var link = $(this);
            $(this).parent().find("ul.sub-menu").slideToggle('fast', function(){
              if ($(this).is(':visible')){
                link.text('-');
              } else {
                link.text('+');
              }
            });
            return false;
          });



})(jQuery);




(function($) {
  "use strict";

/*----------------------------- Popup --------------------------*/
    $('.popup-link').magnificPopup({
        type:'image',
        removalDelay: 300,

        // Class that is added to popup wrapper and background
        mainClass: 'mfp-fade'
    });

/*----------------------------- Accordions --------------------------*/
    $('.accordion dt').click(function() {
        //  make the accordion close on the second click
        if ($('.accordion dd').hasClass('openDiv')) {
                $('.accordion dd').slideUp('normal');
                $(this).next().removeClass('openDiv');
        }
        else {
            $('.accordion dd').slideUp('normal');
            $(this).next().slideDown('normal');
            $(this).next().addClass('openDiv');
        }
        return false;
    });

/*----------------------------- Counter --------------------------*/
    $(".timer").appear(function() {
        var counter = $(this).html();
        $(this).countTo({
            from: 0,
            to: counter,
            speed: 2000,
            refreshInterval: 60,
            });
    });

/*----------------------------- About Slider --------------------------*/
    $('#about-slider').owlCarousel({
        singleItem: true,
        navigation : true,
        slideSpeed : 1000,
        stopOnHover: true,      
        pagination : false,
        navigationText : ['<i class="fa fa-angle-left about-slider-arrow"></i>','<i class="fa fa-angle-right about-slider-arrow"></i>'], // <=== Custom Navigation buttons
        mouseDrag: false,
        autoPlay: 3000
    });

/*----------------------------- Blog post slider --------------------------*/
    $("#blog-carousel").owlCarousel({
        autoPlay: 3000,
        navigation : false, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        pagination : false,
        singleItem:true
                                     
        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
    });

/*----------------------------- Team Slider --------------------------*/
    $('#team-slider').owlCarousel({
        items : 4,                      
        itemsDesktop : [1199,3],        
        itemsDesktopSmall : [979,3],    
        navigation : true,
        slideSpeed : 1000,
        pagination : false,
        navigationText : ["",""],
        mouseDrag: false,
        autoPlay: 4000
    });

/*----------------------------- Testimonials Slider --------------------------*/
    $("#testimonials").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items : 2,
        itemsDesktop : [1199,2],
        pagination : false,
        itemsDesktopSmall : [979,1]
        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
      });

/*----------------------------- Skill Bar --------------------------*/
    $(".skillbar").appear(function() {
        $('.skillbar').each(function(){
            $(this).find('.skillbar-bar').animate({
                width:$(this).attr('data-percent')},6000);
            }); 
    }, {accX: 0, accY: -170});

/*----------------------------- Google map --------------------------*/    
    $('#map').gmap3({
        marker:{address:"Haltern am See, Weseler Str. 151", options:{icon: "img/location1.png"}},
        map:{
            options:{
              zoom: 14,
              scrollwheel: false
            }
           }
      });
/*----------------------------- Contact Form --------------------------*/    
     $('#submit').formValidator({
        scope: '#form'
      });
      
      $('#post-commentsss').formValidator({
        scope: '#comments-form'
      });
      
      $('#submit,#post-commentsss').click(function() {
            $('input.error-input, textarea.error-input').delay(300).animate({marginLeft:0},100).animate({marginLeft:10},100).animate({marginLeft:0},100).animate({marginLeft:10},100);
        });

      // Form plugin

      var options = {

        beforeSubmit: function() {
          $('.sending').show();

        },
        success: function() {
          $('.sending').hide();
          $('#form').hide();
          $(".mess").show().html('<h5>Thanks !</h5><h5>Your message has been sent.</h5>'); // Change Your message post send
          $('.mess').delay(3000).fadeOut(function() {

            $('#form').clearForm();
            $('#form').delay(3500).show();

          });
        }
      };
      

      $('#form').submit(function() {
        $(this).ajaxSubmit(options);
        return false;
      });   

})(jQuery);


/*----------------------------- Portfolio --------------------------*/
jQuery(document).ready(function($) {
    "use strict";

  $(window).load(function() {   
        //Preloader
         $(".mask").delay(500).fadeOut("slow");
         $(function(){
              var $container = $('.portfolio-container');
            
                        $container.isotope({
                          itemSelector : '.mt',
                          layoutMode : 'masonry'
                          
                        });
              
              var $optionSets = $('#options .option-set'),
                  $optionLinks = $optionSets.find('a');

              $optionLinks.click(function(){
                var $this = $(this);
                // don't proceed if already selected
                if ( $this.hasClass('selected') ) {
                  return false;
                }
                var $optionSet = $this.parents('.option-set');
                $optionSet.find('.selected').removeClass('selected');
                $this.addClass('selected');
          
                // make option object dynamically, i.e. { filter: '.my-filter-class' }
                var options = {},
                    key = $optionSet.attr('data-option-key'),
                    value = $this.attr('data-option-value');
                // parse 'false' as false boolean
                value = value === 'false' ? false : value;
                options[ key ] = value;
                if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
                  // changes in layout modes need extra logic
                  changeLayoutMode( $this, options )
                } else {
                  // otherwise, apply new options
                  $container.isotope( options );
                }
                
                return false;
              });
          });
          
/*----------------------------- Blog Post masonry --------------------------*/
            var $container = $('.blog-post-holder');
            $container.isotope({
                 masonry: { 
              },
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                },  
            });

          }); 


/*----------------------------- Animation on scroll --------------------------*/
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile == false) {
        
        $("[data-animation]").each(function() {

            var $this = $(this);

            $this.addClass("animation");

            if(!$("html").hasClass("no-csstransitions") && $(window).width() > 767) {

                $this.appear(function() {

                    var delay = ($this.attr("data-animation-delay") ? $this.attr("data-animation-delay") : 1);

                    if(delay > 1) $this.css("animation-delay", delay + "ms");
                    $this.addClass($this.attr("data-animation"));

                    setTimeout(function() {
                        $this.addClass("animation-visible");
                    }, delay);

                }, {accX: 0, accY: -170});

            } else {

                $this.addClass("animation-visible");

            }
        });  
    }   



});






    