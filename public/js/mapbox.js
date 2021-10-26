

export const displayMap = (locations)=>{
  mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFyb3Zhbjg5MTEiLCJhIjoiY2t1d3A2MGViMGJxbzMzbGFvMWU5dWE4OSJ9.48Fu3bTzKkuFA_JZt0IGlw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/darovan8911/ckuwprxqk0xf818rpx1lo8jsw",
  //center: [-118.113491, 34.111745],
  //zoom: 10,
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement("div");
  el.className = "marker";

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: "bottom",
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});

}

