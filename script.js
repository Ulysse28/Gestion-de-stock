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
const labelType = document.createElement("label");
labelType.textConte = "Type de produit";
const radioDefault = document.createElement("input");
radioDefault.setAttribute("type", "radio");
radioDefault.setAttribute("name", "question");
radioDefault.setAttribute("id", "radioDefault");
const defaultTxt = document.createElement("label");
defaultTxt.textContent = "Default";
const radioNormal = document.createElement("input");
radioNormal.setAttribute("type", "radio");
radioNormal.setAttribute("name", "question");
const normalTxt = document.createElement("label");
normalTxt.textContent = "Normal";
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
inputPrice.setAttribute("pattern", "[0-9]");

const labelStockActu = document.createElement("label");
labelStockActu.textContent = "Stock actuel ";
const inputStockActu = document.createElement("input");
inputStockActu.setAttribute("type", "number");
const labelStockMin = document.createElement("label");
labelStockMin.textContent = "Stock minimal";
const inputStockMin = document.createElement("input");
inputStockMin.setAttribute("type", "number");
const btnValider = document.createElement("button");
btnValider.setAttribute("class", "btn btn-dark");
btnValider.textContent = "valider";
const btnReset = document.createElement("button");
btnReset.setAttribute("class", "btn btn-dark");
btnReset.textContent = "Cacher le formualire";

let br = document.createElement("br");
const br1 = document.createElement("br");
const br2 = document.createElement("br");
let br5 = document.createElement("br");
let br4 = document.createElement("br");
const br6 = document.createElement("br");
const br3 = document.createElement("br");
const br7 = document.createElement("br");
const divList = document.createElement("div");

let priceValid;
let stockActuValid;
let stockMinValid;

let btnReturnList = document.createElement("button");
btnReturnList.setAttribute("class", "btn btn-info");
btnReturnList.textContent = "Retour liste produits";
let btnSaveList = document.createElement("button");
btnSaveList.setAttribute("class", "btn btn-info");
btnSaveList.textContent = "Sauvegarder la liste";
let liste;
let finalList = [];
let listeUl = document.createElement("ul");

const btnDisplayList = document.getElementById("displayList");
let displayList = false;

let title = document.createElement("h3");
title.textContent = "Votre liste de courses : ";
let finalPriceListText = document.createElement("p");
finalPriceListText.setAttribute("id", "price");

//array des produits
listProducts = [];

//constructeur de l'objet product
function Product(id, type, name, price, stockActu, stockMin) {
  this.id = id;
  this.type = type;
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
  addProduct("", 0, 0, 0, 0);
});

//au click sur le bouton valider --> l'objet est envoyé dans le local storage
btnValider.addEventListener("click", function (event) {
  event.preventDefault();
  validatePrice();
  validateStockActu();
  validateStockMin();
  console.log(priceValid);
  console.log(stockActuValid);
  console.log(stockMinValid);
  if (radioDefault.checked && priceValid) {
    addProductLocalStorage();
  } else if (
    radioNormal.checked &&
    priceValid &&
    stockActuValid &&
    stockMinValid
  ) {
    addProductLocalStorage();
  } else {
    alert("le formulaire n'est pas remplis correctement !");
  }
});

//Boutton radio pour les produits par defaults, les input Stock sont désactivés
radioDefault.addEventListener("change", function () {
  if (this.checked === true) {
    inputStockActu.disabled = true;
    inputStockMin.disabled = true;
  }
});

//Boutton radio pour les produits normaux, les input stock sont activés
radioNormal.addEventListener("change", function () {
  if (this.checked == true) {
    inputStockActu.disabled = false;
    inputStockMin.disabled = false;
  }
});

//supprimer tout le contenu du local storage
let btnDeleteAll = document.getElementById("deleteAll");
document.getElementById("deleteAll").addEventListener("click", function () {
  localStorage.clear();
  divProduct.textContent = "";
  alert("Tous les produits ont été supprimés !");
});

//Modifier un produit
btnModifier.addEventListener("click", function () {
  deleteProduct(true);
});

//Supprimer un produit
let btnDelete = document.getElementById("delete");
btnDelete.addEventListener("click", function () {
  deleteProduct(false);
});

