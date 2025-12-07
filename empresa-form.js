// ============================================
// FORMULARIO EMPRESARIAL - VALIDACIÓN Y ENVÍO
// ============================================

$(document).ready(function() {
  
  const empresaForm = $('#empresaForm');
  
  if (empresaForm.length) {
    
    // ============================================
    // VALIDACIONES EN TIEMPO REAL
    // ============================================
    
    // Validar nombre de empresa
    $('#empresa-nombre').on('input', function() {
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
    
    // Validar nombre de contacto
    $('#empresa-contacto').on('input', function() {
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
    
    // Validar email
    $('#empresa-email').on('input', function() {
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
    
    // Validar teléfono
    $('#empresa-telefono').on('input', function() {
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
    
    // Validar selects
    $('#empresa-sector, #empresa-envios').on('change', function() {
      const errorElement = $(this).siblings('.form-error');
      
      if ($(this).val() === '') {
        errorElement.text('Por favor selecciona una opción');
        $(this).css('border-color', '#f44336');
      } else {
        errorElement.text('');
        $(this).css('border-color', '#4caf50');
      }
    });
    
    // Validar mensaje
    $('#empresa-mensaje').on('input', function() {
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
    empresaForm.on('submit', function(e) {
      e.preventDefault();
      
      // Validar todos los campos
      let isValid = true;
      const formData = {};
      
      // Recopilar y validar datos
      empresaForm.find('input, select, textarea').each(function() {
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
      
      // Simular envío AJAX
      const submitBtn = empresaForm.find('.submit-btn');
      submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Enviando...');
      
      // Simulación de envío (en producción aquí iría la petición AJAX real)
      setTimeout(function() {
        console.log('Datos del formulario:', formData);
        
        // Resetear formulario
        empresaForm[0].reset();
        empresaForm.find('input, select, textarea').css('border-color', '#c8e6c9');
        empresaForm.find('.form-error').text('');
        
        // Restaurar botón
        submitBtn.prop('disabled', false).html('<i class="fas fa-paper-plane"></i> Enviar Solicitud');
        
        // Mostrar mensaje de éxito
        showNotification('¡Solicitud enviada correctamente! Nos pondremos en contacto contigo pronto.', 'success');
        
        // Scroll al inicio
        $('html, body').animate({
          scrollTop: 0
        }, 1000);
        
      }, 2000);
    });
    
  }
  
  
  // ============================================
  // ANIMACIÓN EN BOTONES DE PRECIO
  // ============================================
  $('.pricing-btn').click(function() {
    const plan = $(this).closest('.pricing-card').find('h3').text();
    showNotification(`¡Excelente elección! El plan ${plan} es perfecto para tu empresa.`, 'success');
    
    // Scroll al formulario
    $('html, body').animate({
      scrollTop: $('#empresaForm').offset().top - 100
    }, 1000);
  });
  
});
