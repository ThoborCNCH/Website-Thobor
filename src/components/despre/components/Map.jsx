import React from 'react';
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '700px',
  height: '600px'
};

const center = {
  lat: 45.8465599,
  lng: 27.4267733
};

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBjirh1ClVmRSUX7Mvg_sZL6AZYZlOhj1I'
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={17.2222222222222222222222222222222222222222222222222222222222222222222222222}
      center={center}
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
}

export default Map;