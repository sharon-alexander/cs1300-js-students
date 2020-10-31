var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=Q9tGsot1A7ZCtm7SU4YTo9pr9PmUa3eoVRk4DkThuAI";

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
      console.log(request.data); //request.responseText 
      handleResponse(request.response); //added 
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////

const handleResponse = (response) => {
  const jsonified = JSON.parse(response);
  const plants = jsonified.data;
  console.log(plants); //will show what the parsed plants looks like 

  const plantsAfter1755 = plants.filter((arrayItem) => {
    return arrayItem.year > 1755;

  });


  for (const plant of plantsAfter1755) {
    turnPlantIntoHTML(plant);

  }
}

const turnPlantIntoHTML = (plant) => {

  const plantDiv = document.createElement("div"); //you can set anything onto this div element now
  plantDiv.innerText = plant.common_name;
  const commonContainerDiv = document.getElementById("common-container");
  commonContainerDiv.appendChild(plantDiv);

  const sciDiv = document.createElement("div"); //you can set anything onto this div element now
  sciDiv.innerText = plant.scientific_name;
  const scientificContainerDiv = document.getElementById("scientific-container");
  scientificContainerDiv.appendChild(sciDiv);
  



}
