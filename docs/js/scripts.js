;(function ( $, window, document, undefined ) {

    "use strict";

    // cache selectors
    var lastId,
        nav = $("#nav"),
        menuItems = nav.find("a"),
        // anchors corresponding to menu items
        scrollItems = menuItems.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        }),
        navPre = $('#nav-pre');

    // click handler
    menuItems.add('.js-scroll').on('click', function(event) {
        var href = $(this).attr("href");
        var offsetTop = href === "#" ? 0 : $(href).offset().top;
        $('html, body').animate({ 
            scrollTop: offsetTop
        }, 300);
        // event.preventDefault();
    });

    // scroll handler
    $(window).scroll(function(){
        // get container scroll position
        var fromTop = $(this).scrollTop();
        // get id of current scroll item
        var cur = scrollItems.map(function() {
        if ($(this).offset().top < fromTop + 100)
            return this;
        });

        // get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";
        // set/remove active class
        if (lastId !== id) {
            lastId = id;
            menuItems.removeClass("is-active").filter("[href='#"+id+"']").addClass("is-active");
        }

        // change navigation position
        if ( (navPre.offset().top - fromTop) < 0 ) {
            nav.css('position', 'fixed');
        } else {
            nav.css('position', 'relative');
        }
    });



    $('#vg-toggle').on('click', function(event) {
        event.preventDefault();
        $('html').toggleClass('show-vg');
    });
    $('#mq-toggle').on('click', function(event) {
        event.preventDefault();
        $('html').toggleClass('show-mq');
    });

})( jQuery, window, document );


