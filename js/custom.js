(function ($) {
    $(".ftc-title.weight-3 h2").each(function() {
  // Some Vars
  var elText,
      openSpan = '<span class="first-word">',
      closeSpan = '</span>';
  
  // Make the text into array
  elText = $(this).text().split(" ");
  
  // Adding the open span to the beginning of the array
  elText.unshift(openSpan);
  
  // Adding span closing after the first word in each sentence
  elText.splice(3, 0, closeSpan);
  
  // Make the array into string 
  elText = elText.join(" ");
  
  // Change the html of each element to style it
  $(this).html(elText);
});
    "use strict";
    
    $('.portfolio-inner a[rel^="prettyPhoto"]').prettyPhoto({
show_title: false
,deeplinking: false
,social_tools: false
});
$(window).on('load', function(){
        if( typeof $.fn.isotope == 'function' ){
            $('.ftc-portfolio-wrapper .portfolio-inner').isotope({filter: '*'});
        }
    });

    $('.ftc-portfolio-wrapper .filter-bar li').on('click', function(){
        $(this).siblings('li').removeClass('current');
        $(this).addClass('current');
        var container = $(this).parents('.ftc-portfolio-wrapper').find('.portfolio-inner');
        var data_filter = $(this).data('filter');
        container.isotope({filter: data_filter});
    });

    $('.ftc-portfolio-wrapper').each(function(){
        var element = $(this);
        var atts = element.data('atts');
        
        element.find('a.load-more').on('click', function(){
            var button = $(this);
            if( button.hasClass('loading') ){
                return false;
            }
            
            button.addClass('loading');
            var paged = button.attr('data-paged');
            
            $.ajax({
                type : "POST",
                timeout : 30000,
                url : ftc_shortcode_params.ajax_uri,
                data : {
                    action: 'ftc_portfolio_load_items',
                    paged: paged,
                    atts : atts
                },
                error: function(xhr,err){

                },
                success: function(response) {
                    button.removeClass('loading');
                    button.attr('data-paged', ++paged);
                    if( response != 0 && response != '' ){
                        if( typeof $.fn.isotope == 'function' ){                                        
                            element.find('.portfolio-inner').isotope('insert', $(response));
                            element.find('.filter-bar li.current').trigger('click');
                            setTimeout(function(){
                                element.find('.portfolio-inner').isotope('layout');
                            }, 500);
                        }
                    }
                    else{ /* No results */
                        button.parent().remove();
                    }
                }
            });
            
            return false;
        });
    });
    
    $(document).ready(function() {
        $("#readMore, #readless").on("click",function(){
            $(".collapsed-content").toggle('slow', 'swing');
            $(".full-content").toggle('slow', 'swing');
            $("#readMore").toggle();// "read more link id"
            $("#readless").toggle();
            return false;
        });
    });
    
    
    $(document).ready(function() {
$("#readmore_des, #readless_des").on("click",function(){
            $(".desciption_content").toggle('slow', 'swing');
            $(".description_fullcontent").toggle('slow', 'swing');
            $("#readmore_des").toggle();
            $("#readless_des").toggle();

            return false;
        });
    });

    // notice wishlist/
    if($('body').hasClass('yith-wishlist')){
        yith_wcwl_l10n.enable_notices = true ;
    }
// end
    /* Light box */
$( '.swipebox' ).swipebox( {
        useCSS : true, // false will force the use of jQuery for animations
        useSVG : true, // false to force the use of png for buttons
        initialIndexOnArray : 0, // which image index to init when a array is passed
        hideCloseButtonOnMobile : false, // true will hide the close button on mobile devices
        removeBarsOnMobile : true, // false will show top bar on mobile devices
        hideBarsDelay : 3000, // delay before hiding bars on desktop
        videoMaxWidth : 1140, // videos max width
        beforeOpen: function() {}, // called before opening
        afterOpen: null, // called after opening
        afterClose: function() {}, // called after closing
        loopAtEnd: false // true will return to the first image after the last image is reached
    } );
    
    $('.details-img').imagesLoaded( function() {
$(".details_thumbnails li a").on("click",function() {
var changeSrc = $(this).attr("href");
$(".attachment-shop_single.size-shop_single").attr("src", changeSrc);
$(".ftc_lightbox .swipebox").attr("href", changeSrc);
$(".images .woocommerce-product-gallery__image a.swipebox").attr("href", changeSrc);
return false;
});
});

    /* Cookie Notice */
function ftc_cookie_popup() {
                var cookies_version = ftc_shortcode_params.cookies_version;
                if( $.cookie( 'ftc_cookies_' + cookies_version ) == 'accepted' ) return;
                var popup = $( '.ftc-cookies-popup' );

                setTimeout(function() {
                    popup.addClass('popup-display');
                    popup.on('click', '.cookies-accept-btn', function(e) {
                        e.preventDefault();
                        acceptCookies();
                    })
                }, 2500 );

                var acceptCookies = function() {
                    popup.removeClass('popup-display').addClass('popup-hide');
                    $.cookie( 'ftc_cookies_' + cookies_version, 'accepted', { expires: 60, path: '/' } );
                };
            }
ftc_cookie_popup();
    
    function ftc_off_canvas_cart() {
    var body = $('body');
    body.on("click", ".cart-item-canvas", function(t) {
        t.preventDefault();
        if(body.hasClass('cart-canvas')){
            body.removeClass('cart-canvas');
        } else {
            body.addClass('cart-canvas');
        }
    });
    body.on("click", ".close-cart", function(t) {
        if(body.hasClass('cart-canvas')){
            body.removeClass('cart-canvas');
        }
    });
    body.on("click", ".ftc-close-popup", function(t) {
            body.removeClass('cart-canvas');
    });
    $('body').on('added_to_cart', function(event, fragments, cart_hash) {
     body.addClass('cart-canvas');      
            }); 
}  
ftc_off_canvas_cart();
    
    /* Single Product Size Chart */
jQuery('a.ftc-size_chart').prettyPhoto({
    deeplinking: false
    ,opacity: 0.9
    ,social_tools: false
    ,default_width: 800
    ,default_height: 506
    ,theme: 'ftc-size_chart'
    ,changepicturecallback: function(){
        jQuery('.ftc-size-chart').addClass('loaded');
    }
}); 
/* Single Product Video */
    jQuery('a.ftc-product-video-button').prettyPhoto({
        deeplinking: false,
        opacity: 0.9,
        social_tools: false,
        default_width: 800,
        default_height: 506,
        theme: 'ftc-product-video',
        changepicturecallback: function () {
            jQuery('.ftc-product-video').addClass('loaded');
        }
    });
    
/* Product Category Show Top Content Widget Area */
$('.prod-cat-show-top-content-button a').on('click', function(){
    $(this).toggleClass('active');
    
    $('.product-category-top-content').slideToggle('fast');
	$('.product-category-top-content').toggleClass('showne');
    return false;
});

/*footer - mobile -element*/
if( $(window).width() < 481 ){
    $('.respon_footer .active_col .elementor-heading-title').append('<i class="icon-arrow-down"></i>');
    $('.respon_footer ').each(function(){
        $(this).find('.elementor-heading-title').on('click', function(e){
            e.preventDefault();
            $(this).closest('.elementor-heading-title').toggleClass('active');
            $(this).closest('.respon_footer .active_col').find('.elementor-widget-icon-list').slideToggle("fast");
            $(this).closest('.respon_footer .active_col').find('.elementor-widget-ftc-gallery-instagram').slideToggle("fast");
        });
    });
}

if( $(window).width() < 481 ){
    $('.footer-mobi .col-active .heading-title').append('<i class="icon-arrow-down"></i>');
    $('.footer-mobi ').each(function(){
        $(this).find('.heading-title').on('click', function(e){
            e.preventDefault();
            $(this).closest('.heading-title').toggleClass('active');
            $(this).closest('.footer-mobi .col-active').find('.bullet').slideToggle("fast");
            $(this).closest('.footer-mobi .col-active').find('.text-contact').slideToggle("fast");
            $(this).closest('.footer-mobi .col-active').find('.instagram-block').slideToggle("fast");
            $(this).closest('.footer-mobi .col-active').find('.form-mobi').slideToggle("fast");
        });
    });
}

/*smart Menu*/
$('#main-menu').smartmenus({
    subMenusSubOffsetX: 1,
    subMenusSubOffsetY: -8
});

/*Menu Mobile*/
$(document).ready(function(){
$('.ftc-mobile-wrapper #mega_main_menu.primary.mobile_minimized-enable > .menu_holder > .menu_inner >  ul > li.menu-item-has-children').on("click",function(){
    $(this).toggleClass('active');
    $(this).find(">.mega_dropdown").slideToggle();
  });
});

/* Single Product - Variable Product options */
$(document).on('click', '.variations_form .ftc-product-attribute .option a', function(){
    var _this = $(this);
    var val = _this.closest('.option').data('value');
    var selector = _this.closest('.ftc-product-attribute').siblings('select');
    if( selector.length > 0 ){
        if( selector.find('option[value="' + val + '"]').length > 0 ){
            selector.val(val).change();
            _this.closest('.ftc-product-attribute').find('.option').removeClass('selected');
            _this.closest('.option').addClass('selected');
        }
    }
    return false;
});

$('.variations_form').on('click', '.reset_variations', function(){
    $(this).closest('.variations').find('.ftc-product-attribute .option').removeClass('selected');
});
    
    /* product vendor */  
    $(document).ready(function() {
        if($('.wcvendors_sold_by_in_loop').length){
           $('.product .item-description').addClass('wc-vendor');      
        }

    });
     $(document).ready(function() {
        if($('.page-container .ftc-sidebar#left-sidebar').length){
            $('.page-container').find('.pv_shop_description').addClass('col-md-9');
        }
     });
     $(document).ready(function() {
        if($('.page-container .ftc-sidebar#right-sidebar').length){
            $('.page-container').find('.pv_shop_description').addClass('col-md-12');
        }
     });
     
     $(".vertical-menu").on("click",function () {
        $(this).find("#mega_main_menu.vertical").slideToggle("fast");
    });
    
    //header sticky menu
     var top_spacing = 0;
     if (jQuery(window).width() > 300) {
        if (
            jQuery("body").hasClass("logged-in") &&
            jQuery("body").hasClass("admin-bar")
            ) {
            top_spacing = 30;
    }
    var top_begin = jQuery("header.site-header").height() + 30;

    setTimeout(function() {
        jQuery(".header-sticky").sticky({
            topSpacing: top_spacing,
            topBegin: top_begin
        });
    }, 200);
    var old_scroll_top = 0;
    var extra_space = 850 + top_spacing + top_begin;
    jQuery(window).scroll(function() {
        if (jQuery(".is-sticky").length > 0) {
            var scroll_top = jQuery(this).scrollTop();
            if (scroll_top > old_scroll_top && scroll_top > extra_space) {

                /*Scroll Down*/
                jQuery(".header-sticky").addClass("header-sticky-hide");
               /* jQuery(".header-sticky").attr("style", "");*/
                
            } else {

                /*Scroll Up*/
                if (jQuery(".header-sticky").hasClass("header-sticky-hide")) {
                    jQuery(".header-sticky").removeClass("header-sticky-hide");
                }
            }
            old_scroll_top = scroll_top;
        }
    });
}  

/* Mobile sticky */
$(window).scroll(function() {
  var heightHeader = $(".header-ftc").height();
  if ($(this).scrollTop() > heightHeader) {
    $(".header-ftc ").addClass("header-sticky-mobile");
  } else {
    $(".header-ftc ").removeClass("header-sticky-mobile");
  }
});

 /* Popup Newletter */
$(document).ready(function() {
    $('.newsletterpopup .close-popup, .popupshadow').on('click', function(){
        $('.newsletterpopup').hide();
        $('.popupshadow').hide();
    });    
});
$( window ).load(function() {
 if($('.newsletterpopup').length){
    var cookieValue = $.cookie("ftc_popup");
    if(cookieValue == 1) {
        $('.newsletterpopup').hide();
        $('.popupshadow').hide();
    }else{
        $('.newsletterpopup').show();
        $('.popupshadow').show();
    }               
}     
});
   $(document).on('change','#ftc_dont_show_again',function(){
        if ($(this).is(':checked')) {
           $.cookie("ftc_popup", 1, { expires : 24 * 60 * 60 * 1000 });
       }
   }); 
    /* Mobile Navigation */
    function ftc_open_menu() {
        var body = $('body');

        body.on("click", ".mobile-nav", function() {
            if (body.hasClass("has-mobile-menu")) {
                body.removeClass("has-mobile-menu");
            } else {
                body.addClass("has-mobile-menu");
            }
        });
        body.on("click", ".btn-toggle-canvas", function() {
            body.removeClass("has-mobile-menu");
        });
        body.on("click touchstart", ".ftc-close-popup", function() {
            body.removeClass("has-mobile-menu");
        });
    }
    ftc_open_menu();

      // Show hide popover
      $(".dropdown-button").on("click",function () {
        $(this).find("#dropdown-list").slideToggle("fast");
    });
      // drop-down
      $(".dropdown-menu-header_click").on("click",function () {
        $(this).find("#dropdown-list_click").slideToggle("fast");
    });
      
      $(".menu-ftc").on("click",function () {
        $('#primary-menu').slideToggle("fast");
    });
      $('#mega_main_menu').parent().addClass('menu-fix');
      
      
      $('img.ftc-image').each(function () {
        if ($(this).data('src')) {
            $(this).attr('src', $(this).data('src'));
        }
    });
      
      $(".ftc_quickshop_thumbnail").on("click",function () {
       $(this).closest(".images-slider-wrapper").find(".item-image .quick_image").attr("src",$(this).attr("data-hover"));
   });
      /** To Top button **/
      if( $('html').offset().top < 100 ){
        $("#to-top").hide().addClass("off");
    }
    $(window).scroll(function(){
        if( $(this).scrollTop() > 100 ){
            $("#to-top").removeClass("off").addClass("on");
        } else {
            $("#to-top").removeClass("on").addClass("off");
        }
    });
    $('#to-top .scroll-button').on("click",function(){
        $('body,html').animate({
            scrollTop: '0px'
        }, 1000);
        return false;
    });

    if( typeof ftc_shortcode_params._ftc_enable_ajax_search != 'undefined' && ftc_shortcode_params._ftc_enable_ajax_search == 1 ){
        ftc_ajax_search();
    }
    /* Cloud Zoom */
    function ftc_cloud_zoom(){
     jQuery('.cloud-zoom-wrap .cloud-zoom-big').remove();
     jQuery('.cloud-zoom, .cloud-zoom-gallery').unbind('click');
     var clz_width = jQuery('.cloud-zoom, .cloud-zoom-gallery').width();
     var clz_img_width = jQuery('.cloud-zoom, .cloud-zoom-gallery').children('img').width();
     var cl_zoom = jQuery('.cloud-zoom, .cloud-zoom-gallery').not('.on_pc');
     var temp = (clz_width-clz_img_width)/2;
     if(cl_zoom.length > 0 ){
      cl_zoom.data('zoom',null).siblings('.mousetrap').unbind().remove();
      cl_zoom.CloudZoom({ 
       adjustX:temp   
   });
  }
}

ftc_cloud_zoom();
if( $('.cloud-zoom, .cloud-zoom-gallery').length > 0 ){
  $('form.variations_form').live('found_variation',function( event, variation ){
   $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom({}); 
}).live('reset_image',function(){
   $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom({});
});
}
/** Ajax search **/
function ftc_ajax_search(){
    var search_string = '';
    var search_previous_string = '';
    var search_timeout;
    var search_input;
    var search_cache_data = {};
    jQuery('.ftc_search_ajax').append('<div class="ftc-enable-ajax-search"></div>');
    var ftc_enable_ajax_search = jQuery('.ftc-enable-ajax-search');
    
    jQuery('.header-ftc .ftc_search_ajax input[name="s"]').on('keyup', function(e){
        search_input = jQuery(this);
        ftc_enable_ajax_search.hide();
        
        search_string = jQuery.trim(jQuery(this).val());
        if( search_string.length < 2 ){
            search_input.parents('.ftc_search_ajax').removeClass('loading');
            return;
        }
        
        if( search_cache_data[search_string] ){
            ftc_enable_ajax_search.html(search_cache_data[search_string]);
            ftc_enable_ajax_search.show();
            search_previous_string = '';
            search_input.parents('.ftc_search_ajax').removeClass('loading');
            
            ftc_enable_ajax_search.find('.view-all a').on('click', function(e){
                e.preventDefault();
                search_input.parents('form').submit();
            });
            
            return;
        }
        
        clearTimeout(search_timeout);
        search_timeout = setTimeout(function(){
            if( search_string == search_previous_string || search_string.length < 2 ){
                return;
            }
            search_previous_string = search_string;
            search_input.parents('.ftc_search_ajax').addClass('loading');
            
            
            var category = '';
            var select_category = search_input.parents('.ftc_search_ajax').siblings('.select-category');
            if( select_category.length > 0 ){
                category = select_category.find(':selected').val();
            }
            
            jQuery.ajax({
                type : 'POST'
                ,url : ftc_shortcode_params.ajax_uri
                ,data : {
                    action : 'ftc_ajax_search',
                    search_string: search_string,
                    category: category,
                    security: ftc_platform.ajax_nonce
                }
                ,error : function(xhr,err){
                    search_input.parents('.ftc_search_ajax').removeClass('loading');
                }
                ,success : function(response){
                    if( response != '' ){
                        response = JSON.parse(response);
                        if( response.search_string == search_string ){
                            ftc_enable_ajax_search.html(response.html);
                            search_cache_data[search_string] = response.html;
                            
                            ftc_enable_ajax_search.css({
                                'position': 'absolute'
                                ,'display': 'block'
                                ,'z-index': '999'
                            });
                            
                            search_input.parents('.ftc_search_ajax').removeClass('loading');
                            
                            ftc_enable_ajax_search.find('.view-all a').on('click', function(e){
                                e.preventDefault();
                                search_input.parents('form').submit();
                            });
                        }
                    }
                    else{
                        search_input.parents('.ftc_search_ajax').removeClass('loading');
                    }
                }
            });
        }, 500);
    });

    ftc_enable_ajax_search.on("hover",function(){}, function(){ftc_enable_ajax_search.hide();});

    jQuery('body').on('click', function(){
        ftc_enable_ajax_search.hide();
    });

    jQuery('.ftc-search-product select.select-category').on('change', function(){
        search_previous_string = '';
        search_cache_data = {};
        jQuery(this).parents('.ftc-search-product').find('.ftc_search_ajax input[name="s"]').trigger('keyup');
    });
}
    // FTC Owl slider
      $('.footer-top11 .ftc-sb-brandslider').each(function () { 
        var margin = $(this).data('margin');
        var columns = $(this).data('columns');
        var nav = $(this).data('nav') == 1;  
        var dots = $(this).data('dots') == 1; 
        var auto_play = $(this).data('auto_play') == 1;             
        var slider = $(this).data('slider') == 1;
        var desksmall_items = $(this).data('desksmall_items');
        var tabletmini_items = $(this).data('tabletmini_items');
        var tablet_items = $(this).data('tablet_items');
        var mobile_items = $(this).data('mobile_items');
        var mobilesmall_items = $(this).data('mobilesmall_items');        
        
        if( slider ){ 
            var _slider_data ={
                loop: true
                , nav: nav
                , dots: dots
                , navSpeed: 1000
                ,navText: [,]
                , rtl: $('body').hasClass('rtl')
                , margin: margin
                , autoplay: auto_play
                , autoplayTimeout: 5000
                , autoplaySpeed: 1000
                , responsiveBaseElement: $('body')
                , responsiveRefreshRate: 400
                , responsive: {
                    0:{
                      items: mobilesmall_items
                  },
                  490:{
                      items: mobile_items
                  },
                  650:{
                      items: tabletmini_items
                  },
                  768:{
                      items: tablet_items
                  },
                  991:{
                      items: desksmall_items
                  },
                  1199:{
                      items:7
                  }
              }
              ,onInitialized: function(){
                $(this).addClass('loaded').removeClass('loading');
            }
        };
        $(this).find('.meta-slider > div').owlCarousel(_slider_data);
    }

});
    
    $('.ftc-sb-brandslider,.ftc-product-slider,.ftc-list-category-slider').each(function () { 
        var margin = $(this).data('margin');
        var columns = $(this).data('columns');
        var nav = $(this).data('nav') == 1;  
        var dots = $(this).data('dots') == 1; 
        var auto_play = $(this).data('auto_play') == 1;             
        var slider = $(this).data('slider') == 1;
        var desksmall_items = $(this).data('desksmall_items');
        var tabletmini_items = $(this).data('tabletmini_items');
        var tablet_items = $(this).data('tablet_items');
        var mobile_items = $(this).data('mobile_items');
        var mobilesmall_items = $(this).data('mobilesmall_items');        
        
        if( slider ){ 
            var _slider_data ={
                loop: true
                , nav: nav
                , dots: dots
                , navSpeed: 1000
                ,navText: [,]
                , rtl: $('body').hasClass('rtl')
                , margin: margin
                , autoplay: auto_play
                , autoplayTimeout: 5000
                , autoplaySpeed: 1000
                , responsiveBaseElement: $('body')
                , responsiveRefreshRate: 400
                , responsive: {
                    0:{
                      items: mobilesmall_items
                  },
                  490:{
                      items: mobile_items
                  },
                  650:{
                      items: tabletmini_items
                  },
                  768:{
                      items: tablet_items
                  },
                  991:{
                      items: desksmall_items
                  },
                  1199:{
                      items:columns
                  }
              }
              ,onInitialized: function(){
                $(this).addClass('loaded').removeClass('loading');
            }
        };
        $(this).find('.meta-slider > div').owlCarousel(_slider_data);
    }

});
    
    $('.ftc-product-time-deal').each(function () { 
        var margin = $(this).data('margin');
        var columns = $(this).data('columns');
        var nav = $(this).data('nav') == 1;  
        var dots = $(this).data('dots') == 1; 
        var auto_play = $(this).data('auto_play') == 1;             
        var slider = $(this).data('slider') == 1;
        var desksmall_items = $(this).data('desksmall_items');
        var tabletmini_items = $(this).data('tabletmini_items');
        var tablet_items = $(this).data('tablet_items');
        var mobile_items = $(this).data('mobile_items');
        var mobilesmall_items = $(this).data('mobilesmall_items');        
        
        if( slider ){ 
            var _slider_data ={
                loop: true
                , nav: nav
                , dots: dots
                , navSpeed: 1000
                ,navText: [,]
                , rtl: $('body').hasClass('rtl')
                , margin: 0
                , padding: 15
                , autoplay: auto_play
                , autoplayTimeout: 5000
                , autoplaySpeed: 1000
                , responsiveBaseElement: $('body')
                , responsiveRefreshRate: 400
                , responsive: {
                    0:{
                      items: mobilesmall_items
                  },
                  480:{
                      items: mobile_items
                  },
                  640:{
                      items: tabletmini_items
                  },
                  768:{
                      items: tablet_items
                  },
                  991:{
                      items: desksmall_items
                  },
                  1199:{
                      items:columns
                  }
              }
              ,onInitialized: function(){
                $(this).addClass('loaded').removeClass('loading');
            }
        };
        $(this).find('.meta-slider > div').owlCarousel(_slider_data);
    }

});

/* Load more Product*/
    $('.ftc-product').each(function () {
        var element = $(this);
        var atts = element.data('atts');

        /* Show more */
        element.find('a.load-more').on('click', function () {
            var button = $(this);
            if (button.hasClass('loading')) {
                return false;
            }
            button.addClass('loading');
            var paged = button.attr('data-paged');

            $.ajax({
                type: "POST",
                timeout: 30000,
                url: ftc_shortcode_params.ajax_uri,
                data: {
                    action: 'ftc_products_load_items',
                    paged: paged,
                    atts: atts
                },
                error: function (xhr, err) {

                },
                success: function (response) {
                    button.removeClass('loading');
                    button.attr('data-paged', ++paged);
                    if (response != 0 && response != '') {
                        element.find('.products').append(response);
                        ftc_quickshop_process_action();
                    }
                    else { /* No results */
                        button.parent().remove();
                    }
                }
            });
            
            return false;
        });
    });


$('.ftc-sb-blogs').each(function() {
        var element = $(this);
        var atts = element.data('atts');

        /* Slider */
        if (atts.is_slider) {
            var nav = parseInt(atts.show_nav) == 1;
            var dots = parseInt(atts.dots) == 1;
            var auto_play = parseInt(atts.auto_play) == 1;
            var margin = parseInt(atts.margin);
            var columns = parseInt(atts.columns);
            var desksmall_items = parseInt(atts.desksmall_items);
            var tablet_items = parseInt(atts.tablet_items);
            var tabletmini_items = parseInt(atts.tabletmini_items);
            var mobile_items = parseInt(atts.mobile_items);
            var mobilesmall_items = parseInt(atts.mobilesmall_items);

            var slider_data = {
                loop: true,
                nav: nav,
                dots: true,
                navText: [, ],
                navSpeed: 1000,
                slideBy: 1,
                rtl: $('body').hasClass('rtl'),
                margin: margin,
                navRewind: false,
                autoplay: auto_play,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                autoplaySpeed: false,
                autoHeight: true,
                mouseDrag: true,
                touchDrag: true,
                responsiveBaseElement: $('body'),
                responsiveRefreshRate: 400,
                responsive: {
                    0: {
                        items: mobilesmall_items
                    },
                    490: {
                        items: mobile_items
                    },
                    650: {
                        items: tabletmini_items
                    },
                    768: {
                        items: tablet_items
                    },
                    991: {
                        items: desksmall_items
                    },
                    1199: {
                        items: columns
                    }
                },
                onInitialized: function() {
                    element.find('.meta-slider').addClass('loaded').removeClass('loading');
                }
            };
            element.find('.meta-slider > .blogs').owlCarousel(slider_data);
        }
 
       var masonry = false;
        if (atts.is_masonry && typeof $.fn.isotope == 'function') {
            masonry = true;
        }

        if (masonry) {
            $(window).on('load', function() {
                element.find('.blogs').isotope();
            });
        }
    /* Show more */
    element.find('a.load-more').on('click', function () {
        var button = $(this);
        if (button.hasClass('loading')) {
            return false;
        }

        button.addClass('loading');
        var paged = button.attr('data-paged');

        $.ajax({
            type: "POST",
            timeout: 30000,
            url: ftc_shortcode_params.ajax_uri,
            data: {
                action: 'ftc_blogs_load_items',
                paged: paged,
                atts: atts
            },
            error: function (xhr, err) {

            },
            success: function (response) {
                button.removeClass('loading');
                button.attr('data-paged', ++paged);
                if (response != 0 && response != '') {
                    if (masonry) {
                        element.find('.blogs').isotope('insert', $(response));
                        setTimeout(function () {
                            element.find('.blogs').isotope('layout');
                        }, 500);
                    } else { /* Append and Update first-last classes */
                        element.find('.blogs').append(response);

                        var columns = parseInt(atts.columns);
                        element.find('.blogs .item').removeClass('first last');
                        element.find('.blogs .item').each(function (index, ele) {
                            if (index % columns == 0) {
                                $(ele).addClass('first');
                            }
                            if (index % columns == columns - 1) {
                                $(ele).addClass('last');
                            }
                        });
                    }
                    ftc_blog_gallery();
                } else { /* No results */
                    button.parent().remove();
                }
            }
        });

        return false;
    });

});
// Gallery post, image slider
    function ftc_blog_gallery() {
$('.blog-image.gallery,.ftc-image-slider .ftc__slider__image').each(function () {
    $(this).addClass('loaded').removeClass('loading');
    $(this).owlCarousel({
        items: 1
        ,loop: true
        ,nav: true
        ,dots: true
        ,navText: [,]
        ,navSpeed: 1000
        ,slideBy: 1
        ,rtl: $('body').hasClass('rtl')
        ,margin: 10
        ,navRewind: false
        ,autoplay: true
        ,autoplayTimeout: 1000
        ,autoplayHoverPause: true
        ,autoplaySpeed: 4000
        ,autoHeight: true
        ,responsive:{
            0:{
                items : 1
            }
        }

    });

});
}
    ftc_blog_gallery();
    
$('.slider-product-8.ftc-product-slider').each(function () { 
var dot = $('.owl-dots .owl-dot');      
        dot.each(function() {
            var index = $(this).index() + 1;
            if(index < 10){
                $(this).html('').append(index);
            }else{
               $(this).html(index);
           }
       });   

});
    
     // Woocommerce Quantity on GitHub
     $( document ).on( 'click', '.plus, .minus', function() {

        // Get values
        var $qty        = $( this ).closest( '.quantity' ).find( '.qty' ),
        currentVal  = parseFloat( $qty.val() ),
        max         = parseFloat( $qty.attr( 'max' ) ),
        min         = parseFloat( $qty.attr( 'min' ) ),
        step        = $qty.attr( 'step' );

        // Format values
        if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
        if ( max === '' || max === 'NaN' ) max = '';
        if ( min === '' || min === 'NaN' ) min = 0;
        if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

        // Change the value
        if ( $( this ).is( '.plus' ) ) {

            if ( max && ( max == currentVal || currentVal > max ) ) {
                $qty.val( max );
            } else {
                $qty.val( currentVal + parseFloat( step ) );
            }

        } else {

            if ( min && ( min == currentVal || currentVal < min ) ) {
                $qty.val( min );
            } else if ( currentVal > 0 ) {
                $qty.val( currentVal - parseFloat( step ) );
            }

        }

        // Trigger change event
        $qty.trigger( 'change' );

    });
     /* Product thumbnails slider */
     if ($('.single-product').length > 0) {
        /* Horizontal slider */
        var wrapper = $('.single-product .product:not(.vertical-thumbnail) .details-img .thumbnails.loading');
        wrapper.find('.details_thumbnails').owlCarousel({
            loop: false
            , nav: true
            , navText: [, ]
            , dots: false
            , navSpeed: 1000
            , rtl: $('body').hasClass('rtl')
            , margin: 16
            , navRewind: false
            , autoplay: true
            , autoplayHoverPause: true
            , autoplaySpeed: 1000
            , responsiveBaseElement: wrapper
            , responsiveRefreshRate: 1000
            , responsive: {
                0: {
                    items: 1
                },
                100: {
                    items: 2
                },
                300: {
                    items: 3
                }
            }
            , onInitialized: function () {
                wrapper.addClass('loaded').removeClass('loading');
            }
        });

        /* Vertical slider */
        var wrapper = $('.single-product .product.vertical-thumbnail .details-img .thumbnails.loading');

        if (wrapper.length > 0 && typeof $.fn.carouFredSel == 'function') {
            var items = 4;
            if ($('#left-sidebar').length > 0 || $('#right-sidebar').length > 0) {
                items = 3;
            }
            if ($('#left-sidebar').length > 0 && $('#right-sidebar').length > 0) {
                items = 4;
            }

            var _slider_data = {
                items: items
                , direction: 'up'
                , width: 'auto'
                , height: '150px'
                , infinite: true
                , prev: wrapper.find('.owl-prev').selector
                , next: wrapper.find('.owl-next').selector
                , auto: {
                    play: true
                    , timeoutDuration: 5000
                    , duration: 800
                    , delay: 3000
                    , items: 1
                    , pauseOnHover: true
                }
                , scroll: {
                    items: 1
                }
                , swipe: {
                    onTouch: true
                    , onMouse: true
                }
                , onCreate: function () {
                    wrapper.addClass('loaded').removeClass('loading');
                }
            };

            wrapper.find('.details_thumbnails').carouFredSel(_slider_data);

            $(window).on('load', function () {
                $(window).trigger('resize');
            });

            $(window).on('resize orientationchange', $.debounce(250, function () {
                if ($(window).width() < 420) {
                    _slider_data.items = 2;
                } else if ($(window).width() < 500) {
                    _slider_data.items = 3;
                } else if ($(window).width() < 768) {
                    _slider_data.items = 4;
                } else {
                    _slider_data.items = items;
                }
                wrapper.find('.details_thumbnails').trigger('configuration', _slider_data);
            }));
        }
    }
    // Related products
    $('.single-product .related .products,.single-product .up-sells .products,.woocommerce .cross-sells .products').each(function () {
       $(this).addClass('loaded').removeClass('loading');
       $(this).owlCarousel({ 
        loop: true
        , nav: true
        , navText: [, ]
        , dots: true
        , navSpeed: 1000
        , slideBy: 1
        , rtl: jQuery('body').hasClass('rtl')
        , margin: 0
        , autoplayTimeout: 5000
        , responsiveRefreshRate: 400
        , responsive: {
            0: {
                items: 2
            },
            520: {
                items: 2
            },
            640: {
                items: 3
            },
            950: {
                items: 4
            }
        }       
    });

   });

// Related post
$('.single-post .related-posts.loading .meta-slider .blogs').each(function () {
   $(this).addClass('loaded').removeClass('loading');
   $(this).owlCarousel({ 
    loop: true
    , nav: false
    , navText: [, ]
    , dots: false
    , navSpeed: 1000
    , slideBy: 1
    , rtl: jQuery('body').hasClass('rtl')
    , margin: 30
    , autoplayTimeout: 5000
    , responsiveRefreshRate: 400
    , responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        800: {
            items: 2
        }
    }       
});

});
    
 // Category dropdown
 $(document).on('click', '.widget_categories span.icon-toggle', function(){
    if (!$(this).parent().hasClass('active')) {
        $(this).parent().find('ul.children:first').slideDown(300);
        $(this).parent().addClass('active');
    } else {
        $(this).parent().find('ul.children').slideUp(300);
        $(this).parent().removeClass('active');
        $(this).parent().find('li.cat-parent').removeClass('active');
    }
});
 $('.widget_categories li.current-cat').siblings('.icon-toggle').parents('ul.children').trigger('click').slideUp(300); 

 $(document).on('click', '.widget-container.ftc-product-categories-widget .icon-toggle', function(){

    if (!$(this).parent().hasClass('active')) {
        $(this).parent().addClass('active');
        $(this).parent().find('ul.children:first').slideDown(300);
    } else {
     $(this).parent().find('ul.children').slideUp(300);
     $(this).parent().removeClass('active');
     $(this).parent().find('li.cat-parent').removeClass('active');
 }
});

 $('.widget-container.ftc-product-categories-widget').each(function (){  
    $(this).find('ul.children').parent('li').addClass('cat-parent');
    $(this).find('li.current').parents('ul.children').siblings('.icon-toggle').trigger('click');
});

$('.widget-container.widget_categories').each(function (){  
    $(this).find('ul.children').parent('li').addClass('cat-parent');
    $(this).find('li.current').parents('ul.children').siblings('.icon-toggle').trigger('click');
});
$(".widget-container.widget_categories li.cat-parent").on("click",function () {
        $(this).find("ul.children").slideToggle("fast");
        $(this).toggleClass('active');
    });
    
    
    $('.widget-container.yith-woocommerce-ajax-product-filter').each(function (){  
    $(this).find('ul.children').parent('li').addClass('cat-parent');
    $(this).find('li.current').parents('ul.children').siblings('.icon-toggle').trigger('click');
});
$(".widget-container.yith-woocommerce-ajax-product-filter li.cat-parent").on("click",function () {
        $(this).find("ul.children").slideToggle("fast");
        $(this).toggleClass('active');
    });

 $('.widget-title-wrapper a.block-control').on('click', function (e) {
    e.preventDefault();
    $(this).parent().siblings().slideToggle(400);
    $(this).toggleClass('active');
});

 ftc_widget_on_off();
 if (!on_touch) {
    $(window).on('resize', $.throttle(250, function () {
        ftc_widget_on_off();
    }));
}
    // Woocommerce Order by
    $('form.woocommerce-ordering ul.orderby ul a').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('current')) {
            return;
        }
        $(this).closest('form.woocommerce-ordering').find('select.orderby').val($(this).attr('data-orderby'));
        $(this).closest('form.woocommerce-ordering').submit();
    });
    // Product slider in tab 
    function ftc_slider_products_categorytabs_is_slider(element, show_nav, auto_play, columns, responsive, margin) {
        if (element.find('.products .ftc-products').length > 0) {
            show_nav = (show_nav == 1) ? true : false;
            auto_play = (auto_play == 1) ? true : false;
            columns = parseInt(columns);
            var _slider_data = {
                loop: true
                , nav: show_nav
                , navText: [, ]
                , dots: true
                , navSpeed: 1000
                , slideBy: 1
                , rtl: $('body').hasClass('rtl')
                , margin: 0
                , navRewind: false
                , autoplay: auto_play
                , autoplayTimeout: 5000
                , autoplayHoverPause: false
                , autoplaySpeed: 1000
                , mouseDrag: true
                , touchDrag: true
                , responsiveBaseElement: $('body').find('.products')
                , responsiveRefreshRate: 400
                , responsive: {
                    0: {
                        items: 1
                    },
                    320: {
                        items: 2
                    },
                    470: {
                        items: 3
                    },
                    670: {
                        items: 4
                    },
                    870: {
                        items: 5
                    },
                    1100: {
                        items: columns
                    }
                }
                , onInitialized: function () {

                }
            };

            if (responsive != undefined) {
                _slider_data.responsive = responsive;
            }

            if (margin != undefined) {
                _slider_data.margin = margin;
            }

            element.find('.products').owlCarousel(_slider_data);
        }
    }

    var ftc_type_of_products_data = [];
    
    $('.ftc-products-category .row-tabs .tab-item').on('click', function () {
        /* Tab */
        if ($(this).hasClass('current') || $(this).parents('.ftc-products-category').find('.row-content').hasClass('loading')) {
            return;
        }
        $(this).parents('.ftc-products-category').find('.row-tabs .tab-item').removeClass('current');
        $(this).addClass('current')

        var element =$(this).parents('.ftc-products-category') ;
        var atts = element.data('atts');
        var margin = 0; 
        var responsive = {
            0: {
                items: 2
            }, 
            440: {
                items: 2
            }, 
            900: {
                items: 3
            }, 
            1000: {
                items: atts.columns
            }
        };              
        if (ftc_type_of_products_data[$(this).parents('.ftc-products-category').attr('id')] != undefined) {          
            if (typeof ftc_quickshop_process_action == 'function') {
                ftc_quickshop_process_action();
            }
            $(this).parents('.ftc-products-category').find('.lazy-loading img').each(function () {
                if ($(this).data('src')) {
                    $(this).attr('src', $(this).data('src'));
                }
            });
            $(this).parents('.ftc-products-category').find('.lazy-loading').removeClass('lazy-loading').addClass('lazy-loaded');           
        }
        $(this).parents('.ftc-products-category').find('.row-content').addClass('loading');

        $.ajax({
            type: "POST",
            timeout: 30000,
            url: ftc_shortcode_params.ajax_uri,
            data: {
                action: 'ftc_get_product_content_in_category_tab_2',
                atts: atts,
                product_cat: $(this).data('product_cat')
            },
            error: function (xhr, err) {
            },
            success: function (response) {
                if (response) {                    
                    element.find('.column-products .products.owl-carousel').owlCarousel('destroy');
                    element.find('.row-content > div').remove();
                    element.find('.row-content').append(response);
                    if (typeof ftc_quickshop_process_action == 'function') {
                        ftc_quickshop_process_action();
                    } 
                    ftc_countdown(element.find('.product .counter-wrapper'));
                    ftc_slider_products_categorytabs_is_slider(element, atts.show_nav, atts.auto_play, atts.columns, responsive, margin);
                }
                element.find('.row-content').removeClass('loading');
            }
        });
    });

    $('.ftc-products-category').each(function () {
        var current_tab = 1;
        var count_tab = $(this).find('.row-tabs .tab-item').length;
        var atts = $(this).data('atts');
        if (atts.current_tab != undefined) {
            var defined_current_tab = parseInt(atts.current_tab);
            if (defined_current_tab > 1 && defined_current_tab <= count_tab) {
                current_tab = defined_current_tab;
            }
        }

        $(this).find('.row-tabs .tab-item').eq(current_tab - 1).trigger('click');
    });

