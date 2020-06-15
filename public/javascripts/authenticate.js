// public/javascripts/authenticate.js

// For login page error checks ===================================

const urlParams = new URLSearchParams(window.location.search);
const info = urlParams.get('info');

if(info) {
	const errorMessage = document.getElementById("error-message");
	// errorMessage.innerText = info;
	errorMessage.innerText = "Incorrect Username or Password";
	errorMessage.style.display = "block";
}