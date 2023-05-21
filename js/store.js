let cart = []; // Variable on s'emmagatzemen els productes que s'afegeixen al carro
let cartTotal = 0; //Import total a pagar del carro
const cartDom = document.querySelector(".cart");
const addtocartBtnDom = document.querySelectorAll('[data-action="add-to-cart"]');

/*
    Bloc de codi que afegeix un "event" quan es fa clic sobre els botons d'afegir al carro de compra
    Quan es fa clic sobre el botó, guarda la imatge, el nom, el preu i la quantitat del producte
    seleccionat en una variable "product", que després és afegida al carro
*/
addtocartBtnDom.forEach(addtocartBtnDom => {
    addtocartBtnDom.addEventListener("click", () => {
      const productDom = addtocartBtnDom.parentNode;
      const product = {
        img: productDom.querySelector(".product-img").getAttribute("src"),
        name: productDom.querySelector(".product-name").innerText,
        price: productDom.querySelector(".product-price").innerText,
        quantity: 1
     };

  /*
    Si el producte seleccionat no està al carro, afegeix els elements necessasris per mostrar-lo al DOM
    amb els valors de la variable "product", agafats al fer clic.
  */
  const IsinCart = cart.filter(cartItem => cartItem.name === product.name).length > 0;
  if (IsinCart === false) {
    cartDom.insertAdjacentHTML("beforeend",`
    <div class="cart-item">
        <img src="${product.img}" alt="${product.name}">
        <p class="cart-item-name">${product.name}</p>
        <p class="cart-item-price">${product.price}</p>
        <div class="cart-buttons">
            <button data-action="decrease-item">-</button>
            <p class="cart-item-quantity">${product.quantity}</p>
            <button data-action="increase-item">+</button>
            <button class="deleteBtn" data-action="remove-item">X</button>
        </div>
    </div>
    `);
  
    //Afageix la barra amb els botons per netejar el carro i per pagar
    if(document.querySelector('.cart-checkout') === null){
        document.querySelector("#paypal").classList.toggle("display-toggle");
        cartDom.insertAdjacentHTML("afterend",  `
        <div class="cart-checkout">
            <button data-action="clear-cart">Clear Cart</button>
            <p>Total: <span class="pay"></span></p>
        </div>
    `); }

      //Un cop un producte és afegit al carro, desactiva el botó del producte en concret
      addtocartBtnDom.innerText = "In cart";
      addtocartBtnDom.disabled = true;
      cart.push(product);
  
      const cartItemsDom = cartDom.querySelectorAll(".cart-item");
      cartItemsDom.forEach(cartItemDom => {
  
      if (cartItemDom.querySelector(".cart-item-name").innerText === product.name) {
  
        cartTotal += parseInt(cartItemDom.querySelector(".cart-item-quantity").innerText) 
        * parseInt(cartItemDom.querySelector(".cart-item-price").innerText);
        document.querySelector('.pay').innerText = cartTotal + " €";
  
        // Bloc de codi per incrementar número d'un producte al carro
        cartItemDom.querySelector('[data-action="increase-item"]').addEventListener("click", () => {
          cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
              cartItemDom.querySelector(".cart-item-quantity").innerText = ++cartItem.quantity;
              cartItemDom.querySelector(".cart-item-price").innerText = parseInt(cartItem.quantity) *
              parseInt(cartItem.price);
              cartTotal += parseInt(cartItem.price)
              document.querySelector('.pay').innerText = cartTotal + " €";
            }
          });
        });
  
        // Bloc de codi per incrementar número d'un producte al carro
        cartItemDom.querySelector('[data-action="decrease-item"]').addEventListener("click", () => {
          cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
              if (cartItem.quantity > 1) {
                cartItemDom.querySelector(".cart-item-quantity").innerText = --cartItem.quantity;
                cartItemDom.querySelector(".cart-item-price").innerText = parseInt(cartItem.quantity) *
                parseInt(cartItem.price);
                cartTotal -= parseInt(cartItem.price)
                document.querySelector('.pay').innerText = cartTotal + " €";
              }
            }
          });
        });
  
        // Bloc de codi per eliminar un producte del carro
        cartItemDom.querySelector('[data-action="remove-item"]').addEventListener("click", () => {
          cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
                cartTotal -= parseInt(cartItemDom.querySelector(".cart-item-price").innerText);
                document.querySelector('.pay').innerText = cartTotal + " €";
                cartItemDom.remove();
                cart = cart.filter(cartItem => cartItem.name !== product.name);
                addtocartBtnDom.innerText = "Add to cart";
                addtocartBtnDom.disabled = false;
            }
            if(cart.length < 1){
              document.querySelector('.cart-checkout').remove();
              document.querySelector("#paypal").classList.add("display-toggle");
            }
          });
        });
  
        // Bloc de codi per netejar el carro
        document.querySelector('[data-action="clear-cart"]').addEventListener("click" , () => {
          cartItemDom.remove();
          cart = [];
          cartTotal = 0;
          document.querySelector("#paypal").classList.add("display-toggle");
          if(document.querySelector('.cart-checkout') !== null){
            document.querySelector('.cart-checkout').remove();
          }
          addtocartBtnDom.innerText = "Add to cart";
          addtocartBtnDom.disabled = false;
        });
      }
    });
  }
  });
  });

  //Codi de processament de comandes de PayPal amb el SDK de Paypal. Per a la fase de desenvolupament, crea una conmanda
  //amb el valor de 0.01€. En versió de producció, es pot assignar el valor total del carro al valor
  //de la comanda de PayPal.
  paypal
  .Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
            {
                amount: {
                    value: cartTotal.toString(),
                },
            },
        ],

      })
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details){
        alert("Transactiono completed by " + details.payer.name.given_name)
      })
    },
  })
  .render("#paypal")


/*
Bloc de codi que controla el funcionament del "burger menú" mitjançant una classe "show" que s'afegeix
o s'elimina cada vegada que es fa clic sobre el botó del menú.
*/
const theBody = document.querySelector("body");
const openNav = document.querySelector(".menu-bar button");
const closeNav = document.querySelector(".close-nav button");
const Navbar = document.querySelector(".navbar");

//Amagar continguts quan s'obre el burger menu
const main = document.querySelector("main");
const footer = document.querySelector("footer");
function showHide() {
    Navbar.classList.toggle("show");
    main.classList.toggle("display");
    footer.classList.toggle("display");
}
openNav.onclick = showHide;
closeNav.onclick = showHide;














