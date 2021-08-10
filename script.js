/*
GESTION DE STOCK
JAVASCRIPT FILE
BY ULYSSE VALDENAIRE
08/08/2021
*/

//Variables globales
const btnAjouter = document.getElementById("ajouter");
let btnModifier = document.getElementById("modifier");
const sectionProducts = document.getElementById("products");
let sectionOptions = document.getElementById("options");
let divProduct = document.createElement("div");

//Variables pour le formulaires
const divForm = document.createElement("div");
const form = document.createElement("form");
const Title = document.createElement("h3");
Title.textContent = "Ajouter/Modifier un produit";
const inputID = document.createElement("input");
inputID.setAttribute("type", "number");
const labelName = document.createElement("label");
labelName.textContent = "Nom du produit";
const inputName = document.createElement("input");
inputName.setAttribute("type", "text");
const labelPrice = document.createElement("label");
labelPrice.textContent = "Prix : ";
const inputPrice = document.createElement("input");
inputPrice.setAttribute("type", "number");
const labelStockActu = document.createElement("label");
labelStockActu.textContent = "Stock Actuel ";
const inputStockActu = document.createElement("input");
inputStockActu.setAttribute("type", "number");
const labelStockMin = document.createElement("label");
labelStockMin.textContent = "stock min";
const inputStockMin = document.createElement("input");
inputStockMin.setAttribute("type", "number");
const btnValider = document.createElement("button");
btnValider.textContent = "valider";
let br = document.createElement("br");
const br1 = document.createElement("br");
const br2 = document.createElement("br");
let br5 = document.createElement("br");
let br4 = document.createElement("br");
const br3 = document.createElement("br");
const divList = document.createElement("div");

//array des produits
listProducts = [];

//constructeur de l'objet product
function Product(id, name, price, stockActu, stockMin) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.stockActu = stockActu;
  this.stockMin = stockMin;
}

//Au chargement de la page, si il y a des produits, ils sont affichés sinon, rien ne se passe
document.addEventListener("DOMContentLoaded", function () {
  //on récupére le contenu du local storage
  let listProductsLocalStorage = localStorage.getItem("products");
  //si il est nul, on ne fait rien
  if (listProductsLocalStorage === null) {
  } else {
    //sinon, onb appelle la fonction create product pour afficher les produits
    listProductsLocalStorage = JSON.parse(listProductsLocalStorage);
    for (product of listProductsLocalStorage) {
      createProduct(product);
    }
  }
});

//au click ur le bouton 'ajouter un produit' --> un formulaire apparait
btnAjouter.addEventListener("click", function () {
  addProduct(0, "", 0, 0, 0);
});

//au click sur le bouton valider
btnValider.addEventListener("click", function (event) {
  event.preventDefault();
  //on crée un nouvel objet product avec le contenu du formulaire
  let product = new Product(
    inputID.value,
    inputName.value,
    inputPrice.value,
    inputStockActu.value,
    inputStockMin.value
  );
  let listFinale;
  listProducts = [];
  listProducts.push(product);
  listProductsBefore = localStorage.getItem("products");
  console.log(listProductsBefore);
  if (listProductsBefore === null) {
    listFinale = listProducts;
  } else {
    listProductsBefore = JSON.parse(listProductsBefore);
    console.log(listProductsBefore);
    console.log(listProducts);
    listFinale = listProductsBefore.concat(listProducts);
    console.log(listFinale);
  }
  localStorage.setItem("products", JSON.stringify(listFinale));
  createProduct(product);
});

//fonction qui crée un formulaire pour ajouter un produit
function addProduct(
  valueID,
  valueName,
  valuePrice,
  valueStockActu,
  valueStockMin
) {
  form.appendChild(Title);
  form.appendChild(br);
  inputID.setAttribute("value", valueID);
  form.appendChild(inputID);
  form.appendChild(br5);
  form.appendChild(labelName);
  inputName.setAttribute("value", valueName);
  form.appendChild(inputName);
  form.appendChild(br1);
  form.appendChild(labelPrice);
  inputPrice.setAttribute("value", valuePrice);
  form.appendChild(inputPrice);
  form.appendChild(br2);
  form.appendChild(labelStockActu);
  inputStockActu.setAttribute("value", valueStockActu);
  form.appendChild(inputStockActu);
  form.appendChild(br3);
  form.appendChild(labelStockMin);
  inputStockMin.setAttribute("value", valueStockMin);
  form.appendChild(inputStockMin);
  form.appendChild(br4);
  form.appendChild(btnValider);
  divForm.append(form);
  sectionOptions.appendChild(divForm);
}

