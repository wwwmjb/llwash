// Íconos incrustados directamente acá: así la web funciona sin depender
// de ninguna carpeta de imágenes externa, sin importar cómo la subas.
// Si más adelante querés poner una FOTO real de un servicio, no toques esto:
// simplemente agregá "imagen": "images/tu-foto.jpg" en precios.json y esa
// foto se va a usar en lugar del ícono.
const ICONS = {
  exterior: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="100" fill="#F7FAFC"/>
    <g fill="none" stroke="#0B1F33" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M45 128 L52 100 Q58 88 72 88 L128 88 Q142 88 148 100 L155 128" fill="#2EC4B6" stroke="#0B1F33"/>
      <rect x="40" y="118" width="120" height="24" rx="8" fill="#F7FAFC" stroke="#0B1F33"/>
      <circle cx="68" cy="142" r="12" fill="#0B1F33"/>
      <circle cx="132" cy="142" r="12" fill="#0B1F33"/>
      <path d="M75 95 L82 78 Q86 72 94 72 L106 72 Q114 72 118 78 L125 95" fill="#F7FAFC" stroke="#0B1F33"/>
    </g>
    <g fill="#2EC4B6"><circle cx="150" cy="55" r="5"/><circle cx="165" cy="70" r="3.5"/><circle cx="138" cy="68" r="3"/></g>
  </svg>`,
  completo: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="100" fill="#F7FAFC"/>
    <g fill="none" stroke="#0B1F33" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M45 128 L52 100 Q58 88 72 88 L128 88 Q142 88 148 100 L155 128" fill="#FF9F1C" stroke="#0B1F33"/>
      <rect x="40" y="118" width="120" height="24" rx="8" fill="#F7FAFC" stroke="#0B1F33"/>
      <circle cx="68" cy="142" r="12" fill="#0B1F33"/>
      <circle cx="132" cy="142" r="12" fill="#0B1F33"/>
      <path d="M75 95 L82 78 Q86 72 94 72 L106 72 Q114 72 118 78 L125 95" fill="#F7FAFC" stroke="#0B1F33"/>
    </g>
    <g stroke="#2EC4B6" stroke-width="5" stroke-linecap="round" fill="none">
      <path d="M35 45 L45 55"/><path d="M45 45 L35 55"/>
      <path d="M155 40 L165 50"/><path d="M165 40 L155 50"/>
      <path d="M100 30 L108 40"/><path d="M108 30 L100 40"/>
    </g>
  </svg>`,
  premium: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="100" fill="#0B1F33"/>
    <g fill="none" stroke="#F7FAFC" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M45 128 L52 100 Q58 88 72 88 L128 88 Q142 88 148 100 L155 128" fill="#0B1F33" stroke="#F7FAFC"/>
      <rect x="40" y="118" width="120" height="24" rx="8" fill="#0B1F33" stroke="#F7FAFC"/>
      <circle cx="68" cy="142" r="12" fill="#F7FAFC"/>
      <circle cx="132" cy="142" r="12" fill="#F7FAFC"/>
      <path d="M75 95 L82 78 Q86 72 94 72 L106 72 Q114 72 118 78 L125 95" fill="#0B1F33" stroke="#F7FAFC"/>
    </g>
    <path d="M100 45 L106 60 L122 62 L110 72 L113 88 L100 79 L87 88 L90 72 L78 62 L94 60 Z" fill="#FF9F1C"/>
  </svg>`,
  interior: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="100" fill="#F7FAFC"/>
    <g fill="none" stroke="#0B1F33" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M60 120 L64 90 Q66 80 78 80 L122 80 Q134 80 136 90 L140 120" fill="#2EC4B6" stroke="#0B1F33"/>
      <path d="M60 120 H140 V132 Q140 138 134 138 H66 Q60 138 60 132 Z" fill="#F7FAFC" stroke="#0B1F33"/>
      <path d="M75 88 L80 95 M100 88 L100 96 M125 88 L120 95" stroke="#F7FAFC" stroke-width="4"/>
    </g>
    <g fill="#FF9F1C"><circle cx="60" cy="60" r="4"/><circle cx="72" cy="50" r="3"/><circle cx="140" cy="58" r="4"/><circle cx="150" cy="46" r="3"/></g>
  </svg>`
};

// Ícono genérico por si agregás un servicio nuevo sin foto propia
const ICON_DEFAULT = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" fill="#F7FAFC"/>
  <circle cx="100" cy="100" r="40" fill="none" stroke="#2EC4B6" stroke-width="6"/>
</svg>`;

function esFotoReal(ruta) {
  return /\.(jpe?g|png|webp|gif)$/i.test(ruta || '');
}

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

    // Si en precios.json pusiste una FOTO real (.jpg/.png/.webp), se usa esa.
    // Si no, se usa el ícono incrustado que corresponde al id del servicio.
    const visual = esFotoReal(servicio.imagen)
      ? `<img src="${servicio.imagen}" alt="${servicio.nombre}" loading="lazy">`
      : (ICONS[servicio.id] || ICON_DEFAULT);

    card.innerHTML = `
      <span class="icon">${visual}</span>
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