// Countdown
function ftc_countdown(countdown) {
    if (countdown.length > 0) {
        var interval = setInterval(function () {
            countdown.each(function (index,countdown) {
                var day = 0;
                var hour = 0;
                var minute = 0;
                var second = 0;

                var delta = 0;
                var time_day = 60 * 60 * 24;
                var time_hour = 60 * 60;
                var time_minute = 60;

                $(countdown).find('.days .number-wrapper .number').each(function (i, e) {
                    day = parseInt($(e).text());
                });
                $(countdown).find('.hours .number-wrapper .number').each(function (i, e) {
                    hour = parseInt($(e).text());
                });
                $(countdown).find('.minutes .number-wrapper .number').each(function (i, e) {
                    minute = parseInt($(e).text());
                });
                $(countdown).find('.seconds .number-wrapper .number').each(function (i, e) {
                    second = parseInt($(e).text());
                });

                if (day != 0 || hour != 0 || minute != 0 || second != 0) {
                    delta = (day * time_day) + (hour * time_hour) + (minute * time_minute) + second;
                    delta--;

                    day = Math.floor(delta / time_day);
                    delta -= day * time_day;

                    hour = Math.floor(delta / time_hour);
                    delta -= hour * time_hour;

                    minute = Math.floor(delta / time_minute);
                    delta -= minute * time_minute;

                    if (delta > 0) {
                        second = delta;
                    } else {
                        second = '0';
                    }

                    day = (day < 10) ? ftc_start_number_timer(day, 2) : day.toString();
                    hour = (hour < 10) ? ftc_start_number_timer(hour, 2) : hour.toString();
                    minute = (minute < 10) ? ftc_start_number_timer(minute, 2) : minute.toString();
                    second = (second < 10) ? ftc_start_number_timer(second, 2) : second.toString();

                    $(countdown).find('.days .number-wrapper .number').each(function (i, e) {
                        $(e).text(day);
                    });

                    $(countdown).find('.hours .number-wrapper .number').each(function (i, e) {
                        $(e).text(hour);
                    });

                    $(countdown).find('.minutes .number-wrapper .number').each(function (i, e) {
                        $(e).text(minute);
                    });

                    $(countdown).find('.seconds .number-wrapper .number').each(function (i, e) {
                        $(e).text(second);
                    });
                }

            });
        }, 1000);
    }
}

