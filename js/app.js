//navbar current

$(document).ready(function() {
    $(".navbar-nav li a").on('click', function (e) {

        $(".navbar-nav li").find('a').removeClass('active');
        $(this).addClass('active');
        
    });
});

//navbar sticky only in desktop

$(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
        $(".navbar").addClass("navbarScroll");
        $(".navbar").removeClass("bg-dark");
    }
    else {
        $(".navbar").removeClass("navbarScroll");
    }
    if ($(this).scrollTop() < 100) {
        $(".navbar").addClass("navbar-scrolled");
        $(".navbar").removeClass("navbarScroll");
    }
});

// Calculadora
$(function () {
    $('#slider-range').slider({
      min: 0,
      max: window.sliderValues.length - 1,
      value: 0,
      slide: onSlide,
    });
  
    $('#slider-value').prependTo($('#slider-range > span'));
  
    function onSlide(event, ui) {
      var index = event === undefined ? 0 : ui.value;
      var value = window.sliderValues[index];
  
      var percentageVendedor = value[1] + '%';
      var percentageComprador = value[2] + '%';
      var costVendedor = Math.round(value[0] * (value[1] / 100));
      var costComprador = Math.round(value[0] * (value[2] / 100));
      var costLote = value[0];
      var costoVendedorVsEscritorio = Math.round(0.03 * costLote);
      var costoVendedorVsPantalla = Math.round(0.06 * costLote);
      var costoCompradorVsEscritorio = Math.round(0.03 * costLote);
      var costoCompradorVsPantalla = Math.round(0.07 * costLote);
      var ahorroVendedorVsEscritorio = Math.round((0.03 * costLote) - costVendedor);
      var ahorroVendedorVsPantalla = Math.round((0.06 * costLote) - costVendedor);
      var ahorroCompradorVsEscritorio = Math.round((0.03 * costLote) - costComprador);
      var ahorroCompradorVsPantalla = Math.round((0.07 * costLote) - costComprador);
  
      $('#porcentaje-comision-vendedor').html(percentageVendedor);
      $('#porcentaje-comision-comprador').html(percentageComprador);
      $('#costo-comision-vendedor').html(formattedNumber(costVendedor));
      $('#costo-comision-comprador').html(formattedNumber(costComprador));
      $('#costo-vendedor-vs-escritorio').html(formattedNumber(costoVendedorVsEscritorio));
      $('#costo-vendedor-vs-pantalla').html(formattedNumber(costoVendedorVsPantalla));
      $('#costo-comprador-vs-escritorio').html(formattedNumber(costoCompradorVsEscritorio));
      $('#costo-comprador-vs-pantalla').html(formattedNumber(costoCompradorVsPantalla));
      $('#ahorro-vendedor-vs-escritorio').html(formattedNumber(ahorroVendedorVsEscritorio));
      $('#ahorro-vendedor-vs-pantalla').html(formattedNumber(ahorroVendedorVsPantalla));
      $('#ahorro-comprador-vs-escritorio').html(formattedNumber(ahorroCompradorVsEscritorio));
      $('#ahorro-comprador-vs-pantalla').html(formattedNumber(ahorroCompradorVsPantalla));
      $('#slider-value').html(formattedNumber(costLote) + ' USD');
    };
  
    onSlide();
  });
  
  function formattedNumber(number) {
    if (number < 1000) return number + '';
  
    var thousands = parseInt(number / 1000);
    var hundreds = parseInt(number % 1000);
  
    return thousands + '.' + (hundreds + 1000 + '').substring(1);
  };
  
  window.sliderValues = [
   [5000, 1.98, 0],
   [10000, 1.93, 0],
   [15000, 1.85, 1],
   [20000, 1.75, 1],
   [25000, 1.64, 1],
   [30000, 1.53, 1],
   [35000, 1.43, 1],
   [40000, 1.33, 1],
   [45000, 1.25, 1],
   [50000, 1.17, 1],
   [55000, 1.1, 1],
   [60000, 1.04, 1],
   [65000, 0.98, 1],
   [70000, 0.93, 1],
   [75000, 0.89, 1],
   [80000, 0.85, 1],
   [85000, 0.82, 1],
   [90000, 0.79, 1],
   [95000, 0.76, 1],
   [100000, 0.73, 1],
   [105000, 0.7, 1],
   [110000, 0.68, 1],
   [115000, 0.66, 1],
   [120000, 0.64, 1],
   [125000, 0.62, 1],
   [130000, 0.6, 1],
   [135000, 0.59, 1],
   [140000, 0.57, 1],
   [145000, 0.56, 1],
   [150000, 0.55, 1],
   [155000, 0.55, 1],
   [160000, 0.54, 1],
   [165000, 0.53, 1],
   [170000, 0.53, 1],
   [175000, 0.52, 1],
   [180000, 0.52, 1],
   [185000, 0.51, 1],
   [190000, 0.51, 1],
   [195000, 0.5, 1],
   [200000, 0.5, 1],
  ];
  
  // Navbar scroll
  var didScroll = false;
  function scrollPage() {
    var changeHeaderOn = 200;
    var $header = $('.navbar');
    var sy = window.pageYOffset || document.documentElement.scrollTop;
    if (sy >= changeHeaderOn) {
      $header.addClass('scrolled');
    } else {
      $header.removeClass('scrolled');
    }
  
    didScroll = false;
  }

    // Modal para mensajes
    function mensaje(msj) {
        $msjModal = $('#msjModal');
        $msjModal.find('.modal-body').html(msj);
        $msjModal.modal('show');
    }
  
  // Registration form
  function registrar(e) {
    e.preventDefault();
  
    const $submit = $('send-message');
    const $loading = $('form .loading-gif');
  
    if (validarFormulario()) {
      $submit.attr('disabled', '');
      $loading.css('opacity', 1);
      const data = $('form').serializeArray();
      $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/users/solicitud',
        data: data,
        success: function (res) {
          if (res.success) {
            borrarFormulario();
            $('#regModal').modal('hide');
          }
  
          mensaje(res.msg);
        },
  
        error: function (error) {
          console.error(error);
        },
      }).done(function () {
        $submit.removeAttr('disabled');
        $loading.css('opacity', 0);
      });
    } else {
      mensaje('Complete todos los datos');
    }
  };
  
  // Expresión regular para chequear los emails
  const regex = new RegExp([
    '^(([^<>()\\[\\]\\.,;:\\s@\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)',
    '|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$',
  ].join(''));
  
  function validarFormulario() {
    const $form = $('form');
    var error = false;
    var checkboxes = true;
    $form.find('input').parent().removeClass('has-error');
    $form.find('.checkbox').removeClass('has-error');
  
    $form.find('input').each(function (i, input) {
      if ($(input).val() === '') {
        $(input).parent().addClass('has-error');
        error = true;
      }
    });
  
    error = error || (!regex.test($form.find('input[type="email"]').val()));
  
    $form.find('input:checkbox').each(function (i, checkbox) {
      checkboxes = checkboxes && !$(checkbox).is(':checked');
    });
  
    if (checkboxes) $form.find('.checkbox').addClass('has-error');
  
    return (!error && !checkboxes);
  }
  
  // Limpiar los datos del formulario
  function borrarFormulario() {
    $('form').find('input:text, input[type="email"]').val('');
    $('form').find('input:checkbox').removeAttr('checked');
  }
  
  $(window).on('load', function () {
    $('form').on('submit', function (event) { 
        registrar(event); 
    });
  
    $('.navbar-nav li a').on('click', function (event) {
      $('.navbar-collapse').collapse('hide');
    });
  
    navbarScroll();
  });

  // Smooth scroll links navbar
function navbarScroll() {
    $('.menu-item').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('#menu').collapse('hide');
        var target = $(this.hash).offset().top - 50;
        $('html, body').stop().animate({ scrollTop: target }, 1000);
      });
    });
  }
  
  
  $(window).on('scroll', function (event) {
    if (!didScroll) {
      didScroll = true;
      setTimeout(scrollPage, 0);
    }
  });