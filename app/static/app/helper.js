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
  const textElement = document.queryselector("#text")
  const reviewElement = document.querySelector("#review")
  const checkboxElements = document.querySelectorAll("input:[type='checkbox']")
  const checkContainer = document.querySelector(".checkbox-container")

  const taskInput = document.querySelector("#task_input")
  const text = textElement.value
  const review = reviewElement.value
  const tasks = getTasks(checkboxElements)
  const accessToken = localStorage.getItem("ACCESS_TOKEN")
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

function goIn(){
  const inSide  = document.querySelector(".in")
  const outSide = document.querySelector(".out")

  if (inSide.style.display === "none"){
    inSide.id = "inside"
    outSide.style.display = "none"
  }
}

function pageSetter(page){
  const entry = document.querySelector(".entry-page")
  const entries = document.querySelector(".entries")
  if(page === "entry"){
    if(entry.style.display === "none"){
      entry.style.display = "block"
    }
  }else if (page === "entries"){
    if(entries.style.display === "none"){
      entries.style.display = "block"
      getEntries()
    }
  }
}


function getEntries(){
  const accessToken = localStorage.getItem("ACCESS_TOKEN")
  if (!isTokenExpired(accessToken) || accessToken){
  fetch("entries/",{
    method: "GET",
    headers:{
      "Content-Type":"application/json",
      "Authorisation": `Bearer ${accessToken}`
    }
  }).then(response=>response.json())
  .then(result=>{
    result.forEach(element=>{
      entries = document.querySelector(".entries")
      card = document.createElement("div")
      snippet = document.createElement("div")
      meta = document.createElement("div")

      snippet.innerText = `${element.text.slice[0,36]}...`
      meta.innerText = `written created on ${element.timestamp}`
      snippet.classList.add("snippet")
      meta.classList.add("meta")
      card.classList.add("card")
      card.dataset.id = `${element.id}`
      card.appendChild(snippet, meta)
      entries.appendChild(card)
    })
  })
  }else{
  try {
    refreshToken()
  } catch (error) {
    login()
    getEntries()
  }}
}

function getEntry(id){
  let accessToken = localStorage.getItem("ACCESS_TOKEN")
  if (!isTokenExpired(accessToken) || accessToken){
    fetch(`entry/${id}`,{
      method: "GET",
      headers:{
        "Content-Type":"application/json",
        "Authorisation": `Bearer ${accessToken}`
      }
    }).then(response.json())
    .then(result=>{
      const textElement = document.queryselector("#text");
      const reviewElement = document.querySelector("#review");
      const checkContainer = document.querySelector(".checkbox-container");

      textElement.value = result.text
      reviewElement.value = result.review
      checkContainer.innerHTML = taskToHTML(result.tasks)

      submit = document.querySelector("#submit")
      submit.value = "update"
      submit.removeEventListener("click", post)
      submit.addEventListener("click", updateEntry)
      
    }).catch(e=>{
      document.querySelector(".entries-page"). innerText = `error fetching result ${e}`
    })
  }
};

function taskToHTML(tasks){
  let checkContainer; 
  for(let task of tasks){
    if (task.completed){
      checkContainer += `<input type="checkbox" value="${task.task}" checked id="${task.id}"><label for="${task.id}">${task.task}</label>`;
    }
    else{
      checkContainer += `<input type="checkbox" value="${task.task}" checked id="${task.id}"><label for="${task.id}">${task.task}</label>`;
    }
  }
}

function updateEntry(){
  let accessToken = localStorage.getItem("ACCESS_TOKEN")
  if (!isTokenExpired(accessToken) || accessToken){
    const textElement = document.queryselector("#text");
    const reviewElement = document.querySelector("#review");
    const checkboxElements = document.querySelectorAll("input:[type='checkbox']")

    return fetch(`update/entry/${id}`,{
      method: "PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorisation": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        text: textElement.value,
        review: reviewElement.value,
        tasks: getTasks(checkboxElements)
      })
    }).then(response.json())
    .then(result=>{
      textElement = document.queryselector("#text");
      reviewElement = document.querySelector("#review");
      checkContainer = document.querySelector(".checkbox-container");

      textElement.value = ''
      reviewElement.value = ''
      checkContainer.innerHTML = ''

      submit = document.querySelector("#id")
      submit.value = "Post"
      submit.removeEventListener("click", upadteEntry)
      submit.addEventListener("click", post)
      
    }).catch(e=>{
      document.querySelector(".entries-page"). innerText = `error fetching result ${e}`
    })
  }
};

function taskAdder(){
  checkContainer = document.querySelector(".checkbox-container")
  taskInput = document.querySelector("#task_input")
  checkContainer.innerHtml += `<input type="checkbox" value ${taskInput.value} id=${taskInput.value}}><label for=${taskInput.value}>${taskInput.value}</label>`;
  taskInput=""
}

function logout(){
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
}

export { isTokenExpired, refreshToken, performLogin, post, goIn, getEntries, getEntry, updateEntry, taskAdder, pageSetter, taskToHTML };