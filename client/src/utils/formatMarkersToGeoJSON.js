function formatMarkersToGeoJSON(markers) {
  const features = markers.map((marker) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: marker.location.coordinates,
    },
    properties: {
      title: marker.title,
      description: marker.description,
      category: marker.category,
    },
  }));

  return {
    type: "FeatureCollection",
    features: features,
  };
}

export default formatMarkersToGeoJSON;