ftc_countdown($('.product .counter-wrapper, .ftc-countdown .counter-wrapper'));
function ftc_start_number_timer(str, max) {
    str = str.toString();
    return str.length < max ? ftc_start_number_timer('0' + str, max) : str;
}
 // Testimonial         
 $('.test-home11.ftc-sb-testimonial.ftc-slider').each(function () {
    var slider = true;
    if ($(this).find('.item').length <= 1) {
        slider = false;
    }
    var columns = 1;
    if (slider) {
       var nav = $(this).data('nav') == 1;
       var dots = $(this).data('dots') == 1;
       columns = $(this).data('columns');
       var autoplay = $(this).data('autoplay') == 1;                
       $(this).addClass('loaded').removeClass('loading');
       $(this).owlCarousel({
        items: 1
        , loop: true
        , nav: nav
        , dots: dots
        , animateIn: 'fadeIn'
        , animateOut: 'fadeOut'
        , navText: [, ]
        , navSpeed: 1000
        , rtl: $('body').hasClass('rtl')
        , margin: 0
        , autoplay: autoplay
        , autoplayTimeout: 5000
        , center: true
        , responsive: {
            0: {
                items: 3
            },
            700: {
                items: columns
            }
        }
    });
   }
});
 $('.ftc-sb-testimonial.ftc-slider').each(function () {
    var slider = true;
    if ($(this).find('.item').length <= 1) {
        slider = false;
    }
    var columns = 1;
    if (slider) {
       var nav = $(this).data('nav') == 1;
       var dots = $(this).data('dots') == 1;
       columns = $(this).data('columns');
       var autoplay = $(this).data('autoplay') == 1;                
       $(this).addClass('loaded').removeClass('loading');
       $(this).owlCarousel({
        items: 1
        , loop: true
        , nav: nav
        , dots: dots
        , animateIn: 'fadeIn'
        , animateOut: 'fadeOut'
        , navText: [, ]
        , navSpeed: 1000
        , rtl: $('body').hasClass('rtl')
        , margin: 30
        , autoplay: autoplay
        , autoplayTimeout: 5000
        , center: false
        , responsive: {
            0: {
                items: 1
            },
            700: {
                items: columns
            }
        }
    });
   }
});

