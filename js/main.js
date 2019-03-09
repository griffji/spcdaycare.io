/*
Template Name:  Alphabet
Author: Ingrid Kuhn
Author URI: http://themeforest.net/user/ingridk
*/
jQuery(function ($) {

    $(document).ready(function () {
        "use strict"


        //Google Map

        var mapCanvas = document.getElementById('map-canvas');
        var myLatlng = new google.maps.LatLng(40.7173469,-74.2855557); //your latitude and longitude here
        var mapOptions = {
            zoom: 16,
            scrollwheel: false,
            center: myLatlng,
            styles:[{"featureType":"landscape","stylers":[{"hue":"#FFB000"},{"saturation":71.66666666666669},{"lightness":-28.400000000000006},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#E8FF00"},{"saturation":-76.6},{"lightness":113},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF8300"},{"saturation":-77},{"lightness":27.400000000000006},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF8C00"},{"saturation":-66.6},{"lightness":34.400000000000006},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00C4FF"},{"saturation":22.799999999999997},{"lightness":-11.399999999999991},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#9FFF00"},{"saturation":0},{"lightness":-23.200000000000003},{"gamma":1}]}]
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
        var marker = new google.maps.Marker({
            position: myLatlng,
            icon: 'img/mapmarker.png',
            map: map,
            title: ''
        });


        //Scrolling feature

        $('.page-scroll a').on('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });

        //	Back Top Link

        var offset = 5200;
        var duration = 500;
        $(window).scroll(function () {
            if ($(this).scrollTop() > offset) {
                $('.back-to-top').fadeIn(400);
            } else {
                $('.back-to-top').fadeOut(400);
            }
        });

        // Calling LayerSlider

        $('#layerslider').layerSlider({
            responsive: true,
            responsiveUnder: 1280,
            layersContainer: 1280,
            skin: 'fullwidth',
            hoverPrevNext: false,
            skinsPath: './layerslider/skins/',
            autoStart: true,
			autoPlayVideos : false
        });

        //Testimonials Carousel

        $("#owl-testimonials").owlCarousel({
            dots: true,
            loop: true,
            autoplay: false,
            nav: true,
            navText: [
                "<i class='flaticon-arrows-1'></i>",
                "<i class='flaticon-arrows'></i>"
            ],
			 responsive: {
                1: {items: 1,},
                991: {items: 2,},
            }
        });

        //About Carousel

        $("#owl-about").owlCarousel({
            items: 1,
            dots: true,
            loop: true,
            autoplay: false,
        });

        // Blog Carousel

        $("#owl-blog").owlCarousel({
            items: 3,
            dots: true,
            margin: 40,
            loop: true,
            autoplay: false,
            nav: true,
            navText: [
                "<i class='flaticon-arrows-1'></i>",
                "<i class='flaticon-arrows'></i>"
            ],
            responsive: {
                1: {items: 1,},
                1000: {items: 2,},
                1200: {items: 3,}
            }
        });

        //Team Carousel

        $("#owl-team").owlCarousel({
            items: 4,
            dots: true,
            loop: true,
            margin: 20,
            autoplay: false,
            nav: true,
            navText: [
                "<i class='flaticon-arrows-1'></i>",
                "<i class='flaticon-arrows'></i>"
            ],
             responsive: {
                1: {items: 1,},
				550:{items: 2,},
                1000: {items: 3,},
                1200: {items: 4,}
            }
        });

        // Pretty Photo

        $("a[data-gal^='prettyPhoto']").prettyPhoto({
            hook: 'data-gal'
        });
        ({
            animation_speed: 'normal',
            opacity: 1,
            show_title: true,
            allow_resize: true,
            counter_separator_label: '/',
            theme: 'light_square',
            /* light_rounded / dark_rounded / light_square / dark_square / facebook */
        });



    }); // end document ready


    // Window load function

    $(window).load(function () {

        // Page Preloader

        $("#preloader").fadeOut("slow");


        //Load Skrollr

		var skr0llr = skrollr.init({
			forceHeight: false,
			mobileCheck: function() {
                //hack - forces mobile version to be off
                return false;
            }
		});

        //Portfolio Isotope

        var $container = $('#lightbox');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

		$(window).smartresize(function(){
			$container.isotope({
			columnWidth: '.col-sm-3'
			});
		});


		//Portfolio Nav Filter

        $('.cat a').on('click', function () {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });

    //On Click  function
	$(document).on('click',function(){

			//Navbar toggle
			$('.navbar .collapse').collapse('hide');
	})


});
