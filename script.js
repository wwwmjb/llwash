async function init() {
  const grid = document.getElementById('servicios-grid');

  let data;
  try {
    const res = await fetch('precios.json', { cache: 'no-store' });
    data = await res.json();
  } catch (err) {
    grid.innerHTML = '<p style="text-align:center;color:#7C8998;">No se pudieron cargar los precios. Recargá la página.</p>';
    return;
  }

  // --- Encabezado con datos del negocio ---
  document.getElementById('nombre-negocio').textContent = data.negocio?.nombre || 'Lavadero';
  document.getElementById('direccion').textContent = data.negocio?.direccion || '';
  document.getElementById('horario').textContent = data.negocio?.horario || '';

  const actualizado = document.getElementById('footer-actualizado');
  if (data.actualizado) {
    actualizado.textContent = `Precios actualizados el ${data.actualizado}`;
  }

  const moneda = data.moneda || '$';
  const linkPorDefecto = data.reserva_url_default || '#';

  // --- Tarjetas de servicios ---
  grid.innerHTML = '';
  (data.servicios || []).forEach(servicio => {
    const url = servicio.reserva_url || linkPorDefecto;

    const card = document.createElement('a');
    card.className = 'card';
    card.href = url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('aria-label', `Reservar turno para ${servicio.nombre}`);

    const precioFormateado = Number(servicio.precio).toLocaleString('es-AR');

    card.innerHTML = `
      <img src="${servicio.imagen}" alt="${servicio.nombre}" loading="lazy">
      <h2>${servicio.nombre}</h2>
      <p class="desc">${servicio.descripcion || ''}</p>
      <div class="price-row">
        <span class="price">${moneda}${precioFormateado}</span>
        <span class="duration">${servicio.duracion || ''}</span>
      </div>
      <span class="cta">Reservar turno</span>
    `;

    grid.appendChild(card);
  });
}

init();
