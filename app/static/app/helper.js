import jwt_decode from "jwt-decode";
// Helper function to check if the token is expired
function isTokenExpired(token) {
  try {
    const decodedToken = jwt_decode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime >= decodedToken.exp;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return true; // Treat as expired if there's an error decoding
  }
}

// Function to refresh the access token using the refresh token
function refreshToken() {
  const refreshToken = localStorage.getItem("REFRESH_TOKEN");
  if (!refreshToken) {
    console.error("No refresh token available.");
    return Promise.reject("No refresh token available.");
  }

  return fetch("/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to refresh access token.");
      }
      return response.json();
    })
    .then((result) => {
      localStorage.setItem("ACCESS_TOKEN", result.access);
      return result.access;
    })
    .catch((error) => {
      console.error("Error refreshing token:", error);
    });
}

// Function to perform a full login and store tokens
function performLogin() {
  fetch("/login", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed.");
      }
      return response.json();
    })
    .then((result) => {
      localStorage.setItem("ACCESS_TOKEN", result.access);
      localStorage.setItem("REFRESH_TOKEN", result.refresh); // Assuming refresh token is provided
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
}

function login() {
  let accessToken = localStorage.getItem("ACCESS_TOKEN");

  if (!accessToken || isTokenExpired(accessToken)) {
    // If there's no access token or it has expired, get a new one
    if (localStorage.getItem("REFRESH_TOKEN")) {
      // Try to refresh the access token
      refreshToken().then((newAccessToken) => {
        if (!newAccessToken) {
          // If refresh failed, perform a full login
          performLogin();
        }
      });
    } else {
      // If no refresh token, perform a full login
      performLogin();
    }
  } else {
    // Access token exists and is valid
    console.log("Access token is valid.");
  }
}

function post(){
  textElement = document.queryselector("#text")
  reviewElement = document.querySelector("#review")
  checkboxElements = document.querySelectorAll("input:[type='checkbox']")
  checkContainer = document.querySelector(".checkbox-container")

  taskInput = document.querySelector("#task_input")
  text = textElement.value
  review = reviewElement.value
  tasks = getTasks(checkboxElements)
  accessToken = localStorage.getItem("ACCESS_TOKEN")
  if (!isTokenExpired(accessToken) || accessToken){
      fetch("entry/create",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorisation": `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
    },
    body: JSON.stringify({
      text: text,
      review: review,
      tasks: tasks
    })
  }).then(response=>{
    if(response.ok){
      alert("entry posted succesfully")
      textElement.value = ""
      reviewElement.value = ""
      checkContainer.innerHTML = ""
      taskInput.value = ""
    }
  }).catch(e=>{
    console.log(e)
  })
  }
  else{refreshToken().then(post()).catch(e=>{
    login()
    post()
  })}
}

function getTasks(checkBoxes){
  let checkBoxes = checkBoxes
  let listOfTasks = []

  for(let checkbox of checkBoxes){
    if(checkbox.checked){
      listOfTasks.append({task: checkbox.value,
        completed: true
      })
    } else{
      listOfTasks.append({task: checkbox.value,
        completed: false
      })
    }
  }
  return listOfTasks
}

// function pageSetter(page){
//   if
// }

export { isTokenExpired, refreshToken, performLogin, post };