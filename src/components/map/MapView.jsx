import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

/* دالة لإنشاء أيقونة ملونة ديناميكياً */
function createPinIcon(color) {
  return L.divIcon({
    className: '',
    html: `<svg width="34" height="44" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 0C7.6 0 0 7.6 0 17c0 12.7 17 27 17 27s17-14.3 17-27C34 7.6 26.4 0 17 0z" fill="${color}" stroke="#ffffff" stroke-width="2"/>
      <circle cx="17" cy="17" r="6" fill="#ffffff" opacity="0.9"/>
    </svg>`,
    iconSize: [34, 44],
    iconAnchor: [17, 42],
    popupAnchor: [0, -38],
  });
}

function AutoFit({ markers }) {
  const map = useMap();
  useEffect(() => {
    const points = markers.filter((m) => m.lat && m.lng);
    if (points.length) {
      const bounds = L.latLngBounds(points.map((m) => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [markers, map]);
  return null;
}

export default function MapView({
  markers = [],
  center = [35.26389, 36.70667],
  zoom = 13,
  height = 460,
  fitBounds = false,
  className,
  scrollWheelZoom = false,
}) {
  return (
    <div className={cn('overflow-hidden rounded-xl2 shadow-soft', className)} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fitBounds && <AutoFit markers={markers} />}
        {markers.map((m) => (
          <Marker
            key={m.id}
            position={[m.lat, m.lng]}
            icon={createPinIcon(m.color || '#054239')}
          >
            <Popup maxWidth={260}>
              <div className="text-right">
                {m.image && (
                  <img
                    src={m.image}
                    alt={m.title}
                    className="mb-2 h-28 w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                )}
                <h4 className="mb-1 font-bold text-ink-900">{m.title}</h4>
                {m.subtitle && <p className="mb-2 text-xs text-ink-100">{m.subtitle}</p>}
                {m.href && (
                  <Link
                    to={m.href}
                    className="inline-block rounded-lg bg-brand-800 px-3 py-1.5 text-xs font-semibold text-cream hover:bg-brand-900"
                  >
                    عرض التفاصيل
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
