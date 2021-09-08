/*
    GESTION DE STOCK
    JAVASCRIPT FUNCTIONS FILE
    BY ULYSSE VALDENAIRE
    15/08/2021
*/

//fonction qui crée un formulaire pour ajouter un produit
function addProduct(
  valueType,
  valueName,
  valuePrice,
  valueStockActu,
  valueStockMin
) {
  form.appendChild(Title);
  form.appendChild(br);
  form.appendChild(labelType);
  form.appendChild(br6);
  if (valueType == "default") {
    radioDefault.checked = true;
  }
  form.appendChild(radioDefault);
  form.appendChild(defaultTxt);
  form.appendChild(br7);
  if (valueType == "normal") {
    radioNormal.checked = true;
  }
  console.log(valueType);
  form.appendChild(radioNormal);
  form.appendChild(normalTxt);
  // inputID.setAttribute("value", valueID);
  // form.appendChild(inputID);
  form.appendChild(br5);
  form.appendChild(labelName);
  if(valueName == 0){
    valueName="";
    inputName.setAttribute('placeholder', 'Entrez le nom du produit');
  }
 inputName.setAttribute("value", valueName);
  console.log(valueName);
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
  console.log(valueStockActu);
  form.appendChild(inputStockMin);
  form.appendChild(br4);
  form.appendChild(btnValider);
  btnValider.setAttribute("id", "btnValider");
  form.appendChild(btnReset);
  form.setAttribute('class', 'col-8');
  divForm.append(form);
  divForm.setAttribute('class', 'row');
  sectionOptions.appendChild(divForm);
}

//Fonction pour ajouter un objet dans le local storage
function addProductLocalStorage() {
  let product;
  if (radioNormal.checked === true) {
    //on crée un nouvel objet product avec le contenu du formulaire
    product = new Product(
      inputID.value,
      "normal",
      inputName.value,
      inputPrice.value,
      inputStockActu.value,
      inputStockMin.value
    );
  } else {
    product = new Product(
      inputID.value,
      "default",
      inputName.value,
      inputPrice.value,
      0,
      0
    );
  }
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
}

//fonction qui affiche le produit après l'avoir ajouter
function createProduct(product) {
  divProduct.setAttribute("class", "divProduct");
  let checkboxProduct = document.createElement("input");
  checkboxProduct.setAttribute("type", "radio");
  checkboxProduct.setAttribute("name", "products");
  checkboxProduct.setAttribute("class", "checkboxesInput");
  checkboxProduct.setAttribute("name", product.name);
  divProduct.appendChild(checkboxProduct);
  let productLine = document.createElement("label");
  if (product.type === "normal") {
    productLine.textContent =
      product.name +
      " Prix : " +
      product.price +
      " Stock actuel : " +
      product.stockActu +
      " Stock minimal : " +
      product.stockMin;
  } else {
    productLine.textContent = product.name + " Prix : " + product.price;
  }
  productLine.setAttribute("for", product.name);
  productLine.setAttribute("class", "products");
  divProduct.appendChild(productLine);
  const br = document.createElement("br");
  divProduct.appendChild(br);
  divProduct.setAttribute('class', 'col-9');
  divProduct.setAttribute('id', 'divProduct');
  sectionProducts.appendChild(divProduct);
}

//Fonction pour supprimer un produit en particulier
function deleteProduct(add) {
  let allCheckboxesProducts =
    document.getElementsByClassName("checkboxesInput");
  let productToModify;
  let checkbox;
  let index;
  let checkedBox = [];
  for (let i = 0; i < allCheckboxesProducts.length; i++) {
    if (allCheckboxesProducts[i].checked === true) {
      checkedBox.push(allCheckboxesProducts[i]);
    }
  }
  console.log(checkedBox.length);
  if (checkedBox.length != 0) {
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
        if (add === true && listProducts[i].type == "default") {
          addProduct(
         
            listProducts[i].type,
            listProducts[i].name,
            listProducts[i].price
          );
        } else if (add == true && listProducts[i].type == "normal") {
          addProduct(
            listProducts[i].type,
            listProducts[i].name,
            listProducts[i].price,
            listProducts[i].stockActu,
            listProducts[i].stockMin
          );
        }
        listProducts.splice(i, 1);
        localStorage.setItem("products", JSON.stringify(listProducts));
      }
    }
    divProduct.removeChild(checkbox);
    divProduct.removeChild(products[index]);
  } else {
    alert("Vous devez selectionner un produit !");
  }
}

//Fonction qui crée la liste (array) de la liste de course
function createShopList() {
  let listProduct = localStorage.getItem("products");
  if (listProduct === null) {
    alert("Il n'y a pas de produit enregistré");
  } else {
    listProduct = JSON.parse(listProduct);
    console.log(listProduct);
    let listProductsToBuy = [];
    for (let i = 0; i < listProduct.length; i++) {
      if (
        listProduct[i].type === "normal" &&
        listProduct[i].stockActu <= listProduct[i].stockMin
      ) {
        listProductsToBuy.push(listProduct[i]);
      } else if (listProduct[i].type === "default") {
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
  }
}

//Function qui crée la liste de course en html
function createElementList(product) {
  const name = product.name;
  const price = product.price;
  const radioProduct = document.createElement("input");
  radioProduct.setAttribute("type", "checkbox");
  radioProduct.setAttribute("name", product.name);
  radioProduct.setAttribute("class", "productList");
  divList.appendChild(radioProduct);
  const productToBuy = document.createElement("label");
  if (product.type === "normal") {
    let number = product.stockMin - product.stockActu;
    if (number === 0) {
      number = 1;
    }
    productToBuy.textContent = number + "  " + name + " prix : " + price + " €";
  } else {
    productToBuy.textContent = name + "  " + price;
  }
  divList.appendChild(productToBuy);
  sectionProducts.appendChild(divList);
}

function displayShoppingList(product){
  const name = product.name;
  const price = product.price;
  let productToBuy = document.createElement('li');
  productToBuy.setAttribute("class", 'elementList');
  if (product.type === "normal") {
    let number = product.stockMin - product.stockActu;
    if (number === 0) {
      number = 1;
    }
    productToBuy.textContent = number + "  " + name + " prix : " + price + " €";
  } else {
    productToBuy.textContent = name + "  " + price + " €";
  }
  listeUl.appendChild(productToBuy);
}
