/*!
    * Start Bootstrap - Agency v6.0.2 (https://startbootstrap.com/template-overviews/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict




/// Frases de motivacion

var pon_frase_en_span = function (data) {

    frase = data['parse']['text']['*'];
    frase = frase.replace(/\/wiki\//g, "http://es.wikiquote.org/wiki/")

    let parser = new DOMParser();
    let xml = parser.parseFromString(frase, "text/xml");
    let tagFrase = xml.getElementsByTagName('td')
    document.getElementById ('frase').innerHTML =tagFrase[2].textContent;
    //document.getElementById ('autor').innerHTML =tagFrase[4].textContent;
    console.log(tagFrase[4].textContent)
    let wikiAutor = tagFrase[4].textContent;
    var otraStr = wikiAutor.replace(/([a-z])([A-Z])/g, '$1 - $2');
    let f1 = otraStr.split(' - ')[0]
    let f2 = otraStr.split(' - ')[1]
    consoleText(['Autor: ', f1, f2], 'autor',['tomato','rebeccapurple','blue']);
    console.log(tagFrase[4].textContent)
};

var dame_frase_wikiquote = function () {
    var now = new Date ();
    var day = now.getDay();
    if(day == 0) titulo='{{Plantilla:Frase-domingo}}';
    if(day == 1) titulo='{{Plantilla:Frase-lunes}}';
    if(day == 2) titulo='{{Plantilla:Frase-martes}}';
    if(day == 3) titulo='{{Plantilla:Frase-miércoles}}';
    if(day == 4) titulo='{{Plantilla:Frase-jueves}}';
    if(day == 5) titulo='{{Plantilla:Frase-viernes}}';
    if(day == 6) titulo='{{Plantilla:Frase-sábado}}';

    url = 'http://es.wikiquote.org/w/api.php?action=parse&text='+titulo+'&format=json&callback=pon_frase_en_span';
    var elem = document.createElement ('script');
    elem.setAttribute ('src', url);
    elem.setAttribute ('type','text/javascript');
    document.getElementsByTagName ('head') [0].appendChild (elem);
};


function modalEvent() {
    const modal = document.querySelector(`[data-modal=trigger-demo]`);
    const contentWrapper = modal.querySelector('.content-wrapper');
    const close = modal.querySelector('.close');

    close.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', () => modal.classList.remove('open'));
    document.getElementById("botonModalOk").addEventListener('click', () => modal.classList.remove('open'));
    contentWrapper.addEventListener('click', (e) => e.stopPropagation());

    modal.classList.toggle('open');
}

function cargarModal() {
    dame_frase_wikiquote();
    modalEvent()
}



function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function() {

        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function() {
                var usedColor = colors.shift();
                colors.push(usedColor);
                var usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0])
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function() {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount)
            letterCount += x;
        }
    }, 120)
    window.setInterval(function() {
        if (visible === true) {
            con.className = 'console-underscore hidden'
            visible = false;

        } else {
            con.className = 'console-underscore'

            visible = true;
        }
    }, 400)
}
