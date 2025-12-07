// ============================================
// PÁGINA ALIADOS - INTERACTIVIDAD
// ============================================

$(document).ready(function() {
  
  const aliadoForm = $('#aliadoForm');
  
  if (aliadoForm.length) {
    
    // ============================================
    // VALIDACIONES EN TIEMPO REAL
    // ============================================
    
    $('#aliado-negocio').on('input', function() {
      const value = $(this).val().trim();
      const errorElement = $(this).siblings('.form-error');
      
      if (value.length < 2) {
        errorElement.text('El nombre debe tener al menos 2 caracteres');
        $(this).css('border-color', '#f44336');
      } else {
        errorElement.text('');
        $(this).css('border-color', '#4caf50');
      }
    });
    
    $('#aliado-nombre').on('input', function() {
      const value = $(this).val().trim();
      const regex = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
      const errorElement = $(this).siblings('.form-error');
      
      if (!regex.test(value) || value.length < 2) {
        errorElement.text('Ingresa un nombre válido');
        $(this).css('border-color', '#f44336');
      } else {
        errorElement.text('');
        $(this).css('border-color', '#4caf50');
      }
    });
    
    $('#aliado-email').on('input', function() {
      const value = $(this).val().trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errorElement = $(this).siblings('.form-error');
      
      if (!regex.test(value)) {
        errorElement.text('Ingresa un email válido');
        $(this).css('border-color', '#f44336');
      } else {
        errorElement.text('');
        $(this).css('border-color', '#4caf50');
      }
    });
    
    $('#aliado-telefono').on('input', function() {
      const value = $(this).val().trim();
      const regex = /^[0-9+\-\s()]{7,20}$/;
      const errorElement = $(this).siblings('.form-error');
      
      if (!regex.test(value)) {
        errorElement.text('Ingresa un teléfono válido');
        $(this).css('border-color', '#f44336');
      } else {
        errorElement.text('');
        $(this).css('border-color', '#4caf50');
      }
    });
    
    $('#aliado-categoria').on('change', function() {
      const errorElement = $(this).siblings('.form-error');
      
      if ($(this).val() === '') {
        errorElement.text('Por favor selecciona una categoría');
        $(this).css('border-color', '#f44336');
      } else {
        errorElement.text('');
        $(this).css('border-color', '#4caf50');
      }
    });
    
    $('#aliado-direccion').on('input', function() {
      const value = $(this).val().trim();
      const errorElement = $(this).siblings('.form-error');
      
      if (value.length < 5) {
        errorElement.text('Ingresa una dirección válida');
        $(this).css('border-color', '#f44336');
      } else {
        errorElement.text('');
        $(this).css('border-color', '#4caf50');
      }
    });
    
    $('#aliado-mensaje').on('input', function() {
      const value = $(this).val().trim();
      const errorElement = $(this).siblings('.form-error');
      
      if (value.length < 10) {
        errorElement.text('El mensaje debe tener al menos 10 caracteres');
        $(this).css('border-color', '#f44336');
      } else {
        errorElement.text('');
        $(this).css('border-color', '#4caf50');
      }
    });
    
    
    // ============================================
    // ENVÍO DEL FORMULARIO
    // ============================================
    aliadoForm.on('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const formData = {};
      
      aliadoForm.find('input, select, textarea').each(function() {
        const $field = $(this);
        const value = $field.val().trim();
        const name = $field.attr('name');
        
        if (value === '') {
          isValid = false;
          $field.siblings('.form-error').text('Este campo es obligatorio');
          $field.css('border-color', '#f44336');
        } else {
          formData[name] = value;
        }
      });
      
      if (!isValid) {
        showNotification('Por favor completa todos los campos correctamente', 'error');
        return;
      }
      
      const submitBtn = aliadoForm.find('.submit-btn');
      submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Enviando...');
      
      setTimeout(function() {
        console.log('Datos del aliado:', formData);
        
        aliadoForm[0].reset();
        aliadoForm.find('input, select, textarea').css('border-color', '#c8e6c9');
        aliadoForm.find('.form-error').text('');
        
        submitBtn.prop('disabled', false).html('<i class="fas fa-paper-plane"></i> Enviar Solicitud');
        
        showNotification('¡Solicitud enviada! Bienvenido a la familia Eco Aliados 🌿', 'success');
        
        $('html, body').animate({
          scrollTop: 0
        }, 1000);
        
      }, 2000);
    });
    
  }
  
  
  // ============================================
  // LIGHTBOX PARA IMÁGENES DE ALIADOS
  // ============================================
  $(document).on('click', '.aliado-image img', function() {
    const imgSrc = $(this).attr('src');
    const aliadoName = $(this).attr('alt');
    
    $('#lightboxImg').attr('src', imgSrc);
    $('.lightbox-caption').text(aliadoName);
    $('#lightbox').addClass('active');
  });
  
  $('.lightbox-close, .lightbox').click(function(e) {
    if (e.target === this) {
      $('#lightbox').removeClass('active');
    }
  });
  
  // Cerrar con tecla ESC
  $(document).keyup(function(e) {
    if (e.key === "Escape") {
      $('#lightbox').removeClass('active');
    }
  });
  
  
  // ============================================
  // HOVER EFFECT EN CARDS DE ALIADOS
  // ============================================
  $('.aliado-card').hover(
    function() {
      $(this).find('.aliado-image img').css('transform', 'scale(1.15)');
    },
    function() {
      $(this).find('.aliado-image img').css('transform', 'scale(1)');
    }
  );
  
});
