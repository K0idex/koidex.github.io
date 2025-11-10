/*
 * Copyright (c) 2021 marketify
 * Author: marketify
 * This file is made for CURRENT TEMPLATE
*/

(function($){
	"use strict";
	
	var skcodeObject = {
			
		init: function(){
			this.anchor();
			this.mobileMenu();
			this.hashtag();
			this.contactForm();
			this.owl();
			this.masonry();
			this.counter();
			this.modal();
			this.nav_skin();
			this.popup();
			this.svg();
			this.bg_images();
			this.smartNavbar();
		},
		
		anchor: function(){
			var a = $("section a[href^='#'],.skcode_intro a[href^='#']");
			a.on('click',function(){
				var e = $(this).attr('href');
				if(e !== '#'){
					$('html,body').animate({scrollTop: $(e).offset().top},1000);
					return false;
				}
			});
				
		},
		
		mobileMenu: function(){
			var menu			= $('.skcode_mobile_menu');
			var hamburger 		= menu.find('.hamburger');
			var checkbox        = menu.find('#mobile-menu-toggle');
			var DD				= menu.find('.dropdown');
			var mobileMenuList	= DD.find('a');

			// Handle hamburger click
			hamburger.on('click',function(){
				if(checkbox.is(':checked')){
					checkbox.prop('checked', false);
					DD.slideUp();
				}else{
					checkbox.prop('checked', true);
					DD.slideDown();
				}
			});

			// Handle checkbox change directly
			checkbox.on('change', function(){
				if($(this).is(':checked')){
					DD.slideDown();
				}else{
					DD.slideUp();
				}
			});

			// Close menu when clicking menu items
			mobileMenuList.on('click',function(){
				checkbox.prop('checked', false);
				DD.slideUp();
				return false;
			});	
		},
		
		contactForm: function(){
			$('#send_message').on('click', function(){
				console.log('Modern contact form submit clicked!'); // DEBUG
				var form		= $('.modern-contact-form');
				var name 		= $("#name").val();
				var email 		= $("#email").val();
				var subject 	= $("#subject").val();
				var message 	= $("#message").val();
				var spanSuccess	= form.find(".success");
				var spanError   = form.find(".empty_notice");
				var success     = spanSuccess.data('success');
				var emailto     = form.data('email');
				
				console.log('Form data:', {name, email, subject, message, emailto}); // DEBUG

				// Clear previous messages
				spanSuccess.removeClass('active');
				spanError.removeClass('active');
				
				//checking for blank fields	
				if(name === ''|| email === ''|| subject === ''|| message === '' || emailto === ''){
					console.log('Empty fields detected!'); // DEBUG
					spanError.addClass('active');
					setTimeout(function() {
						spanError.removeClass('active');
					}, 3000);
				}
				else{
					console.log('Sending AJAX request...'); // DEBUG
					
					// TEMPORARY: Simple success message for testing without server
					// Comment out the $.post section below if you don't have PHP server
					spanSuccess.addClass('active');
					setTimeout(function() {
						spanSuccess.removeClass('active');
					}, 4000);
					form[0].reset();
					return false;
					
					// Uncomment this when you have a PHP server running:
					/*
					$.post(
						"modal/contact.php",
						{
							ajax_name: name,
							ajax_email: email,
							ajax_subject: subject,
							ajax_emailto: emailto,
							ajax_message: message
						}, function(data) {
							console.log('AJAX response:', data); // DEBUG
							if(data.includes("error")){
								spanError.addClass('active');
								setTimeout(function() {
									spanError.removeClass('active');
								}, 3000);		
							}else{
								spanSuccess.addClass('active');
								setTimeout(function() {
									spanSuccess.removeClass('active');
								}, 4000);
								form[0].reset();//To reset form fields on success
							}
						}).fail(function(xhr, status, error) {
							console.error('AJAX Error:', error); // DEBUG
							console.error('Status:', status);
							console.error('Response:', xhr.responseText);
						});
					*/
				}
				return false; 
			});
		},
		
		owl: function(){
			$('.skcode_portfolio_slider .owl-carousel').each(function(){
				var e = $(this);
				var p = e.closest('.skcode_portfolio_slider');
				e.owlCarousel({
					loop: true,
					margin: 30,
					nav: false,
					dots: false,
					items: 4,
					responsive: {
						0: {
							items: 1
						},
						768: {
							items: 2
						},
						1040: {
							items: 3
						},
						1600: {
							items: 4
						}
					}
				});
				p.find('.skcode_prevnext .next a').click(function() {
					e.trigger('next.owl.carousel');
					return false;
				});
				p.find('.skcode_prevnext .prev a').click(function() {
					e.trigger('prev.owl.carousel');
					return false;
				});
			});
			
			
			$('.skcode_testi_slider .owl-carousel').each(function(){
				var e = $(this);
				var p = e.closest('.skcode_testi_slider');
				e.owlCarousel({
					loop: true,
					margin: 30,
					nav: false,
					dots: false,
					items: 1,
				});
				p.find('.skcode_prevnext .next a').click(function() {
					e.trigger('next.owl.carousel');
					return false;
				});
				p.find('.skcode_prevnext .prev a').click(function() {
					e.trigger('prev.owl.carousel');
					return false;
				});
			});
			
			
			$('.skcode_news_slider .owl-carousel').each(function(){
				var e = $(this);
				var p = e.closest('.skcode_news_slider');
				e.owlCarousel({
					loop: true,
					margin: 30,
					nav: false,
					dots: false,
					items: 2,
					responsive: {
						0: {
							items: 1
						},
						768: {
							items: 2
						},
					}
				});
				p.find('.skcode_prevnext .next a').click(function() {
					e.trigger('next.owl.carousel');
					return false;
				});
				p.find('.skcode_prevnext .prev a').click(function() {
					e.trigger('prev.owl.carousel');
					return false;
				});
			});
		},
		
		masonry: function(){
			var masonry = $('.masonry');
			if($().isotope){
				masonry.each(function(){
					$(this).isotope({
					  itemSelector: '.masonry_item',
					  masonry: {}
					});
					$(this).isotope( 'reloadItems' ).isotope();
				});
			}
		},
		
		counter: function(){
			var element = $('.skcode_counter');
			element.each(function() {
				var el = $(this);
				el.waypoint({
					handler: function(){
						if(!el.hasClass('stop')){
							el.addClass('stop').countTo({
								refreshInterval: 50,
								formatter: function (value, options) {
									return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
								},	
							});
						}
					},
					offset:'90%'	
				});
			});	
		},
		
		modal: function(){
			var self		= this;
			var modalBox	= $('.skcode_modalbox');
			var item		= $('.modal_item');
			var closePopup	= modalBox.find('.close');
			var prevNext	= modalBox.find('.skcode_prevnext');
			var fixedTitle	= modalBox.find('.fixed_title');
			
			item.on('click',function(){
				var element		= $(this);
				var content 	= element.find('.hidden_information').html();
				
				
				var items		= element.closest('.modal_items'),
					index		= element.attr('data-index'),
					from		= items.attr('data-from'),
					count		= items.attr('data-count');
				prevNext.attr('data-index',index);
				prevNext.attr('data-from',from);
				var titleIndex	= (index < 10) ? '0' + index : index;
				var titleCount	= (count < 10) ? '0' + count : count;
				fixedTitle.html('<span>'+titleIndex+'/'+titleCount+'</span>'+from);
				
				
				$('body').addClass('modal');
				modalBox.addClass('opened');
				modalBox.find('.modal_in').html(content);
				
				self.modal_prevnext(prevNext,modalBox);
				self.svg();
				self.bg_images();
			});
			self.modal_prevnext(prevNext,modalBox);
			closePopup.on('click',function(){
				modalBox.removeClass('opened');
				modalBox.find('.modal_in').html('');
				$('body').removeClass('modal');
				return false;
			});
		},
		
		modal_prevnext: function(prevNext,modalBox){
			var self		= this;
			prevNext.find('a').off().on('click',function(){
				var e		= $(this);
				var from 	= prevNext.attr('data-from');
				var index	= parseInt(prevNext.attr('data-index'));
				var itemss	= $('.modal_items[data-from="'+from+'"]');
				var count	= parseInt(itemss.attr('data-count'));
				var fixedTitle	= modalBox.find('.fixed_title');
				if(e.parent().hasClass('prev')){
					index--;
				}else{
					index++;
				}
				if(index < 1){index = count;}
				if(index > count){index = 1;}
				
				var content = itemss.find('.modal_item[data-index="'+index+'"] .hidden_information').html();
				prevNext.removeClass('disabled');
				prevNext.attr('data-index',index);
				
				setTimeout(function(){
					modalBox.find('.modal_in').fadeOut(500, function() {
						$(this).html(content).fadeIn(500);
					});
					var titleIndex	= (index < 10) ? '0' + index : index;
					var titleCount	= (count < 10) ? '0' + count : count;
					fixedTitle.html('<span>'+titleIndex+'/'+titleCount+'</span>'+from);
				},500);
					
				$(".skcode_modalbox .modal_content").stop().animate({scrollTop:0}, 500, 'swing');
				
				self.modal_prevnext(prevNext,modalBox);
				self.svg();
				self.bg_images();
				return false;
			});
		},
		
		nav_skin: function(){
			$(window).on('scroll',function(){
				var topbar	 		= $('.skcode_topbar');
				var WinOffset		= $(window).scrollTop();
				if(WinOffset >= 100){
					topbar.addClass('animate');
				}else{
					topbar.removeClass('animate');
				}
			});	
		},
		
		popup: function(){
			$('.gallery_zoom').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					delegate: 'a.zoom', // the selector for gallery item
					type: 'image',
					gallery: {
					  enabled:true
					},
					removalDelay: 300,
					mainClass: 'mfp-fade'
				});

			});
			$('.popup-youtube, .popup-vimeo').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					disableOn: 700,
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});
			});

			$('.soundcloude_link').magnificPopup({
			  type : 'image',
			   gallery: {
				   enabled: true, 
			   },
			});
		},
		
		preloader: function(){
			var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
			var preloader = $('#preloader');

			if (!isMobile) {
				setTimeout(function() {
					preloader.addClass('preloaded');
				}, 800);
				setTimeout(function() {
					preloader.remove();
				}, 2000);

			} else {
				preloader.remove();
			}
		},
		
		
		run_preloader: function(){
			var self = this;
			setTimeout(function(){self.preloader();},500);
		},
		
		svg: function(){
			$('img.svg').each(function(){
				var e 				= $(this);
				var imgclass		= e.attr('class');
				var URL				= e.attr('src');
				$.get(URL, function(data) {
					var svg 		= $(data).find('svg');
					if(typeof imgclass !== 'undefined') {
						svg = svg.attr('class', imgclass + ' ready-svg');
					}
					svg = svg.removeAttr('xmlns:a');
					e.replaceWith(svg);
				}, 'xml');
			});
		},
		bg_images: function(){
			var data			= $('*[data-img-url]');
			data.each(function(){
				var element			= $(this);
				var url				= element.data('img-url');
				element.css({backgroundImage: 'url('+url+')'});
			});
		},
		
		smartNavbar: function(){
			var lastScrollTop = 0;
			var mobileNavbar = $('.skcode_mobile_menu'); // Target mobile menu instead
			var desktopNavbar = $('.skcode_topbar');     // Keep desktop reference
			var delta = 10;
			var scrollThreshold = 100;
			
			console.log('Smart navbar initialized');
			console.log('Mobile navbar found:', mobileNavbar.length);
			console.log('Desktop navbar found:', desktopNavbar.length);
			console.log('Initial window width:', $(window).width());
			
			// Better mobile detection
			var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() <= 1024;
			console.log('Is mobile device:', isMobile);

			$(window).scroll(function(){
				var scrollTop = $(this).scrollTop();
				var windowWidth = $(this).width();
				
				// Make sure they scroll more than delta
				if(Math.abs(lastScrollTop - scrollTop) <= delta) {
					return;
				}
				
				// Update mobile detection on each scroll
				isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || windowWidth <= 1024;
				
				// Only apply on mobile/tablet screens
				if(isMobile) {
					if(scrollTop > scrollThreshold) {
						if (scrollTop > lastScrollTop){
							// Scrolling down - hide MOBILE navbar
							console.log('Hiding MOBILE navbar');
							
							mobileNavbar.addClass('navbar-hidden').removeClass('navbar-visible');
							mobileNavbar.slideUp(800); // Same timing for both
							
							console.log('Applied slow hide animation to MOBILE navbar');
						} else {
							// Scrolling up - show MOBILE navbar
							console.log('Showing MOBILE navbar');
							
							mobileNavbar.addClass('navbar-visible').removeClass('navbar-hidden');
							mobileNavbar.slideDown(800); // Same timing for both
							
							console.log('Applied slow drop down animation to MOBILE navbar');
						}
					} else {
						// At the top - always show with smooth animation
						mobileNavbar.removeClass('navbar-hidden navbar-visible');
						mobileNavbar.slideDown(800);
						console.log('Top of page - smoothly showing MOBILE navbar');
					}
				} else {
					// Desktop - always show mobile navbar (in case of resize)
					mobileNavbar.removeClass('navbar-hidden navbar-visible');
					mobileNavbar.show();
				}
				
				lastScrollTop = scrollTop;
			});
		},
		hashtag: function(){
			var self			= this;
			var ccc 			= $('.skcode_topbar .menu .ccc');
			var element 		= $('.skcode_topbar .menu .current a');
			$('.skcode_topbar .menu a').on('mouseenter',function(){
				var e 			= $(this);
				self.currentLink(ccc,e);
			});
			$('.skcode_topbar .menu').on('mouseleave',function(){
				element 		= $('.skcode_topbar .menu .current a');
				self.currentLink(ccc,element);
			});
			self.currentLink(ccc,element);
		},
		currentLink: function(ccc,e){
			if(!e.length){return false;}
			var left 		= e.offset().left;
			var width		= e.outerWidth();
			var menuleft 	= $('.skcode_topbar .menu').offset().left;
			if(e.parent().hasClass('button')){
				width = 0;
			}
			ccc.css({left: (left-menuleft) + 'px',width: width + 'px'});
		},
		
	};
	
	$(document).ready(function(){
		// initialization
		skcodeObject.init();

		$(window).load('body', function(){
			skcodeObject.run_preloader();
		});

	});
	
})(jQuery);


jQuery('.anchor_nav').onePageNav();
