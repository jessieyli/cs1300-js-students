var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=XefTd5byMyHsUCJXixnKOJ3t96e-DzU1VxFczv2n79U";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      // getData(request.response);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
// const getData = (requestResponse) => {
//   const jsonified = JSON.parse(requestResponse);
//   plantData = jsonified.data;

//   const rosePlants = plantData.filter((arrayItem) => {
//     return arrayItem.family_common_name.includes("Rose");
//   })
//   rosePlants.map(console.log);
//   const buttercupPlants = plantData.filter((arrayItem) => {
//     return arrayItem.family_common_name.includes("Buttercup");
//   })
//   buttercupPlants.map(console.log);
// }

// const displayDiv = (plantType) => {
//   const wrapper = document.createElement("div");
//   wrapper.setAttribute("id", "wrapper");
//   const header = document.createElement("h3");
//   header.innerText = plantType;
//   wrapper.appendChild(header);
//   document.getElementById("plants").appendChild(wrapper);
// }

const showPlant = (name, url) => {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", "wrapper");
  const header = document.createElement("h3");
  header.innerText = name;
  const image = document.createElement("img");
  image.src = url;
  image.height = "200";
  wrapper.appendChild(header);
  wrapper.appendChild(image);
  document.getElementById("plants").appendChild(wrapper);
};

const displayPlants = (data, plantType) => {
  const plants = data.filter((arrayItem) => arrayItem.family_common_name.includes(plantType));
  console.log(plants);
  plants.forEach(element => {
    showPlant(element.common_name, element.image_url);
  });
};

const getPlantData = async(plantType) => {
  fetch("https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?token=XefTd5byMyHsUCJXixnKOJ3t96e-DzU1VxFczv2n79U")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(json => displayPlants(json.data, plantType))
  .catch((error) => console.error("FETCH ERROR:", error));
};
