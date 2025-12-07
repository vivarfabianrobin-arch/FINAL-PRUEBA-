// ============================================
// DATA LOADER - CARGA DINÁMICA DE JSON (CORREGIDO)
// ============================================

$(document).ready(function() {
  
  // ============================================
  // CARGAR VEHÍCULOS DESDE JSON
  // ============================================
  function loadVehicles() {
    if (!$('#vehiclesGrid').length) return;
    
    $.ajax({
      url: 'vehicles.json',
      dataType: 'json',
      success: function(data) {
        const vehiclesGrid = $('#vehiclesGrid');
        vehiclesGrid.empty();
        
        data.vehicles.forEach(function(vehicle, index) {
          const vehicleCard = `
            <div class="vehicle-card scroll-reveal" style="animation-delay: ${index * 0.1}s">
              <div class="vehicle-image">
                <img src="${vehicle.image}" alt="${vehicle.name}" onerror="this.src='https://via.placeholder.com/200x180?text=${vehicle.name}'">
              </div>
              <h4>${vehicle.name}</h4>
              <p class="vehicle-description">${vehicle.description}</p>
              <button class="btn-info">Ver más</button>
              <div class="vehicle-info">
                <p><strong>Características:</strong> ${vehicle.features}</p>
                <p><strong>Autonomía:</strong> ${vehicle.range}</p>
                <p><strong>Capacidad:</strong> ${vehicle.capacity}</p>
              </div>
            </div>
          `;
          vehiclesGrid.append(vehicleCard);
        });
        
        initVehicleEvents();
      },
      error: function() {
        console.log('Usando contenido de vehículos estático (vehicles.json no encontrado)');
      }
    });
  }
  
  // Inicializar eventos de vehículos
  function initVehicleEvents() {
    $('.btn-info').off('click').on('click', function(e) {
      e.preventDefault();
      const info = $(this).siblings('.vehicle-info');
      
      if (info.is(':visible')) {
        info.slideUp(400);
        $(this).text('Ver más').removeClass('active');
      } else {
        $('.vehicle-info').slideUp(400);
        $('.btn-info').text('Ver más').removeClass('active');
        info.slideDown(400);
        $(this).text('Ver menos').addClass('active');
      }
    });
  }
  
  
  // ============================================
  // CARGAR ALIADOS DESDE JSON (CORREGIDO)
  // ============================================
  let aliadosData = [];
  
  function loadAliados() {
    // Solo intentar cargar si existe el contenedor
    if (!$('#aliadosGrid').length) return;
    
    $.ajax({
      url: 'aliados.json',
      dataType: 'json',
      timeout: 5000, // 5 segundos de timeout
      success: function(data) {
        aliadosData = data.aliados;
        renderAliados('todos');
      },
      error: function(xhr, status, error) {
        console.log('Error al cargar aliados.json:', status);
        // Cargar aliados de respaldo (hardcoded)
        loadFallbackAliados();
      }
    });
  }
  
  // Aliados de respaldo si falla la carga del JSON
  function loadFallbackAliados() {
    aliadosData = [
      {
        id: 1,
        name: "Verde Vida Restaurant",
        description: "Restaurante vegano comprometido con la sostenibilidad. Ingredientes orgánicos y locales.",
        category: "restaurantes",
        image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=220&fit=crop",
        tags: ["Vegano", "Orgánico", "Local"]
      },
      {
        id: 2,
        name: "Café Eco Aroma",
        description: "Café de comercio justo con prácticas sostenibles.",
        category: "restaurantes",
        image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=220&fit=crop",
        tags: ["Comercio Justo", "Café Especial"]
      },
      {
        id: 3,
        name: "Eco Store Colombia",
        description: "Tienda de productos ecológicos para el hogar.",
        category: "tiendas",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=220&fit=crop",
        tags: ["Productos Verdes", "Hogar"]
      },
      {
        id: 4,
        name: "Farmacia Natural Plus",
        description: "Productos naturales y medicamentos con prácticas responsables.",
        category: "farmacias",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=220&fit=crop",
        tags: ["Natural", "Salud"]
      },
      {
        id: 5,
        name: "Tech Green Solutions",
        description: "Empresa de tecnología que desarrolla soluciones innovadoras.",
        category: "tecnologia",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=220&fit=crop",
        tags: ["Innovación", "Tech"]
      },
      {
        id: 6,
        name: "Tienda Cero Residuos",
        description: "Especialistas en productos libres de plástico.",
        category: "tiendas",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=220&fit=crop",
        tags: ["Cero Residuos", "Sin Plástico"]
      }
    ];
    
    renderAliados('todos');
  }
  
  function renderAliados(category) {
    const aliadosGrid = $('#aliadosGrid');
    
    if (!aliadosGrid.length) return;
    
    aliadosGrid.empty();
    
    const filteredAliados = category === 'todos' 
      ? aliadosData 
      : aliadosData.filter(a => a.category === category);
    
    if (filteredAliados.length === 0) {
      aliadosGrid.html('<p style="grid-column: 1/-1; text-align: center; color: #666; font-size: 1.2rem; padding: 40px;">No hay aliados en esta categoría</p>');
      return;
    }
    
    filteredAliados.forEach(function(aliado, index) {
      const aliadoCard = `
        <div class="aliado-card scroll-reveal" data-category="${aliado.category}" style="animation-delay: ${index * 0.1}s">
          <div class="aliado-image">
            <img src="${aliado.image}" alt="${aliado.name}" onerror="this.src='https://via.placeholder.com/400x220?text=${aliado.name}'">
            <span class="aliado-category">${getCategoryName(aliado.category)}</span>
          </div>
          <div class="aliado-content">
            <h3>${aliado.name}</h3>
            <p>${aliado.description}</p>
            <div class="aliado-tags">
              ${aliado.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
      aliadosGrid.append(aliadoCard);
    });
    
    // Re-inicializar scroll reveal
    setTimeout(function() {
      $('.scroll-reveal').each(function() {
        const elementTop = $(this).offset().top;
        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();
        
        if (scrollTop + windowHeight > elementTop + 100) {
          $(this).addClass('revealed');
        }
      });
    }, 100);
  }
  
  function getCategoryName(category) {
    const names = {
      'restaurantes': 'Restaurante',
      'tiendas': 'Tienda',
      'farmacias': 'Farmacia',
      'tecnologia': 'Tecnología'
    };
    return names[category] || category;
  }
  
  // Event listener para filtros
  $('.filter-btn').on('click', function() {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    const category = $(this).data('category');
    renderAliados(category);
  });
  
  
  // ============================================
  // INICIALIZAR CARGA DE DATOS
  // ============================================
  loadVehicles();
  loadAliados();
  
});
