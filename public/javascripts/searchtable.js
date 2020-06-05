// /public/javascripts/searchtable.js

function mySearch() {

	let input, filter, table, tr, td, txtValue;

	input = document.getElementById("searchstring");
	filter = input.value.toUpperCase();
	table - document.getElementById("table-of-submitted-requests");
	tr = table.getElementsByTagName("tr");

	// Loop trhough all table rows and hide those who don't match the search query
	for (let i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[0];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}

export { mySearch }