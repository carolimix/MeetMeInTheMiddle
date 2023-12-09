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

// Configuration for MapTiler SDK
maptilersdk.config.apiKey = "ZFeDzfLS6em5gdSibPQC";

// Create a new Map with MapTiler SDK
const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.STREETS,
  geolocate: maptilersdk.GeolocationType.POINT,
});

// Create Geocoding controls for Point A and Point B
const geocodingControlA = new maptilerGeocoder.GeocodingControl({
  apiKey: "ZFeDzfLS6em5gdSibPQC",
  target: document.getElementById("pointA"),
});

const geocodingControlB = new maptilerGeocoder.GeocodingControl({
  apiKey: "ZFeDzfLS6em5gdSibPQC",
  target: document.getElementById("pointB"),
});

// Function to fetch the location name based on coordinates from the middlePoint
async function fetchReverseLocation(longitude, latitude) {
  let apiKey = "ZFeDzfLS6em5gdSibPQC";
  let apiUrl =
    "https://api.maptiler.com/geocoding/" +
    encodeURIComponent(longitude + "," + latitude) +
    ".json?key=" +
    apiKey;

  let response = await fetch(apiUrl);
  let data = await response.json();

  console.log(data);
  let locationName = data.features[0].place_name;
  console.log(`Coordenadas de ${longitude}${latitude}:`, locationName);
  console.log(apiUrl);
  return locationName;
}

// Function to find the middle point, set a marker, and handle the popup
async function findMiddlePoint() {
  let pointA = document.getElementById("pointA");
  let pointB = document.getElementById("pointB");

  let inputA = pointA.querySelector("input");
  let inputB = pointB.querySelector("input");

  let locationA = await fetchLocation(inputA.value);
  let locationB = await fetchLocation(inputB.value);
  let middlePoint = [
    (locationA[0] + locationB[0]) / 2,
    (locationA[1] + locationB[1]) / 2,
  ];

  let middlePointName = await fetchReverseLocation(
    middlePoint[0],
    middlePoint[1]
  );

  console.log(map, locationA, locationB, middlePoint, middlePointName);

  //url for the maps search
  const categoryDropdown = document.getElementById("categories");
  const selectedCategory = categoryDropdown.value;

  map.setCenter(middlePoint);
  map.setZoom(13);

  const searchUrl = `https://www.google.com/maps/search/${selectedCategory}+near+${encodeURIComponent(
    middlePointName
  )}`;

  // Create a popup with the middle point name and a link
  let popupText = `This is the middle point!<br/><a href="${searchUrl}" target='_blank'>Click here for Recommendations</a>`;

  popupText.onclick = function () {
    window.open(searchUrl, "_blank");
  };

  let popup = new maptilersdk.Popup({ offset: 25 }).setHTML(popupText);

  const marker = new maptilersdk.Marker({ color: "pink" })
    .setLngLat(middlePoint)
    .setPopup(popup)
    .addTo(map);

  marker.togglePopup();
}
