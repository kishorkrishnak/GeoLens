import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

const createCentreIcon = () => {
  return L.divIcon({
    className: "custom-icon",
    html: renderToStaticMarkup(
      <div
        style={{
          height: "30px",
          display: "flex",
          fontSize: 40,
          color:"#424242",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        +
      </div>
    ),
  });
};

export default createCentreIcon;
