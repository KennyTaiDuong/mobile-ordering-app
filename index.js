import { menuArray } from "./data.js"

const menuContainer = document.getElementById("menu-container")
const checkoutContainer = document.getElementById("checkout-container")
const orderContainer = document.getElementById("order-container")
const totalPrice = document.getElementById("total-price")
const checkoutBtn = document.getElementById("checkout-btn")
const modal = document.getElementById("modal")
const modalContainer = document.getElementById("modal-container")
const xBtn = document.getElementById("close-btn")
const payBtn = document.getElementById("pay-btn")
const message = document.getElementById("message")
const messageText = document.getElementById("message-text")
let cartList = []

document.addEventListener("click", function(e){
    if (e.target.dataset.add){
        if (checkoutContainer.style.display === "none"){
            checkoutContainer.style.display = "flex"
        }
        cartList.push(addItem(e.target.id))
        renderCart()
        getTotalPrice()
        message.style.display = "none"
    }
    else if (e.target.dataset.remove){
       removeItem(e.target.dataset.remove)
       renderCart()
       getTotalPrice()
       checkArray()
    }
    else if (e.target.id === checkoutBtn.id){
        modal.style.display = "block"
        modalContainer.style.display = "flex"
    }
    else if (e.target.id === xBtn.id){
        modal.style.display = "none"
        modalContainer.style.display = "none"
        resetForms()
    }
})

document.addEventListener("submit", function(e){
    e.preventDefault()
    cartList = []
    checkoutContainer.style.display = "none"
    modal.style.display = "none"
    modalContainer.style.display = "none"
    message.style.display = "flex"
    renderMsg()
    resetForms()
})

function renderMenu(){
    let menuItems = ""
    menuArray.forEach(function(item){
        menuItems += `
    <div class="items-container">
        <p class="item-emoji">${item.emoji}</p>
        <div class="item-text">
            <h3>${item.name}</h3>
            <p class="ingredients">${item.ingredients}</p>
            <h4>$${item.price}</h4>
        </div>
        <button class="add-btn" id="${item.id}" data-add="${item.id}">+</button>
    </div>`
    })
    menuContainer.innerHTML = menuItems
    checkoutContainer.style.display = "none"
}

function addItem(itemId){
    let newObject = {}
    menuArray.forEach(function(obj){
        if (+itemId === obj.id) {
            newObject.arrayNum = `item-${cartList.length}`
            newObject.name = obj.name
            newObject.id = obj.id
            newObject.ingredients = obj.ingredients
            newObject.price = obj.price
            newObject.emoji = obj.emoji
        }
    })
    return newObject
}

function renderCart(){
    let htmlString = ""
    for (let i = 0; i < cartList.length; i++){
        htmlString += `
        <div class="item-detail">
            <p class="item-name"><span class="item-num">${i + 1}.</span> ${cartList[i].name}</p>
            <button class="remove-btn" id="item-${i}" data-remove="item-${i}">remove</button>
            <p class="price">$${cartList[i].price}</p>
        </div>`
    }
    orderContainer.innerHTML = htmlString
}

function getTotalPrice(){
    let total = 0
    cartList.forEach(function(item){
        total += item.price
    })
    totalPrice.innerText = `$${total}`
}

function removeItem(itemId){
    let newCart = cartList.filter(function(item){
        return (item.arrayNum != itemId)
    })
    
    for (let i = 0; i < newCart.length; i++){
        newCart[i].arrayNum = `item-${i}`
    }
    cartList = newCart
}

function checkArray(){
    if (cartList.length === 0){
        checkoutContainer.style.display = "none"
    }
}

function resetForms(){
    document.forms["card-info"]["name"].value = ""
    document.forms["card-info"]["number"].value = ""
    document.forms["card-info"]["cvv"].value = ""
}

function renderMsg(){
    const name = document.forms["card-info"]["name"].value
    messageText.innerText = `Thanks, ${name}! Hope you enjoy your grub!`
}

renderMenu()