// Google map
function ftc_googlemap_start_up(map_content_obj, address, zoom, map_type, title) {
    var geocoder, map;
    geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var _ret_array = new Array(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map
                , title: title
                , position: results[0].geometry.location
            });
        }
    });

    var mapCanvas = map_content_obj.get(0);
    var mapOptions = {
        center: new google.maps.LatLng(44.5403, -78.5463)
        , zoom: zoom
        , mapTypeId: google.maps.MapTypeId[map_type]
        , scrollwheel: false
        , zoomControl: true
        , panControl: true
        , scaleControl: true
        , streetViewControl: false
        , overviewMapControl: true
        , disableDoubleClickZoom: false
    }
    map = new google.maps.Map(mapCanvas, mapOptions)
}

$(window).on('load resize', function () {
    $('.google-map-container').each(function () {
        var element = $(this);
        var map_content = $(this).find('> div');
        var address = element.data('address');
        var zoom = element.data('zoom');
        var map_type = element.data('map_type');
        var title = element.data('title');
        ftc_googlemap_start_up(map_content, address, zoom, map_type, title);
    });
});

 // Product widget
 $('.ftc-product-items-widget.ftc-slider').each(function () {      
    var nav = $(this).data('nav') == 1;
    var auto_play = $(this).data('auto_play') == 1;
    var columns = $(this).data('columns');
    var margin = $(this).data('margin');

    $(this).owlCarousel({
        loop: true
        , items: 1
        , nav: nav
        , navText: [, ]
        , dots: false
        , navSpeed: 1000
        , slideBy: 1
        , rtl: $('body').hasClass('rtl')
        , navRewind: false
        , columns: columns
        , margin: margin
        , autoplay: auto_play
        , autoplayTimeout: 5000
        , responsiveRefreshRate: 1000
        , responsive: {
            0: {
                items: columns
            }
        }
    });
});

 function ftc_update_information_tini_wishlist() {
    if (typeof ftc_shortcode_params.ajax_uri == 'undefined') {
        return;
    }
    var wishlist = jQuery('.ftc-my-wishlist');
    if (wishlist.length == 0) {
        return;
    }

    wishlist.addClass('loading');
    jQuery.ajax({
        type: 'POST'
        , url: ftc_shortcode_params.ajax_uri
        , data: {
            action: 'update_tini_wishlist'
        }
        , success: function (response) {
            var first_icon = wishlist.children('i.fa:first');
            wishlist.html(response);
            if (first_icon.length > 0) {
                wishlist.prepend(first_icon);
            }
            wishlist.removeClass('loading');
        }
    });
}

