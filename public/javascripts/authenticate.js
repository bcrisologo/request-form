// public/javascripts/authenticate.js

// On successful login ===================================
const req = new XMLHttpRequest();

//req.send();

// For login page error checks ===================================

const urlParams = new URLSearchParams(window.location.search);
const info = urlParams.get('info');

if(info) {
	const errorMessage = document.getElementById("error-message");
	errorMessage.innerText = info;
	errorMessage.style.display = "block";
}