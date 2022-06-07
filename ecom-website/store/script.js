


var cartBtn = document.getElementById('cart-top');

cartBtn.addEventListener('click', () => {
    const sideCart = document.getElementById('cart-float');
    sideCart.style.display = 'block';
});

var cartClose = document.getElementById('cancel');

cartClose.addEventListener('click', () => {
    const sideCart = document.getElementById('cart-float');
    sideCart.style.display = 'none';
});


const parentContainer = document.getElementById('container-parent');
const addBtn = document.getElementById('add-btn');


parentContainer.addEventListener('click', (e) => {
    const cartItems = document.getElementById('cart-items');

    if (e.target.id === 'add-btn') {
        const id = e.target.parentNode.id;
        // console.log(id)
        const name = document.getElementById(`${id}-h4`).innerText;
        const image = document.getElementById(`${id}-img`).src;
        const price = document.getElementById(`${id}-label`).innerText;

        if (document.querySelector(`#in-cart-${id}`)) {
            alert('Item is already in the cart');
            return;
        }

        const div = document.createElement('div');
        div.setAttribute('class', 'cart-div');
        div.setAttribute('id', `in-cart-${id}`);
        div.innerHTML = `
        <span><img class='cart-class-img' src=${image}>
        <span>${name}</span></span>  
        <span>$${price}</span>
        <span><input type='text' value='1'>
        <button id='cart-remove-btn'>REMOVE</button></span>`

        cartItems.append(div);




        axios.post('http://localhost:3000/cart', {'id': id})
            .then(response => {
                console.log(response.data);
                
                /*----------notification------------ */
                const notifContainer = document.querySelector('.notif-div');
                const notif = document.createElement('div');
                notif.innerText = `${name} has been added to cart`;
                notifContainer.append(notif);
                parentContainer.append(notifContainer);
        
                setTimeout(() => {
                    notif.remove();
                }, 1000);

            })
            .catch(err => console.log("err"));


    }
})



document.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/products')
        .then(response => {
            console.log(response.data);
            for (var i=0; i<response.data.length; i++) {
                showProducts(response.data[i]);
            };
        })
        .catch(err => console.log(err));
    
    axios.get('http://localhost:3000/cart')
    .then(response => {
        console.log(response.data);
        for (var i=0; i<response.data.length; i++) {
            showCartProducts(response.data[i]);
        };
    })
    .catch(err => console.log(err));
});

function showProducts(product) {
    
    const div = document.getElementById('product');
    div.setAttribute('id', `${product.id}`);
    div.innerHTML = `
    <h4 id='${product.id}-h4'>${product.title}</h4>
    <img id='${product.id}-img' src="${product.imageUrl}"
        alt="album cover">
    <br>
    <label id='${product.id}-label'>$${product.price}</label>
    <button class="add-btn" id="add-btn">ADD TO CART</button>`;
}

function showCartProducts(product) {
    const cartItems = document.getElementById('cart-items');
    const div = document.createElement('div');
    div.setAttribute('class', 'cart-div');
    div.setAttribute('id', `in-cart-${product.id}`);
    div.innerHTML = `
        <span><img class='cart-class-img' src=${product.imageUrl}>
        <span>${product.title}</span></span>  
        <span>$${product.price}</span>
        <span><input type='text' value='1'>
        <button id='cart-remove-btn'>REMOVE</button></span>`

    cartItems.append(div);
}