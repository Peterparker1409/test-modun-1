// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

// Load existing products from localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Function to render the products in the table
function renderProducts() {
	const tableBody = document.getElementById("result");
	tableBody.innerHTML = "";

	products.forEach((product, index) => {
		const row = document.createElement("tr");

		const indexColumn = document.createElement("td");
		indexColumn.textContent = index + 1;
		row.appendChild(indexColumn);

		const nameColumn = document.createElement("td");
		nameColumn.textContent = product.product_name;
		row.appendChild(nameColumn);

		const imgColumn = document.createElement("td");
		const imgElement = document.createElement("img");
		imgElement.src = product.imgDrink;
		imgElement.alt = product.product_name;
		imgElement.width = 100;
		imgColumn.appendChild(imgElement);
		row.appendChild(imgColumn);

		const priceColumn = document.createElement("td");
		priceColumn.textContent = product.price;
		row.appendChild(priceColumn);

		const actionsColumn = document.createElement("td");
		const editButton = document.createElement("button");
		editButton.textContent = "Edit";
		editButton.addEventListener("click", () => editProduct(index));
		actionsColumn.appendChild(editButton);

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.addEventListener("click", () => deleteProduct(index));
		actionsColumn.appendChild(deleteButton);

		row.appendChild(actionsColumn);

		tableBody.appendChild(row);
	});
}

// Function to save a new product or update an existing one
function saveProduct() {
	const index = document.getElementById("index").value;
	const productName = document.getElementById("product_name").value;
	const imgDrink = document.getElementById("imgDrink").value;
	const price = document.getElementById("price").value;

	if (index === "") {
		// Add a new product
		const product = {
			product_name: productName,
			imgDrink: imgDrink,
			price: price
		};
		products.push(product);
	} else {
		// Update an existing product
		const existingProduct = products[index];
		if (existingProduct) {
			existingProduct.product_name = productName;
			existingProduct.imgDrink = imgDrink;
			existingProduct.price = price;
		}
	}

	// Save products to localStorage
	localStorage.setItem("products", JSON.stringify(products));

	// Clear the form
	document.getElementById("index").value = "";
	document.getElementById("product_name").value = "";
	document.getElementById("imgDrink").value = "";
	document.getElementById("price").value = 0;

	// Render the updated products in the table
	renderProducts();
}

// Function to edit a product
function editProduct(index) {
	const product = products[index];
	if (product) {
		document.getElementById("index").value = index;
		document.getElementById("product_name").value = product.product_name;
		document.getElementById("imgDrink").value = product.imgDrink;
		document.getElementById("price").value = product.price;
	}
}

// Function to delete a product
function deleteProduct(index) {
	products.splice(index, 1);

	// Save products to localStorage
	localStorage.setItem("products", JSON.stringify(products));

	// Render the updated products in the table
	renderProducts();
}

// Initial rendering of products
renderProducts();
