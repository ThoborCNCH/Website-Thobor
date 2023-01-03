// // // AIzaSyBjirh1ClVmRSUX7Mvg_sZL6AZYZlOhj1I
// // import React from "react";
// // import { useMemo } from "react";
// // import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// // import { useEffect } from "react";

// // function DateContact() {
// //   const {isLoaded} = useLoadScript({
// //     googleMapsApiKey: "AIzaSyBjirh1ClVmRSUX7Mvg_sZL6AZYZlOhj1I",
// //   });
// //   useEffect(() => {
// //     console.log("AIzaSyBjirh1ClVmRSUX7Mvg_sZL6AZYZlOhj1I");
// //   }, []);
// //   return <GoogleMap zoom={10} center={{lat:44, lng:-80}} mapContainerClassName="map_react" >

// //   </GoogleMap>;
// // }

// // export default DateContact;

// // // const DateContact = withScriptjs(
// // //   withGoogleMap((props) => (
// // //     <GoogleMap defaultZoom={8} key="AIzaSyBjirh1ClVmRSUX7Mvg_sZL6AZYZlOhj1I" defaultCenter={{ lat: -34.397, lng: 150.644 }}>
// // //       <Marker position={{ lat: -34.397, lng: 150.644 }} />
// // //     </GoogleMap>
// // //   ))
// // // );

// import { useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// export default function Home() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyBjirh1ClVmRSUX7Mvg_sZL6AZYZlOhj1I",
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;
// }

// function Map() {
//   const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

//   return (
//     <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//       <Marker position={center} />
//     </GoogleMap>
//   );
// }

import React from "react";

function DateContact() {
  return (
    <div className="datecontact">
      <div className="left">
        <div className="title">
          <h1>
            Suntem de la <span>Colegiul Național "Calistrat Hogaș"</span>
          </h1>
          <div className="linie"></div>
        </div>
        <ul>
          <li>Strada Costache Racoviţă, nr.20, Tecuci, 805300</li>
          <li>
            <a href="tel: 0236/820010">0236/820010</a>
          </li>
          <li>
            <a href="mailto:lchogas@yahoo.com">lchogas@yahoo.com</a>
          </li>
        </ul>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default DateContact;
