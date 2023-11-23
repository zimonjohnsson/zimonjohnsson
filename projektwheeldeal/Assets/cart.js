const Items = [
	{ Name: "Retro Rattletron 3000", Price: 50000 },
	{ Name: "PixelPulse Prowler", Price: 30000 },
	{ Name: "Viridian Vigilante", Price: 60000 },
	{ Name: "GTR 4090TI", Price: 100000 },
	{ Name: "Tizi Blows Backfire", Price: 110000 },
	{ Name: "Ragnarok Twin Turbo", Price: 120000 },
	{ Name: "Ginger Fast", Price: 3000 },
	{ Name: "Yaba Dingel", Price: 2500 },
	{ Name: "OUI It´s NEON", Price: 2500 },
	{ Name: "Tekno-Trekker", Price: 2000 },
	{ Name: "Nightmare Flash", Price: 700 },
	{ Name: "Pedal Punchline", Price: 500 },
	{ Name: "ICE BreakeR", Price: 100 },
	{ Name: "THE Mechanical Respect", Price: 100 },	
	{ Name: "Future Genius", Price: 100 },
	{ Name: "Dad & Son", Price: 100 },
	{ Name: "Purble And Secured", Price: 100 },
	{ Name: "Robert Wadlow 272", Price: 100 },
	{ Name: "Old Future", Price: 10000 },
	{ Name: "Smooth Rocket", Price: 7000 },
	{ Name: "Rolex Submariner 1500CC", Price: 12000 },
	{ Name: "Emeraldish Gouldish", Price: 13000 },
	{ Name: "Neon IN The City", Price: 13000 },
	{ Name: "Purple PRO MAX 69", Price: 12000 },
]
let addedItems = [];
let addedCounts = [];
if (localStorage.getItem("savedItems") != null) addedItems = JSON.parse(localStorage.getItem("savedItems"));
if (localStorage.getItem("savedCount") != null) addedCounts = JSON.parse(localStorage.getItem("savedCount"));

function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		return true;
	}
	else return false;
}
function showCart() {
	if (CheckBrowser()) {
		var parseHTML = "";
		if (localStorage.getItem("savedItems") != null) addedItems = JSON.parse(localStorage.getItem("savedItems"));
		if (localStorage.getItem("savedCount") != null) addedCounts = JSON.parse(localStorage.getItem("savedCount"));

		for (i = 0; i< addedItems.length; i++) {
			let theItem = Items.find((obj) => obj.Name == addedItems[i]);

			parseHTML += '<tr class="cartItem"> <td>' + addedItems[i]
			+'</td><td>'+ addedCounts[i] +'</td>'
			+'<td> $'+ (theItem.Price * addedCounts[i]) +'</td>'
			+'<td><input type="button" value="Ta Bort" onclick="removeFromCart(\''+ addedItems[i] +'\')"> </td></tr>';
		}
		document.getElementById("cartList").innerHTML = parseHTML;
		CountCartItems();
	} else {
		alert('Your browser does not support HTML 5');
	}
}

async function ladda() {
	localStorage.setItem("savedItems", JSON.stringify(addedItems));
	localStorage.setItem("savedCount", JSON.stringify(addedCounts));

	const cart = document.getElementById('countingThing');
	const savedCountArray = JSON.parse(localStorage.getItem('savedCount'));
	
	if (Array.isArray(savedCountArray)) {
	  let summa = 0;
	
	  for (const num of savedCountArray) {
		if (typeof num === 'number') {
		  summa += num;
		}
	  }
	
	  cart.innerHTML = summa;
	} else {
	  cart.innerHTML = "No valid array found in localStorage.";
	}
}

function addToCart(name) {
	if (localStorage.getItem("savedItems") != null) addedItems = JSON.parse(localStorage.getItem("savedItems"));
	if (localStorage.getItem("savedCount") != null) addedCounts = JSON.parse(localStorage.getItem("savedCount"));
	
	var itemExists = addedItems.includes(name);
	if (itemExists) { // Add item count
		addedCounts[addedItems.indexOf(name)]++;
	} else  { // Add new item
		addedItems.push(name);
		addedCounts[addedItems.indexOf(name)] = 1;
	}
	localStorage.setItem("savedItems", JSON.stringify(addedItems));
	localStorage.setItem("savedCount", JSON.stringify(addedCounts));

	const cart = document.getElementById('countingThing');
	const savedCountArray = JSON.parse(localStorage.getItem('savedCount'));
	
	if (Array.isArray(savedCountArray)) {
	  let summa = 0;
	
	  for (const num of savedCountArray) {
		if (typeof num === 'number') {
		  summa += num;
		}
	  }
	
	  cart.innerHTML = summa;
	} else {
	  cart.innerHTML = "No valid array found in localStorage.";
	}

	showCart();
}

function removeFromCart(name) {
	if (name != null) {
		if (localStorage.getItem("savedItems") != null) addedItems = JSON.parse(localStorage.getItem("savedItems"));
		if (localStorage.getItem("savedCount") != null) addedCounts = JSON.parse(localStorage.getItem("savedCount"));
		
		var itemExists = addedItems.includes(name);
		if (itemExists && addedCounts[addedItems.indexOf(name)] > 1) { // Lower item count
			addedCounts[addedItems.indexOf(name)]--;
		} else { // Remove item
			addedCounts.splice(addedItems.indexOf(name), 1);
			addedItems.splice(addedItems.indexOf(name), 1);
		}
		localStorage.setItem("savedItems", JSON.stringify(addedItems));
		localStorage.setItem("savedCount", JSON.stringify(addedCounts));
	}
	window.location.reload();
	showCart();
}

function ClearAll() {
	addedItems = [];
	addedCounts = [];
	localStorage.setItem("savedItems", JSON.stringify(addedItems));
	localStorage.setItem("savedCount", JSON.stringify(addedCounts));
	window.location.reload();
	showCart();
}

function CountCartItems() {
	if (localStorage.getItem("savedCount") != null) addedCounts = JSON.parse(localStorage.getItem("savedCount"));
	if (localStorage.getItem("savedItems") != null) addedItems = JSON.parse(localStorage.getItem("savedItems"));
	
	var totalItems = 0;
	var totalCost = 0;
	for (let i = 0; i < addedCounts.length; i++) {
		totalItems += addedCounts[i];
	}
	for (let i = 0; i < addedItems.length; i++) {
		totalCost += (Items.find((obj) => obj.Name == addedItems[i]).Price * addedCounts[i]);
	}

	document.getElementById("countCart").innerHTML = "Total - "+ totalItems +" items : $"+ totalCost;
}