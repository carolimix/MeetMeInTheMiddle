async function fetchLocation(query) {
  let apiKey = "ZFeDzfLS6em5gdSibPQC";
  let apiUrl =
    "https://api.maptiler.com/geocoding/" +
    encodeURIComponent(query) +
    ".json?autocomplete=true&fuzzyMatch=true&key=" +
    apiKey;
  let response = await fetch(apiUrl);
  let data = await response.json();
  let center = data.features[0].center;
  console.log(`Coordenadas de ${query}:`, center);
  console.log(apiUrl);
  return center;
}

maptilersdk.config.apiKey = "ZFeDzfLS6em5gdSibPQC";
const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.STREETS,
  geolocate: maptilersdk.GeolocationType.POINT,
});

let popup = new maptilersdk.Popup({ offset: 25 }).setText(
  "Este es el punto medio entre nuestras casas amiga"
);

const geocodingControlA = new maptilerGeocoder.GeocodingControl({
  apiKey: "ZFeDzfLS6em5gdSibPQC",
  target: document.getElementById("pointA"),
});

const geocodingControlB = new maptilerGeocoder.GeocodingControl({
  apiKey: "ZFeDzfLS6em5gdSibPQC",
  target: document.getElementById("pointB"),
});

/* geocodingControlA.addEventListener("response", (e) => {
  document.getElementById("resultsA").innerHTML = e.detail
    ? JSON.stringify(e.detail, null, 2)
    : "";
}); */

/* geocodingControlA.addEventListener("pick", (e) => {
  document.getElementById("resultsA").innerHTML = e.detail
    ? JSON.stringify(e.detail, null, 2)
    : "";
});

geocodingControlB.addEventListener("response", (e) => {
  document.getElementById("resultsB").innerHTML = e.detail
    ? JSON.stringify(e.detail, null, 2)
    : "";
});

geocodingControlB.addEventListener("pick", (e) => {
  document.getElementById("resultsB").innerHTML = e.detail
    ? JSON.stringify(e.detail, null, 2)
    : "";
}); */

async function findMiddlePoint() {
  let pointA = document.getElementById("pointA");
  let pointB = document.getElementById("pointB");

  let inputA = pointA.querySelector("input");
  let inputB = pointB.querySelector("input");

  let resultA = await fetchLocation(inputA.value);
  let resultB = await fetchLocation(inputB.value);
  let middlePoint = [
    (resultA[0] + resultB[0]) / 2,
    (resultA[1] + resultB[1]) / 2,
  ];
  console.log(map, resultA, resultB, middlePoint);

  map.setCenter(middlePoint, 13);
  const marker = new maptilersdk.Marker({ color: "pink" })
    .setLngLat(middlePoint)
    .setPopup(popup)
    .addTo(map);
}
