/* Global Variables */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let d = new Date();
const month = d.getMonth() + 1;
let newDate = month + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=b7faebfa66dce018ea1a57d4c41ceb3d&units=imperial";
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);
/* Function called by event listener */
function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const userResponse = document.getElementById("feelings").value;
  //   console.log(userResponse);
  //   Weather API call
  getWeatherData(baseURL, zipCode, apiKey)
    //   Post fetched data from API into our API endpoint
    .then(function (data) {
      console.log(data);
      postData("/all", {
        temperature: data.main.temp,
        date: newDate,
        userResponse: userResponse,
      });
      retrieveData("/all");
    });
}
/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  //   console.log(baseURL + zip + key);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
/* Function to POST data */
const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

/* Function to GET Project Data */
const retrieveData = async (url) => {
  const request = await fetch(url);
  try {
    // Transform into JSON
    console.log(request.text);
    const allData = await request.json();
    console.log(allData);
    console.log(allData[0].temperature);
    console.log(allData[1].date);
    console.log(allData[2].userResponse);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData[0].temperature) + " degrees";
    document.getElementById("content").innerHTML = allData[2].userResponse;
    document.getElementById("date").innerHTML = allData[1].date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
