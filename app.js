async function fetchLocation(query) {
  let apiKey = "ZFeDzfLS6em5gdSibPQC";
  let apiUrl =
    "https://api.maptiler.com/geocoding/" + query + ".json?key=" + apiKey;
  let response = await fetch(apiUrl);
  let data = await response.json();
  let center = data.features[0].center;
  console.log(`Coordenadas de ${query}:`, center);
  return center;
}

maptilersdk.config.apiKey = "ZFeDzfLS6em5gdSibPQC";
const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.STREETS,
  geolocate: maptilersdk.GeolocationType.POINT,
});

async function findMiddlePoint() {
  let pointA = document.getElementById("pointA").value;
  let pointB = document.getElementById("pointB").value;
  let resultA = await fetchLocation(pointA);
  let resultB = await fetchLocation(pointB);
  let middlePoint = [
    (resultA[0] + resultB[0]) / 2,
    (resultA[1] + resultB[1]) / 2,
  ];
  console.log(map, resultA, resultB, middlePoint);

  map.setCenter(middlePoint, 13);
  const marker = new maptilersdk.Marker().setLngLat(middlePoint).addTo(map);
}
