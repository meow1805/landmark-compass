import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix default marker icons for Vite bundling
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

type MapViewProps = {
  height?: number;
  /** Center [lat, lng]. Defaults to Intramuros. */
  center?: [number, number];
  zoom?: number;
  /** Title shown in marker popup (e.g. landmark name). */
  popupTitle?: string;
  popupSubtitle?: string;
};

export const MapView = ({
  height = 420,
  center = [14.5895, 120.9739],
  zoom = 16,
  popupTitle = 'Intramuros',
  popupSubtitle = 'Historic Walled City',
}: MapViewProps) => {
  return (
    <div className="w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height, width: '100%', borderRadius: 12, overflow: 'hidden' }}
        attributionControl
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={center}>
          <Popup>
            <div className="text-sm">
              <div className="font-medium">{popupTitle}</div>
              <div className="text-muted-foreground">{popupSubtitle}</div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