//fonction qui affiche le produit après l'avoir ajouter
function createProduct(product) {
  divProduct.setAttribute("class", "divProduct");
  let checkboxProduct = document.createElement("input");
  checkboxProduct.setAttribute("type", "checkbox");
  checkboxProduct.setAttribute("class", "checkboxesInput");
  checkboxProduct.setAttribute("name", product.name);
  divProduct.appendChild(checkboxProduct);
  let productLine = document.createElement("label");
  productLine.textContent =
    product.name +
    " prix : " +
    product.price +
    " stock actuelle : " +
    product.stockActu +
    " stock minimun : " +
    product.stockMin;
  productLine.setAttribute("for", product.name);
  productLine.setAttribute("class", "products");
  divProduct.appendChild(productLine);
  const br = document.createElement("br");
  divProduct.appendChild(br);
  sectionProducts.appendChild(divProduct);
}

//supprimer tout le contenu du local storage
document.getElementById("deleteAll").addEventListener("click", function () {
  localStorage.clear();
  divProduct.textContent = "";
});

//Modifier un produit
btnModifier.addEventListener("click", function () {
  deleteProduct(true);
});

let btnDelete = document.getElementById("delete");
btnDelete.addEventListener("click", function () {
  deleteProduct(false);
});

function deleteProduct(add) {
  let allCheckboxesProducts =
    document.getElementsByClassName("checkboxesInput");
  let productToModify;
  let checkbox;
  let productLine;
  let index;
  for (i = 0; i < allCheckboxesProducts.length; i++) {
    if (allCheckboxesProducts[i].checked === true) {
      productToModify = allCheckboxesProducts[i].name;
      checkbox = allCheckboxesProducts[i];
      console.log(checkbox.name);
      index = i;
    }
  }
  let products = document.getElementsByClassName("products");
  let listProducts = localStorage.getItem("products");
  listProducts = JSON.parse(listProducts);
  for (let i = 0; i < listProducts.length; i++) {
    if (listProducts[i].name === checkbox.name) {
      if (add === true) {
        addProduct(
          listProducts[i].id,
          listProducts[i].name,
          listProducts[i].price
        );
      }

      listProducts.splice(i, 1);
      localStorage.setItem("products", JSON.stringify(listProducts));
    }
  }
  divProduct.removeChild(checkbox);
  divProduct.removeChild(products[index]);
}

let btnShoppingListe = document.getElementById("shoppingList");

btnShoppingListe.addEventListener("click", function () {
  console.log("hello");
  createShopList();
});

function createShopList() {
  let listProduct = localStorage.getItem("products");
  listProduct = JSON.parse(listProduct);
  console.log(listProduct);
  let listProductsToBuy = [];
  for (let i = 0; i < listProduct.length; i++) {
    if (listProduct[i].stockActu <= listProduct[i].stockMin) {
      listProductsToBuy.push(listProduct[i]);
    }
  }
  console.log(listProductsToBuy);
  let totalPrice = 0;
  for (product of listProductsToBuy) {
    createElementList(product);
    let number = product.stockMin - product.stockActu;
    if (number === 0) {
      number = 1;
    }
    product.price = Number(product.price);
    console.log(totalPrice);
    totalPrice += product.price * number;
    console.log(totalPrice);
  }
  let totalPriceElement = document.createElement("p");
  totalPriceElement.textContent = totalPrice;
  console.log(totalPrice);
  divList.appendChild(totalPriceElement);
}

function createElementList(product) {
  const name = product.name;
  let number = product.stockMin - product.stockActu;
  if (number === 0) {
    number = 1;
  }
  const price = product.price;
  const productToBuy = document.createElement("p");
  productToBuy.textContent = number + "  " + name + " prix : " + price + " €";
  divList.appendChild(productToBuy);
  divProduct.appendChild(divList);
}