$('body').on('added_to_wishlist', function () {
    ftc_update_information_tini_wishlist();
    $('.yith-wcwl-wishlistaddedbrowse.show, .yith-wcwl-wishlistexistsbrowse.show').closest('.yith-wcwl-add-to-wishlist').addClass('added');
});
$(document).on('click', '#yith-wcwl-form table tbody tr td a.remove, #yith-wcwl-form table tbody tr td a.add_to_cart_button', function () {
    var old_num_product = $('#yith-wcwl-form table tbody tr[id^="yith-wcwl-row"]').length;
    var count = 1;
    var time_interval = setInterval(function () {
        count++;
        var new_num_product = $('#yith-wcwl-form table tbody tr[id^="yith-wcwl-row"]').length;
        if (old_num_product != new_num_product || count == 20) {
            clearInterval(time_interval);
            ftc_update_information_tini_wishlist();
        }
    }, 500);
});
/* Product  360*/
$('a.ftc-video360').magnificPopup({
                type: 'inline',
                mainClass: 'product-360',
                preloader: false,
                fixedContentPos: false,
                callbacks: {
                    open: function() {
                        $(window).resize()
                    },
                },
});

/* Infinite-Shop */
    function ftc_infinite_shop() {
        var container = $('.archive.infinite .woocommerce > .products, .archive.term-all-goods .woocommerce > .products'),
            paginationNext = '.woocommerce-pagination li a.next';
        if (container.length === 0 || $(paginationNext).length === 0) {
            return;
        }
        var loadProduct = container.infiniteScroll({
            path: paginationNext,
            append: '.product',
            checkLastPage: true,
            status: '.page-load-status',
            hideNav: '.woocommerce-pagination',
            history: 'push',
            debug: false,
            scrollThreshold: 400,
            loadOnScroll: true
        });
        loadProduct.on('append.infiniteScroll', function (event, response, path, items) {
            $('img.ftc-lazy-load').on('load', function () {
                $(this).parents('.lazy-loading').removeClass('lazy-loading').addClass('lazy-loaded');
            });
            $('img.ftc-lazy-load').each(function () {
                if ($(this).data('src')) {
                    $(this).attr('src', $(this).data('src'));
                }
            });
            ftc_quickshop_process_action();
        })
    }

    ftc_infinite_shop();

    /* Product  360*/
    $('a.ftc-video360').magnificPopup({
        type: 'inline',
        mainClass: 'product-360',
        preloader: false,
        fixedContentPos: false,
        callbacks: {
            open: function () {
                $(window).resize()
            },
        },
    });

