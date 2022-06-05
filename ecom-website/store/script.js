var cartBtn = document.getElementById('cart-top');

cartBtn.addEventListener('click', () => {
    const sideCart= document.getElementById('cart-float');
    sideCart.style.display = 'block';
});

var cartClose = document.getElementById('cancel');

cartClose.addEventListener('click', () => {
    const sideCart= document.getElementById('cart-float');
    sideCart.style.display = 'none';
});


const parentContainer= document.getElementById('container-parent');
const addBtn = document.getElementById('add-btn');


parentContainer.addEventListener('click', (e) => {
    const cartItems = document.getElementById('cart-items');

    if (e.target.id === 'add-btn') {
        const id = e.target.parentNode.id; 
        const name = document.querySelector(`#${id} h4`).innerText;
        const image = document.querySelector(`#${id} img`).src;
        const price = document.querySelector(`#${id} label`).innerText;
        

        const div =  document.createElement('div');
        div.setAttribute('class', 'cart-div');
        div.innerHTML= `
        <span><img class='cart-class-img' src=${image}>${name}</span>
        <span>1</span>
        <span>${price}</span>`
       
        cartItems.append(div);

        /*----------notification------------ */

        const notifContainer = document.querySelector('.notif-div');
        const notif = document.createElement('div');
        // notif.setAttribute('class', 'notif-div');
        notif.innerText = `${name} has been added to cart`;
        notifContainer.append(notif);
        parentContainer.append(notifContainer);

        setTimeout(() => {
            notif.remove();
        }, 1000);
    }
})

