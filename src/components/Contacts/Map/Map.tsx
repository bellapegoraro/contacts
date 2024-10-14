import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { TContact } from "../AddContacts/AddContacts";

const containerStyle = {
  width: "590px",
  height: "600px",
};

const coords = {
  lat: -25.4437172,
  lng: -49.2789859,
};

type TMapProps = {
  contactInformation: TContact;
};

function Map({ contactInformation }: TMapProps): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  console.log(
    "process.env.REACT_APP_GOOGLE_MAPS_API_KEY",
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    process.env.NODE_ENV
  );
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: contactInformation?.lat || coords.lat,
        lng: contactInformation?.lng || coords.lng,
      }}
      zoom={10}
    >
      <Marker
        position={{
          lat: contactInformation?.lat || coords.lat,
          lng: contactInformation?.lng || coords.lng,
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
