const url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

const xhrb = document.querySelector('#xhr');
const fetchb = document.querySelector('#fetch');
const jqueryb = document.querySelector('#jquery');
const axiosb = document.querySelector('#axios');
const display = document.querySelector('#quote');

xhrb.addEventListener("click", function(){
  let XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function(){
    if(XHR.readyState == 4 && XHR.status == 200){
      let quote = JSON.parse(XHR.responseText)[0];
      display.innerText = `"${quote}"`;
    }
  }
  XHR.open("GET", url);
  XHR.send();
});

fetchb.addEventListener('click', function(){
  fetch(url)
  .then(function(req){
    req.json().then(function(data){
      display.innerText = `"${data[0]}"`;
    });
  }).catch(function(){
    console.log('Error');
  });
});

jqueryb.addEventListener('click', function(){
  $.getJSON(url)
  .done(function(data){
    display.innerText = `"${data[0]}"`;
  });
});

axiosb.addEventListener('click', function(){
  axios.get(url)
  .then(function(res){
    display.innerText = `"${res.data[0]}"`;
  }).catch(function(){
    console.log('Error');
  });
});
