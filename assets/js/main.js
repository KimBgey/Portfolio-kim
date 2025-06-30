
!(function($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');

          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        $('html, body').animate({
          scrollTop: 0
        }, 350);

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox({
      'share': false
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // ➕ Ajoute ce bloc ici :
  $(document).ready(function() {
    const projets = {
      econge: {
        titre: "Détails sur le projet web eConge",
        images: [
          "assets/img/web/connect.jpg",
          "assets/img/web/Db.jpg",
          "assets/img/web/compteur.jpg",
          "assets/img/web/demande.jpg",
          "assets/img/web/profil.jpg",
          "assets/img/web/user.jpg",
          "assets/img/web/agent.jpg"
        ],
        infos: `
          <li><strong>Categorie</strong>: Developpement Web</li>
          <li><strong>Cadre</strong>: Stage Professionnel</li>
          <li><strong>Apport</strong>: Membre de l'équipe</li>
        `,
        description: "eConge est une plateforme de gestion de demande de congé en administration. J'ai été membre de l'équipe de développement. J'ai travaillé en tant que fullstack, avec une orientation frontend (Vue.js). Le projet a été développé en Vue.js, TypeScript et Nest.js, avec une base de données local MySQL et Prisma comme ORM. Il permet aux utilisateurs de soumettre des demandes de congé, de les approuver par la Hiérachie et de les gérer efficacement."
      },
      easycollab: {
        titre: "Détails sur le projet web Easycollab",
        images: [
          "assets/img/web/E1.jpg",
          "assets/img/web/E2.jpg",
          "assets/img/web/E3.jpg",
          "assets/img/web/E4.jpg",
          "assets/img/web/E5.jpg",
          "assets/img/web/E6.jpg",
          "assets/img/web/E7.jpg"
        ],
        infos: `
          <li><strong>Categorie</strong>: Developpement Web</li>
          <li><strong>Cadre</strong>: Projet Personnel Fin de Stage</li>
          <li><strong>Apport</strong>: Chef de projet</li>
        `,
        description: "Easycollab est une application web de gestion de projets collaboratifs. Ce projet a pour but d’optimiser la planification, la coordination et le suivi des tâches dans un environnement d’équipe. Il a été développé en PHP natif, avec une base de données MySQL, et intégrait une interface claire et intuitive."
      },
      emutuelle: {
        titre: "Détails sur le projet web eMutuelle",
        images: [
          "assets/img/web/M0.jpg",
          "assets/img/web/M1.jpg",
          "assets/img/web/M2.jpg",
          "assets/img/web/M3.jpg",
          "assets/img/web/M1.jpg",
          "assets/img/web/M2.jpg",
          "assets/img/web/M3.jpg"
        ],
        infos: `
          <li><strong>Categorie</strong>: Developpement Web</li>
          <li><strong>Cadre</strong>: Stage Professionnel</li>
          <li><strong>Apport</strong>: Membre de l'équipe</li>
        `,
        description: "eMutuelle est une plateforme de gestion de mutuelle pour la Direction des Systèmes d'Information (DSI). J'ai été membre de l'équipe de développement. J'ai travaillé en tant que fullstack, avec une orientation frontend (Vue.js). Le projet a été développé en Vue.js, TypeScript et Nest.js, avec une base de données local MySQL et Prisma comme ORM. Elle vise à automatiser les opérations administratives, financières et sociales de la mutuelle."
      }
      // ➕ Ajoute ici d'autres projets selon tes besoins
    };

    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("project");

    const projet = projets[projectId];

    if (projet) {
      $('.portfolio-title').text(projet.titre);
      $('.portfolio-info ul').html(projet.infos);
      $('.portfolio-info p').text(projet.description);

      const $carousel = $(".portfolio-details-carousel");
      $carousel.trigger('destroy.owl.carousel'); // supprime l'ancien
      $carousel.html(""); // vide le contenu

      projet.images.forEach((img) => {
        $carousel.append(`<img src="${img}" class="img-fluid" alt="">`);
      });

      // Réinitialiser le carrousel avec les nouvelles images
      $carousel.owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
      });
    } else if (window.location.pathname.includes("portfolio-details.html")) {
      $('#portfolio-details').html("<p class='text-danger'>Projet non trouvé.</p>");
    }
  });

})(jQuery);