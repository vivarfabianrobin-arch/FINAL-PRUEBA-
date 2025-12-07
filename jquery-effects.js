// ============================================
// JQUERY EFFECTS - ECODELIVERY
// ============================================

$(document).ready(function() {
  
  // ============================================
  // PRELOADER
  // ============================================
  $(window).on('load', function() {
    setTimeout(function() {
      $('#preloader').addClass('hidden');
    }, 800);
  });

  
  // ============================================
  // MENÚ HAMBURGUESA RESPONSIVE
  // ============================================
  $('.menu-toggle').click(function() {
    $(this).toggleClass('active');
    $('.nav').toggleClass('active');
    $('body').toggleClass('menu-open');
  });

  // Cerrar menú al hacer click en un enlace
  $('.nav-list li a').click(function() {
    if ($(window).width() <= 968) {
      $('.menu-toggle').removeClass('active');
      $('.nav').removeClass('active');
      $('body').removeClass('menu-open');
    }
  });

  // Cerrar menú al hacer click fuera
  $(document).click(function(e) {
    if (!$(e.target).closest('.header-container').length) {
      if ($('.nav').hasClass('active')) {
        $('.menu-toggle').removeClass('active');
        $('.nav').removeClass('active');
        $('body').removeClass('menu-open');
      }
    }
  });

  
  // ============================================
  // BANNER ANIMADO CON SLIDER
  // ============================================
  let currentSlide = 0;
  const slides = $('.banner-slide');
  const totalSlides = slides.length;
  
  // Función para mostrar slide
  function showSlide(index) {
    slides.removeClass('active').eq(index).addClass('active');
    $('.dot').removeClass('active').eq(index).addClass('active');
    
    // Re-animar texto
    $('.banner-slide.active .animate-text, .banner-slide.active .animate-text-delay')
      .css('animation', 'none')
      .height();
    $('.banner-slide.active .animate-text, .banner-slide.active .animate-text-delay')
      .css('animation', '');
  }
  
  // Auto-play del banner (cambia cada 5 segundos)
  function autoPlay() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }
  
  let autoPlayInterval = setInterval(autoPlay, 5000);
  
  // Botón siguiente
  $('.banner-next').click(function() {
    clearInterval(autoPlayInterval);
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    autoPlayInterval = setInterval(autoPlay, 5000);
  });
  
  // Botón anterior
  $('.banner-prev').click(function() {
    clearInterval(autoPlayInterval);
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
    autoPlayInterval = setInterval(autoPlay, 5000);
  });
  
  // Dots navegación
  $('.dot').click(function() {
    clearInterval(autoPlayInterval);
    currentSlide = $(this).data('slide');
    showSlide(currentSlide);
    autoPlayInterval = setInterval(autoPlay, 5000);
  });

  // Pausar auto-play al hacer hover
  $('.banner-slider').hover(
    function() {
      clearInterval(autoPlayInterval);
    },
    function() {
      autoPlayInterval = setInterval(autoPlay, 5000);
    }
  );

  
  // ============================================
  // CONTADOR ANIMADO DE ESTADÍSTICAS
  // ============================================
  let counterAnimated = false;
  
  function animateCounters() {
    if (counterAnimated) return;
    
    $('.stat-card .counter').each(function() {
      const $this = $(this);
      const target = parseInt($this.closest('.stat-card').data('target'));
      
      $({ counter: 0 }).animate({ counter: target }, {
        duration: 2500,
        easing: 'swing',
        step: function() {
          $this.text(Math.ceil(this.counter) + '%');
        },
        complete: function() {
          $this.text(target + '%');
        }
      });
    });
    
    // Animar números de aliados
    $('.stat-number').each(function() {
      const $this = $(this);
      const target = parseInt($this.data('target'));
      
      $({ counter: 0 }).animate({ counter: target }, {
        duration: 2500,
        easing: 'swing',
        step: function() {
          if (target > 1000) {
            $this.text(Math.ceil(this.counter).toLocaleString());
          } else {
            $this.text(Math.ceil(this.counter));
          }
        },
        complete: function() {
          if (target > 1000) {
            $this.text(target.toLocaleString());
          } else {
            $this.text(target);
          }
        }
      });
    });
    
    counterAnimated = true;
  }
  
  
  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  function checkScrollReveal() {
    $('.scroll-reveal').each(function() {
      const elementTop = $(this).offset().top;
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      
      if (scrollTop + windowHeight > elementTop + 100) {
        $(this).addClass('revealed');
      }
    });
  }

  // Ejecutar al cargar y al hacer scroll
  checkScrollReveal();
  
  $(window).scroll(function() {
    checkScrollReveal();
    
    // Activar contador cuando sea visible
    const statsOffset = $('.stats').offset();
    if (statsOffset) {
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      
      if (scrollTop + windowHeight > statsOffset.top + 100) {
        animateCounters();
      }
    }
  });

  
  // ============================================
  // HOVER EFFECT EN CARDS DE VEHÍCULOS
  // ============================================
  $('.vehicle-card').hover(
    function() {
      $(this).stop().css({
        'transform': 'translateY(-12px) scale(1.02)'
      });
    },
    function() {
      $(this).stop().css({
        'transform': 'translateY(0) scale(1)'
      });
    }
  );

  
  // ============================================
  // TOGGLE INFO DE VEHÍCULOS (SLIDEDOWN/UP)
  // ============================================
  $('.btn-info').click(function(e) {
    e.preventDefault();
    const info = $(this).siblings('.vehicle-info');
    
    if (info.is(':visible')) {
      info.slideUp(400);
      $(this).text('Ver más').removeClass('active');
    } else {
      // Cerrar otros abiertos
      $('.vehicle-info').slideUp(400);
      $('.btn-info').text('Ver más').removeClass('active');
      
      // Abrir el actual
      info.slideDown(400);
      $(this).text('Ver menos').addClass('active');
    }
  });

  
  // ============================================
  // ACORDEÓN EN INFORMACIÓN ECOLÓGICA
  // ============================================
  $('.eco-accordion-header').click(function() {
    const item = $(this).closest('.eco-accordion-item');
    const content = item.find('.eco-accordion-content');
    const icon = item.find('.eco-accordion-icon');
    
    if (content.is(':visible')) {
      // Cerrar
      content.slideUp(500);
      icon.text('+').css('transform', 'rotate(0deg)');
      item.removeClass('active');
    } else {
      // Cerrar todos los demás
      $('.eco-accordion-content').slideUp(500);
      $('.eco-accordion-icon').text('+').css('transform', 'rotate(0deg)');
      $('.eco-accordion-item').removeClass('active');
      
      // Abrir el actual con animación
      content.slideDown(500);
      icon.text('−').css('transform', 'rotate(180deg)');
      item.addClass('active');
      
      // Scroll suave hacia el elemento
      $('html, body').animate({
        scrollTop: item.offset().top - 100
      }, 600);
    }
  });

  
  // ============================================
  // SMOOTH SCROLL PARA NAVEGACIÓN
  // ============================================
  $('a[href^="#"]').on('click', function(e) {
    const target = $(this.getAttribute('href'));
    
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 80
      }, 1000, 'swing');
    }
  });

  
  // ============================================
  // BOTÓN SCROLL TO TOP
  // ============================================
  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $('#scrollTop').fadeIn(500).css('display', 'flex');
    } else {
      $('#scrollTop').fadeOut(500);
    }
  });
  
  $('#scrollTop').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000, 'swing');
    return false;
  });

  
  // ============================================
  // ANIMACIÓN FADE-IN AL HACER SCROLL (Vehículos)
  // ============================================
  function checkFadeIn() {
    $('.vehicle-card, .benefit-card, .stat-card').each(function(index) {
      const elementTop = $(this).offset().top;
      const scrollTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      
      if (scrollTop + windowHeight > elementTop + 80) {
        const $this = $(this);
        setTimeout(function() {
          $this.addClass('fade-in-visible');
        }, index * 100);
      }
    });
  }
  
  checkFadeIn();
  $(window).scroll(checkFadeIn);

  
  // ============================================
  // HIGHLIGHT AL HACER CLICK EN BENEFICIOS
  // ============================================
  $('.benefit-card').click(function() {
    // Remover highlight de otros
    $('.benefit-card').removeClass('highlight');
    
    // Agregar highlight al actual
    $(this).addClass('highlight');
    
    // Pequeño efecto de bounce
    $(this).css('animation', 'none');
    setTimeout(() => {
      $(this).css('animation', '');
    }, 10);
  });

  
  // ============================================
  // HEADER STICKY CON EFECTO
  // ============================================
  let lastScroll = 0;
  
  $(window).scroll(function() {
    const currentScroll = $(this).scrollTop();
    
    if (currentScroll > 100) {
      $('.header').addClass('scrolled');
      
      // Ocultar header al bajar, mostrar al subir (solo desktop)
      if ($(window).width() > 968) {
        if (currentScroll > lastScroll && currentScroll > 200) {
          $('.header').css('transform', 'translateY(-100%)');
        } else {
          $('.header').css('transform', 'translateY(0)');
        }
      }
    } else {
      $('.header').removeClass('scrolled');
      $('.header').css('transform', 'translateY(0)');
    }
    
    lastScroll = currentScroll;
  });

  
  // ============================================
  // PARALLAX EFFECT EN HERO
  // ============================================
  $(window).scroll(function() {
    const scrolled = $(window).scrollTop();
    $('.hero::before').css('transform', 'translate(' + (scrolled * 0.1) + 'px, ' + (scrolled * 0.1) + 'px)');
  });

  
  // ============================================
  // SISTEMA DE NOTIFICACIONES
  // ============================================
  window.showNotification = function(message, type = 'success') {
    const $notification = $('#notification');
    const icons = {
      success: '<i class="fas fa-check-circle"></i>',
      error: '<i class="fas fa-times-circle"></i>',
      info: '<i class="fas fa-info-circle"></i>'
    };
    
    $notification
      .html(icons[type] + ' ' + message)
      .removeClass('success error info')
      .addClass(type + ' show');
    
    setTimeout(function() {
      $notification.removeClass('show');
    }, 4000);
  };

  
  // ============================================
  // ANIMACIÓN DE ENTRADA ESCALONADA
  // ============================================
  $('.vehicles-grid .vehicle-card, .benefits-grid .benefit-card').each(function(index) {
    $(this).css({
      'animation-delay': (index * 0.1) + 's'
    });
  });

  
  // ============================================
  // LAZY LOADING DE IMÁGENES
  // ============================================
  $('img').each(function() {
    const $img = $(this);
    const src = $img.attr('src');
    
    if (src && !$img.hasClass('loaded')) {
      $img.on('load', function() {
        $img.addClass('loaded').css({
          'opacity': '0',
          'animation': 'fadeIn 0.6s ease forwards'
        });
      });
    }
  });

  
  // ============================================
  // MEJORAR UX EN FORMULARIOS
  // ============================================
  $('input, textarea, select').on('focus', function() {
    $(this).parent().addClass('focused');
  }).on('blur', function() {
    if ($(this).val() === '') {
      $(this).parent().removeClass('focused');
    }
  });

  
  // ============================================
  // TOOLTIP SIMPLE
  // ============================================
  $('[data-tooltip]').hover(
    function() {
      const tooltipText = $(this).data('tooltip');
      const $tooltip = $('<div class="custom-tooltip">' + tooltipText + '</div>');
      $('body').append($tooltip);
      
      const offset = $(this).offset();
      $tooltip.css({
        top: offset.top - $tooltip.outerHeight() - 10,
        left: offset.left + ($(this).outerWidth() / 2) - ($tooltip.outerWidth() / 2)
      }).fadeIn(300);
    },
    function() {
      $('.custom-tooltip').fadeOut(300, function() {
        $(this).remove();
      });
    }
  );

  
  // ============================================
  // DETECCIÓN DE DISPOSITIVO MÓVIL
  // ============================================
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    $('body').addClass('mobile-device');
    // Deshabilitar algunos efectos hover en móvil
    $('.vehicle-card, .benefit-card').off('mouseenter mouseleave');
  }

  
  // ============================================
  // PREVENIR COMPORTAMIENTO POR DEFECTO EN DEMOS
  // ============================================
  $('a[href="#"]').click(function(e) {
    e.preventDefault();
  });

  
  // ============================================
  // ANIMACIÓN DE NÚMEROS EN SCROLL
  // ============================================
  $.fn.countTo = function(options) {
    return this.each(function() {
      const $this = $(this);
      const settings = $.extend({
        from: 0,
        to: 100,
        speed: 1000,
        decimals: 0
      }, options);
      
      $({ count: settings.from }).animate({ count: settings.to }, {
        duration: settings.speed,
        easing: 'swing',
        step: function() {
          $this.text(Math.floor(this.count));
        },
        complete: function() {
          $this.text(settings.to);
        }
      });
    });
  };

  
  // ============================================
  // EFECTO RIPPLE EN BOTONES
  // ============================================
  $('.btn').on('click', function(e) {
    const $button = $(this);
    const $ripple = $('<span class="ripple"></span>');
    
    $button.append($ripple);
    
    const x = e.pageX - $button.offset().left;
    const y = e.pageY - $button.offset().top;
    
    $ripple.css({
      left: x,
      top: y
    }).addClass('ripple-effect');
    
    setTimeout(function() {
      $ripple.remove();
    }, 600);
  });

  
  // ============================================
  // PROTECCIÓN CONTRA SPAM EN FORMULARIOS
  // ============================================
  let lastSubmitTime = 0;
  
  $('form').on('submit', function(e) {
    const currentTime = Date.now();
    if (currentTime - lastSubmitTime < 3000) {
      e.preventDefault();
      showNotification('Por favor espera unos segundos antes de enviar nuevamente', 'info');
      return false;
    }
    lastSubmitTime = currentTime;
  });

  
  // ============================================
  // LOGS DE DESARROLLO (remover en producción)
  // ============================================
  console.log('%c🌿 EcoDelivery - Sistema Cargado Correctamente', 'color: #2e7d32; font-size: 16px; font-weight: bold;');
  console.log('%cVersión: 2.0 | Desarrollado con 💚', 'color: #4caf50; font-size: 12px;');

});


// ============================================
// FUNCIONES GLOBALES
// ============================================

// Función para formatear números
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Función para validar email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Función para obtener parámetros URL
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Función para scroll suave a elemento
function scrollToElement(element, offset = 80) {
  $('html, body').animate({
    scrollTop: $(element).offset().top - offset
  }, 1000);
}
