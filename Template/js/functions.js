/* ----------------------------------
  Script
-------------------------------------
    01. Smooth scrolling using jQuery easing
    02. Bootstrap carousel
    03. sidebar
    04. Progress bar
    05. Counter
    06. owl-carousel
    07. MagnificPopup
    08. contact form Send mail
    09. loader
    10. Isotope
*/

(function($) {
"use strict"; // Start of use strict


$(document).ready(function() {

  /* ------------------------------------------------------------------------
   * Smooth scrolling using jQuery easing
   * ------------------------------------------------------------------------ */
      $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function() {
          if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
              if (target.length) {
                  $('#dismiss, .overlay').trigger('click');
                  $('html, body').animate({
                      scrollTop: (target.offset().top - 60)
                  }, 1000, "easeInOutExpo");
                  return false;
              }
          }
      });
      // Closes responsive menu when a scroll trigger link is clicked
      $('.js-scroll-trigger').on('click', function() {
          $('#sidebar').collapse('hide');
      });
      // Activate scrollspy to add active class to navbar items on scroll
      $('body').scrollspy({
          target: '#mainNav',
          offset: 0
      });



  /* ------------------------------------------------------------------------
   * Bootstrapcarousel
   * ------------------------------------------------------------------------ */
  //Function to animate slider captions
  function doAnimations(elems) {
    //Cache the animationend event in a variable
    var animEndEv = "webkitAnimationEnd animationend";

    elems.each(function() {
      var $this = $(this),
        $animationType = $this.data("animation");
      $this.addClass($animationType).one(animEndEv, function() {
        $this.removeClass($animationType);
      });
    });
  }

  //Variables on page load
  var $myCarousel = $("#carouselExampleIndicators"),
    $firstAnimatingElems = $myCarousel
      .find(".carousel-item:first")
      .find("[data-animation ^= 'animated']");

  //Initialize carousel
  $myCarousel.carousel();

  //Animate captions in first slide on page load
  doAnimations($firstAnimatingElems);

  //Other slides to be animated on carousel slide event
  $myCarousel.on("slide.bs.carousel", function(e) {
    var $animatingElems = $(e.relatedTarget).find(
      "[data-animation ^= 'animated']"
    );
    doAnimations($animatingElems);
  });
  

  /* ------------------------------------------------------------------------
   * sidebar
   * ------------------------------------------------------------------------ */
      $("#sidebar").mCustomScrollbar({
          theme: "my-theme",
      });
      $('#dismiss, .overlay').on('click', function() {
          // hide sidebar
          $('#sidebar').removeClass('active');
          // hide overlay
          $('.overlay').removeClass('active');
      });
      $('#sidebarCollapse').on('click', function() {
          // open sidebar
          $('#sidebar').addClass('active');
          // fade in the overlay
          $('.overlay').addClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });

  /* ------------------------------------------------------------------------
   * Progress bar
   * ------------------------------------------------------------------------ */
      var delay = 500;
      $(".progress-bar").appear(function(i) {
          $(this).delay(delay * i).animate({
              height: $(this).attr('aria-valuenow') + '%'
          }, delay);

          $(this).prop('Counter', 0).animate({
              Counter: $(this).text()
          }, {
              duration: delay,
              easing: 'swing',
              step: function(now) {
                  $(this).text(Math.ceil(now) + '%');
              }
          });
      });

/* ------------------------------------------------------------------------
 * Counter
 * ------------------------------------------------------------------------ */
    $('.counter').appear(function() {
        (function($) {
            $.fn.countTo = function(options) {
                options = options || {};
                return $(this).each(function() {
                    // set options for current element
                    var settings = $.extend({}, $.fn.countTo.defaults, {
                        from: $(this).data('from'),
                        to: $(this).data('to'),
                        speed: $(this).data('speed'),
                        refreshInterval: $(this).data('refresh-interval'),
                        decimals: $(this).data('decimals')
                    }, options);
                    // how many times to update the value, and how much to increment the value on each update
                    var loops = Math.ceil(settings.speed / settings.refreshInterval),
                        increment = (settings.to - settings.from) / loops;
                    // references & variables that will change with each update
                    var self = this,
                        $self = $(this),
                        loopCount = 0,
                        value = settings.from,
                        data = $self.data('countTo') || {};
                    $self.data('countTo', data);
                    // if an existing interval can be found, clear it first
                    if (data.interval) {
                        clearInterval(data.interval);
                    }
                    data.interval = setInterval(updateTimer, settings.refreshInterval);
                    // initialize the element with the starting value
                    render(value);
                    function updateTimer() {
                        value += increment;
                        loopCount++;
                        render(value);
                        if (typeof(settings.onUpdate) == 'function') {
                            settings.onUpdate.call(self, value);
                        }
                        if (loopCount >= loops) {
                            // remove the interval
                            $self.removeData('countTo');
                            clearInterval(data.interval);
                            value = settings.to;

                            if (typeof(settings.onComplete) == 'function') {
                                settings.onComplete.call(self, value);
                            }
                        }
                    }
                    function render(value) {
                        var formattedValue = settings.formatter.call(self, value, settings);
                        $self.html(formattedValue);
                    }
                });
            };
            $.fn.countTo.defaults = {
                from: 0, // the number the element should start at
                to: 0, // the number the element should end at
                speed: 1000, // how long it should take to count between the target numbers
                refreshInterval: 100, // how often the element should be updated
                decimals: 0, // the number of decimal places to show
                formatter: formatter, // handler for formatting the value before rendering
                onUpdate: null, // callback method for every time the element is updated
                onComplete: null // callback method for when the element finishes updating
            };
            function formatter(value, settings) {
                return value.toFixed(settings.decimals);
            }
        }(jQuery));
        jQuery(function($) {
            // custom formatting example
            $('.count-number').data('countToOptions', {
                formatter: function(value, options) {
                    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                }
            });
            // start all the timers
            $('.timer').each(count);

            function count(options) {
                var $this = $(this);
                options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                $this.countTo(options);
            }
        });
    });


/* ------------------------------------------------------------------------
 * owl-carousel
 * ------------------------------------------------------------------------ */
    $('#owl-carousel').owlCarousel({
        loop:true,
        margin:30,
        dots: false,
        nav: true,
        navText: ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],
        responsive:{
            0:{
                items:1
            },
            575:{
                items:2
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });
    $('#owl-carousel-02').owlCarousel({
        loop:true,
        margin:0,
        items:1,
        dots: true,
        nav: false
    });

/* ------------------------------------------------------------------------
 * MagnificPopup
 * ------------------------------------------------------------------------ */
    $('.parent-container').magnificPopup({
        type: 'image',
        delegate: 'a.portfolio-popup', // child items selector, by clicking on it popup will open
        mainClass: 'mfp-with-zoom',
        gallery: {
            enabled: true
        }
    });


   /* ------------------------------------------------------------------------
 * contact form Send mail
 * ------------------------------------------------------------------------ */

$('#infinity_contact').submit(function(e)
{
    e.preventDefault();

    var form = $(this);

    $.ajax({
      url: 'php/sendmail.php',
      type: 'post',
      data: form.serialize(),
      dataType: 'json',
      beforeSend: function() {
          $('#btn-submit').button('loading');
      },  
      complete: function() {
          $('#btn-submit').button('reset');
      },              
      success: function(json) {
          if(json['success']==true) {
            $('#success_msg').html('<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+json['message']+'</div>')
          } else {
            $('#success_msg').html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+json['message']+'</div>')
          }

          form[0].reset();
      },
      error: function(xhr, ajaxOptions, thrownError) {
          alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });         
  });

});

// window on function
$(window). on('load', function() {
  
 /* ------------------------------------------------------------------------
 * loader
 * ------------------------------------------------------------------------ */
  $(".lorder").fadeOut("slow");;

/* ------------------------------------------------------------------------
 * Isotope
 * ------------------------------------------------------------------------ */
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });
    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        ium: function() {
            var name = $(this).find('.name').text();
            return name.match(/ium$/);
        }
    };
    // bind filter button click
    $('.filters-button-group').on('click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({
            filter: filterValue
        });
    });
    // change is-checked class on buttons
    $('.filters-group').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });
});

})(jQuery); // End of use strict