import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

const createNumberedIcon = (index, markerColor) => {
  return L.divIcon({
    className: "custom-icon",
    html: renderToStaticMarkup(
      <div
        style={{
          backgroundColor: markerColor,
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {index + 1}
      </div>
    ),
  });
};


export default createNumberedIcon