function ftc_quickshop_process_action() {
    jQuery('a.quickview').prettyPhoto({
        deeplinking: false
        , opacity: 0.9
        , social_tools: false
        , default_width: 900
        , default_height: 450
        , theme: 'pp_woocommerce'
        , changepicturecallback: function () {
            jQuery('.pp_inline').find('form.variations_form').wc_variation_form();
            jQuery('.pp_inline').find('form.variations_form .variations select').change();
            jQuery('body').trigger('wc_fragments_loaded');

            jQuery('.pp_inline .variations_form').on('click', '.reset_variations', function () {
                jQuery(this).closest('.variations').find('.ftc-product-attribute .option').removeClass('selected');
            });

            jQuery('.pp_woocommerce').addClass('loaded');

            var _this = jQuery('.ftc-quickshop-wrapper .images-slider-wrapper');

            if (_this.find('.image-item').length <= 1) {
                return;
            }

            var owl = _this.find('.image-items').owlCarousel({
                items: 1
                , loop: true
                , nav: true
                , navText: [, ]
                , dots: false
                , navSpeed: 1000
                , slideBy: 1
                , rtl: jQuery('body').hasClass('rtl')
                , margin: 10
                , navRewind: false
                , autoplay: false
                , autoplayTimeout: 5000
                , autoplayHoverPause: false
                , autoplaySpeed: false
                , mouseDrag: true
                , touchDrag: true
                , responsiveBaseElement: _this
                , responsiveRefreshRate: 1000
                , onInitialized: function () {
                    _this.addClass('loaded').removeClass('loading');
                }
            });

        }
    });

}
ftc_quickshop_process_action();

