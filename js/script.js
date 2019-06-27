// loader 

$(window).on("load", function() {
    
    $(".loader").fadeOut(500); 


    // add animations to portfolio image icons 

    $(".items").isotope({
        filter: '*', // filter applied from start is ALL
        animationOptions: {
            duration: 1500,  // delay 
            easing: 'linear',  // smoothness and direction of animations 
            queue: false
        } 
    });
})




// execute code when document (webpage) is ready

$(document).ready(function(){  // $(): jQuery
    $('#slides').superslides({
        animation: 'fade',
        play: 5000
        // pagination: false

    });   

    const typed = new Typed(".typed", {
        strings: ["Software Engineer.", "Fullstack Developer.", "Data Scientist.", "Web Developer.", "Software Engineer."], 
        typeSpeed: 140, // delay between each char being typed out 
        loop: true,  // loops through to beginning
        startDelay: 1000, 
        showCursor: false // remove cursor 
    }); 


    $('.owl-carousel').owlCarousel({
        nav: true, // enable horizontal scrolling
        loop: true,
        items: 4,
        responsive:{ // how many items to show based on size of screen (responsive)
            0:{
                items: 1
            },
            480:{
                items: 2
            },
            768:{
                items: 3
            },
            938:{
                items: 4
            }
        }
    }); 

    

    // start animation only after you scroll to technical skills section  
    const skillsTopOffset = $(".skillsSection").offset().top;  // tells how many pixels down the skillsSection is located on webpage
    
    // start animation only after you scroll to stats section 
    const statsTopOffset = $(".statsSection").offset().top;
    let countUpFinished = false; 


    $(window).scroll(function() {

        if (window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
            
            $('.chart').easyPieChart({
                easing: 'easeInOut',  // smooth transition
                barColor: '#fff', // white
                trackColor: false, // part that is not filled in
                scaleColor: false,
                LineWidth: 4,
                size: 152,
        
                onStep: function(from, to, percent){
                    $(this.el).find('.percent').text(Math.round(percent)); // find current percent element of this item and set text to be value of percent
                }
            }); 
        }


        if (!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200){ // !countUpFinished prevents stats from resetting to 0

            // loop through each stat that has a class of counter and apply the countup animation to it   
    
            $(".counter").each(function() {
                
                const element = $(this); 
                const endVal = parseInt(element.text()); 

                element.countup(endVal); 
            })

            countUpFinished = true; 
        }
            
        });



        // fancybox plug-in for linked images 

        $("[data-fancybox]").fancybox(); 

 


        $("#filters a").click(function() { // #filters a: selecting element with id of "filters" and anchor tags underneath them

            // remove current class selected (i.e. ALL)
            $("#filters .current").removeClass("current"); 


            $(this).addClass("current") // "this" refers to the object event is called on (i.e. click event so refers to element clicked on)

            const selector = $(this).attr("data-filter"); // getting attributes of data filter (i.e. games, websites, etc.)


            $(".items").isotope({
                filter: selector, // retrieve data value for button currently clicked (i.e. games)
                animationOptions: {
                    duration: 1500,  // delay 
                    easing: 'linear',  // smoothness and direction of animation 
                    queue: false
                } 
            }); 

            return false; // don't do any more actions
        }); 


        // setup slow scroll down to website content when clicking Menu link 

        $("#navigation li a").click(function(event) {  // default behavior of anchor tag (a) is to go to link on click: trying to prevent this
            
            event.preventDefault(); // prevent link from working

            const targetElement = $(this).attr("href");   // this refers to item that event was called on (i.e. anchor tag)
            const targetPosition = $(targetElement).offset().top; 
            
            $("html, body").animate({scrollTop: targetPosition - 50}, "slow") // scroll to 50 pixels above content section 

        }); 



        // build sticky navigation bar 


        const nav = $("#navigation"); 
        const navTop = nav.offset().top; // gets top position (class) of navigation element; sticks to top of screen

        $(window).on("scroll", stickyNavigation); 

        function stickyNavigation () {

            const body = $("body"); 

            if($(window).scrollTop() >= navTop) {
                body.css("padding-top", nav.outerHeight() + "px"); // add padding so navbar doesn't jump upon scroll; 
                body.addClass("fixedNav"); 
            }

            else {
                body.css("padding-top", 0);
                body.removeClass("fixedNav")
            }


        }
}); 