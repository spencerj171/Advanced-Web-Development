const btn = document.querySelector('button');
const image = document.querySelector('.image');
const name = document.querySelector('.name');
const username = document.querySelector('.username');
const email = document.querySelector('.email');
const city = document.querySelector('.city');

btn.addEventListener("click", function(){
  const url = "https://randomuser.me/api";
  fetch(url)
  .then(handleErrors)
  .then(parseJSON)
  .then(updateProfile)
  .catch(displayErrors);
});

function handleErrors(res){
  if(!res.ok){
    throw Error(res.status);
  }
  return res;
}

function parseJSON (res){
  return res.json().then(function(parsedData){
    return parsedData.results[0];
  })
}

function updateProfile (data){
    let fullname = data.name.first + " " + data.name.last;
    name.innerText = fullname;
    image.src = data.picture.medium;
    username.innerText = data.login.username;
    city.innerText = data.location.city;
    email.innerText = data.email;
}

function displayErrors(err){
  console.log("INSIDE displayErrors!");
  console.log(err);
}