function ftc_widget_on_off() {
    if (typeof ftc_shortcode_params._ftc_enable_responsive != 'undefined' && !ftc_shortcode_params._ftc_enable_responsive) {
        return;
    }
    jQuery('.wpb_widgetised_column .widget-title-wrapper a.block-control, .footer-container .widget-title-wrapper a.block-control').remove();
    var window_width = jQuery(window).width();
    window_width += ftc_take_width_of_scrollbar();
    if (window_width >= 992 ) {
        
        jQuery('.widget-title-wrapper a.block-control').removeClass('active').hide();
        jQuery('.widget-title-wrapper a.block-control').parent().siblings().show();
    } else {
        jQuery('.widget-title-wrapper a.block-control').addClass('active').show();
        jQuery('.widget-title-wrapper a.block-control').parent().siblings().show();
        jQuery('.wpb_widgetised_column .widget-title-wrapper, .footer-container .widget-title-wrapper').siblings().show();
    }
}


(function (a) {
    jQuery.browser.ftc_mobile = /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);
function ftc_is_device_like_smartphone() {
    var is_touch = !!("ontouchstart" in window) ? true : false;
    if (jQuery.browser.ftc_mobile) {
        is_touch = true;
    }
    return is_touch;
}
var on_touch = ftc_is_device_like_smartphone();

function ftc_take_width_of_scrollbar() {
    var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
    $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
    inner = $inner[0],
    outer = $outer[0];

    jQuery('body').append(outer);
    var width1 = inner.offsetWidth;
    $outer.css('overflow', 'scroll');
    var width2 = outer.clientWidth;
    $outer.remove();

    return (width1 - width2);
}

    // Ajax Remove Cart
    if( $('ftc-shop-cart')){
        $(document).on('click', '.cart-item-wrapper .remove', function(event){
            event.preventDefault();
            $(this).closest('li').addClass('loading');
            
            jQuery.ajax({
                type : 'POST'
                ,url : ftc_shortcode_params.ajax_uri 
                ,data : {
                    action : 'ftc_remove_cart_item', 
                    cart_item_key : $(this).data('key'),
                    security: ftc_platform.ajax_nonce
                }
                ,success : function(data){
                    if ( data && data.fragments ) {

                        $.each( data.fragments, function( key, value ) {
                            $( key ).replaceWith( value );
                        });
                    }
                }
            });
        });
    }
    
     //Milestone      
     if( typeof $.fn.waypoint == 'function' && typeof $.fn.countTo == 'function' ){
      $('.ftc-number').waypoint(function(){
         var element = $(this.element);
         var number = element.data('number');
         element.find('.number').countTo({
            from: 0
            ,to: number
            ,speed: 1000
            ,refreshInterval: 50,
            formatter: function (value, options) {
              return value.toFixed(options.decimals);
          },
          onUpdate: function (value) {
             console.debug(this);
         },
         onComplete: function (value) {
             console.debug(this);
         }
     });
     }, {offset: '100%'});
  }
  $(document).on('mouseenter', '.ftc_thumb_list_hover', function(){
   $(this).closest(".ftc-product").find(".item-image a img").attr("src",$(this).attr("data-hover"));   
}); 

 // Parallax Background Speed
 function ftc_parallax_background(){
    jQuery('.ftc-prlx-background').each(function(){
        var prlx_speed = jQuery(this).data('prlx-speed');
        if( typeof prlx_speed == 'undefined' ){
            prlx_speed = 1;
        }
        prlx_speed = parseFloat(prlx_speed);

        jQuery(this).parallax('50%', prlx_speed);
    });
}
ftc_parallax_background();

/* show/hide filter products */
/*if ($(this).width() < 991 ) {
    $('.widget-container.widget_text .widget-title').on('click', function(){
        $('.widget-container.widget_layered_nav, .widget-container.widget_price_filter').slideToggle();
        $('.widget-container.widget_layered_nav, .widget-container.widget_price_filter').toggleClass('show');
        $(this).toggleClass('active');
        return true;
    });
}*/

/*filter by products*/
if ($(this).width()<991) {
    $('.button-sidebar').bind('click', function(){
        $('body').toggleClass("sidebar-show");
        $('.button-sidebar').toggleClass('active');
        $('.archive .ftc-sidebar, .single-product .ftc-sidebar').toggleClass("show-popup");

        $('body').on("click", ".ftc-close-popup", function(){
            $('.archive .ftc-sidebar, .single-product .ftc-sidebar').removeClass('show-popup');
            $('body').removeClass("sidebar-show");
            $('.button-sidebar').removeClass('active');
        });
        return false;
    });

}


})(jQuery);

/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */