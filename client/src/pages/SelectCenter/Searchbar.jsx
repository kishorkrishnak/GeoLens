import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useMapEvent } from "react-leaflet";
import SearchControl from "../../components/SearchControl/SearchControl";
import { useLensCreationContext } from "../LensCreation/contexts/LensCreationContext";

const Searchbar = ({ operation }) => {
  const prov = new OpenStreetMapProvider();
  const { setCenterLatLong } = useLensCreationContext();

  const searchEventHandler = ({ location: { x, y } }) => {
    setCenterLatLong([y, x]);
  };

  useMapEvent({
    "geosearch/showlocation": searchEventHandler,
  });

  return (
    <SearchControl
      provider={prov}
      showMarker={false}
      showPopup={false}
      maxMarkers={3}
      style="bar"
      retainZoomLevel={false}
      animateZoom={true}
      autoClose={false}
      searchLabel={`${
        operation === "create" ? "Search" : "Change"
      } the centre point of your Lens`}
      keepResult={true}
    />
  );
};

export default Searchbar;
