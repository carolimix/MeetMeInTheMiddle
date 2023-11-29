/* async function findMiddlePoint() {
  let apiKey = "ZFeDzfLS6em5gdSibPQC";
  let apiUrl = `https://api.maptiler.com/search?q=${location}&key=${apiKey}`;
  let response = await fetch(apiUrl);
  let data = await response.json();
  console.log(`Coordenadas de ${location}:`, data);
}
findMiddlePoint();
 */

maptilersdk.config.apiKey = "ZFeDzfLS6em5gdSibPQC";
const map = new maptilersdk.Map({
  container: "map",
  style: maptilersdk.MapStyle.STREETS,
  geolocate: maptilersdk.GeolocationType.POINT,
});

const geocodingControl = new maptilersdk.GeocodingControl({
  apiKey: maptilersdk.config.apiKey, // Utiliza la variable apiKey
});
// Añade el control al mapa
map.addControl(geocodingControl);

function findMiddlePoint() {
  let pointA = document.getElementById("pointA").value;
  let pointB = document.getElementById("pointB").value;

  geocodingControl.geocode(pointA, function (resultA) {
    geocodingControl.geocode(pointB, function (resultB) {
      // Ahora, resultA y resultB contienen información sobre las coordenadas de las direcciones

      // Calcula el punto medio y haz lo que necesites con él
      let middlePoint = [
        (resultA.features[0].geometry.coordinates[0] +
          resultB.features[0].geometry.coordinates[0]) /
          2,
        (resultA.features[0].geometry.coordinates[1] +
          resultB.features[0].geometry.coordinates[1]) /
          2,
      ];

      // Haz algo con el punto medio, como centrar el mapa en él
      map.setView(middlePoint, 13);
    });
  });
}

/* async function getCoordinates() {
  fetch("https://api.example.com/data")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
} */