//Cacher le formulaire
btnReset.addEventListener("click", function () {
  sectionOptions.removeChild(divForm);
});

let btnListCourses = document.getElementById("list");
//Afficher la liste de courses
let btnShoppingListe = document.getElementById("shoppingList");
btnShoppingListe.addEventListener("click", function () {
  console.log("hello");
  createShopList();
  // sectionProducts.removeChild(divProduct);
  divProduct.setAttribute("class", "nodisplay");
  btnListCourses.classList.add("display");
  btnShoppingListe.disabled = true;
  btnAjouter.disabled = true;
  btnModifier.disabled = true;
  btnDelete.disabled = true;
  btnDisplayList.disabled = true;
  btnDeleteAll.disabled = true;
});

function isValid(value) {
  return /^[0-9]+$/.test(value);
}

function validatePrice() {
  if (isValid(inputPrice.value)) {
    priceValid = true;
  } else {
    priceValid = false;
  }
}

function validateStockActu() {
  if (isValid(inputStockActu.value)) {
    stockActuValid = true;
  } else {
    stockActuValid = false;
  }
}

function validateStockMin() {
  if (isValid(inputStockMin.value)) {
    stockMinValid = true;
  } else {
    stockMinValid = false;
  }
}

document.getElementById("list").addEventListener("click", function () {
  // divProduct.remove(divList);
  let liste = document.getElementsByClassName("productList");
  console.log(liste);
  let listProduct = localStorage.getItem("products");
  listProduct = JSON.parse(listProduct);
  console.log(listProduct);
  let finalPrice = 0;
  for (let i = 0; i < liste.length; i++) {
    for (let j = 0; j < listProduct.length; j++) {
      if (liste[i].name === listProduct[j].name && liste[i].checked === true) {
        console.log(listProduct[j]);
        finalList.push(listProduct[j]);
        console.log(finalList);
      }
    }
  }
  const title = document.createElement("h3");
  title.textContent = "Liste de course";
  divList.appendChild(title);
  for (product of finalList) {
    displayShoppingList(product);
    if(product.type=="normal"){
      finalPrice += Number(product.price)*(product.stockMin - product.stockActu);
    }else{
      finalPrice += Number(product.price);
    }
  }
  divList.appendChild(listeUl);
  let finalPriceText = document.createElement("p");
  finalPriceText.textContent = "Prix total : " + finalPrice + " €";
  finalPriceText.setAttribute("id", "price");
  divList.appendChild(finalPriceText);
  console.log(finalPrice);
  divList.appendChild(btnReturnList);
  divList.appendChild(btnSaveList);
  this.disabled = true;
  btnDeleteAll.disabled = true;
});

//Retourn à la liste des produits
btnReturnList.addEventListener("click", function () {
  btnAjouter.disabled = false;
  btnDelete.disabled = false;
  btnModifier.disabled = false;
  btnDeleteAll.disabled = false;
  btnShoppingListe.disabled = false;
  btnDisplayList.disabled = false;
  btnListCourses.classList.remove("display");
  sectionProducts.removeChild(divList);
  divProduct.classList.remove("nodisplay");
  listeUl = null;
});

//sauvegarde la liste de courses
btnSaveList.addEventListener("click", function () {
  let finalListString = JSON.stringify(finalList);
  localStorage.setItem("productsToBuy", finalListString);
});

//afficher la liste de courses
btnDisplayList.addEventListener("click", function () {
  let products = JSON.parse(localStorage.getItem("productsToBuy"));
  if(products === null){
    alert('aucune liste de courses enregistrée !');
  }
  for (product of products) {
    displaySavedShoopinList(product);
  }
  if (displayList == false) {
    divProduct.appendChild(title);
    divProduct.appendChild(listeUl);
    finalPriceListText.textContent = finalPriceList + " €";
    divProduct.appendChild(finalPriceListText);
    this.textContent = "retour";
    displayList = true;
  } else {
    divProduct.removeChild(listeUl);
    divProduct.removeChild(title);
    divProduct.removeChild(finalPriceListText);
    finalPriceList = 0;
    listeUl = null;
    displayList = false;
    this.textContent = "Voir la liste de courses";
  }
});