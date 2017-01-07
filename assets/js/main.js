jQuery(document).ready(function($){

/*****
*** Auto Hide and Reveal Header
*****/

//modified from:
//https://codyhouse.co/gem/auto-hiding-navigation/

	var mainHeader = $('.cd-auto-hide-header'),
		// secondaryNavigation = $('.cd-secondary-nav'),
		// //this applies only if secondary nav is below intro section
		// belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();

	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		// ( belowNavHeroContent.length > 0 )
		// 	? checkStickyNavigation(currentTop) // secondary navigation below intro
		// 	:
    checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    }
	}

		//have nav links scroll to sections
  	$('a.button').bind('click', function(e) {
			var $anchor= $(this);
			//console.log($anchor);
			var $offset = $($anchor.attr('href')).offset().top;
			var $windowOffset = $(window).scrollTop();
			//console.log($offset);
			//console.log($windowOffset);
			//console.log(previousTop);
			//console.log(currentTop);
			if(previousTop - currentTop < scrollDelta || previousTop < $offset && $windowOffset !== 0) { //at top, going down the page
				 	$('html, body').stop().animate({
				 			scrollTop: ($($anchor.attr('href')).offset().top
							)}, 1250, 'easeInOutQuart');
							e.preventDefault();
			} else {
					$('html, body').stop().animate({
						scrollTop: ($($anchor.attr('href')).offset().top - 50
						)}, 1250, 'easeInOutQuart');
						e.preventDefault();
					  }
		  });

/***** Mobile Menu Behavior *****/

	$("#cd-navigation a").click(function() {
		$("#navbar").removeClass("in");
	});

/***** About Section Reveal *****/

/* https://github.com/jlmakes/scrollreveal */
	window.sr = ScrollReveal({duration: 2000 });
	sr.reveal('.reveal', 75);

/*****
*** Portfolio Section Interactions
*****/

var arrayWell = ["img/InnerLightReiki960.png", "Inner Light Reiki", "Alternative Wellness",
             "The business owner wanted her site visitors to be able to learn about Reiki, schedule and pay for appointments, subscribe to the blog, and get in touch. I built this responsive site with WordPress by developing a child theme which includes custom styles and page templates. I also installed and configured several plug-ins to help achieve the desired functionality.",
             "http://innerlightreiki.net"];

var arrayIT = ["img/Luminnet960.png", "Luminet", "IT Project Management",
               "This small, responsive site was designed and coded by me without any framework or content management system. It includes a secure PHP contact form with Google's ReCaptcha anti-spam widget, and some jQuery.",
               "http://luminnet.com"];

var arrayABMG = ["img/atlanticbay960.jpg", "Atlantic Bay Mortgage Group", "Mortgage Lending",
 								 "My projects at Atlantic Bay included the creation of two distinct blog sections on the site, a UI kit for use in future projects, and a brand refresh for the entire website. Atlantic Bay lacked a centralized blog. I translated the designer's mockups into a new set of functional WordPress PHP templates and CSS styles. By creating a new custom post type, I was able to have two seperated blog sections on the site - one for the mortgage customer, and one to serve other publishing needs. I also created a custom solution for placing breadcrumb navigation on single posts. Soon after the launch of the new blog, Atlantic Bay reached 10,000 likes on Facebook for the first time in its history.",
									"http://atlanticbay.com/blog"];

var current = 0;
var arrayBasket = [];
arrayBasket.push(arrayABMG);
arrayBasket.push(arrayWell);
arrayBasket.push(arrayIT);

// add selected content into html elements
var dynamic = function(array) {
     $(".previews img").attr("src", array[0]);
     $("#cname").append("Name: " + array[1]);
     $("#cservice").append("Industry: " + array[2]);
     $("#pdesc").append(array[3]);
     $("#weblink a").prop("href", array[4]);
}
// remove content from html elements
var empty = function() {
     $(".previews img").attr("src", "");
     $("#cname").empty();
     $("#cservice").empty();
     $("#pdesc").empty();
     $("#weblink a").prop("href", "");
}

// image click reveals hidden row populated with selected project's content
$(".folio").each(function(){
    $(this).click(function(e) {
       e.preventDefault();

        switch (this.getAttribute("id")) {
            case "ABMG":
                empty();
                dynamic(arrayABMG);
                current = 0
                break;
						case "ILR":
                empty();
                dynamic(arrayWell);
                current = 1;
                break;
						case "LNET":
	              empty();
	              dynamic(arrayIT);
	              current = 2;
	              break;
            default:
                dynamic(arrayABMG);
                current= 0;
            }

		   $("#portfolio").slideDown();
			 // bring revealed portfolio section to the top
			 $('html, body').stop().animate({
					scrollTop: $("#portfolio").offset().top
					}, 1250, 'easeInOutQuart');

			})
});

	// X closes #Portfolio div
    $("#close").click(function() {
        $("#portfolio").slideUp();
				empty();
    });

	// Arrows move data previous(left) or next(right)
		$("#left").click(function(){
		  empty();
		//get array position of the currently displayed array
		current
		//decrement by one the array position
		if(current == 0) {
		  prev= arrayBasket.length -1;
		  current = arrayBasket.length -1;
		} else {
		  prev = current -1;
		  current = current -1;
		  }
		//display the contents of that array
		dynamic(arrayBasket[prev]);
		});


		$("#right").click(function(){
		  empty();
		//get array position of the currently displayed array
		current
		//decrement by one the array position
		if(current == arrayBasket.length -1) {
		  next= 0;
		  current= 0;
		} else {
		  next = current +1;
		  current = current +1;
		  }
		//display the contents of that array
		dynamic(arrayBasket[next]);
		});

});
