const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionariesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')


let data =[];


async function getRandomUser (){

    let res = await fetch('https://randomuser.me/api');
    let data = await res.json();
    let user = data.results[0];
    let newuser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()* 1000000)
    }
    addData(newuser)
}

function addData (obj){
data.push(obj)
updateDOM()
}

function updateDOM(providedData = data){
    main.innerHTML = '<h2>Person <strong>Wealth</strong></h2>'
    providedData.forEach((item)=>{
        const element = document.createElement('div');
        element.classList.add('person')
        element.innerHTML=`<strong>${item.name}</strong> ${formatNumber(item.money)}`
        main.appendChild(element)
    })
}

function formatNumber(num){
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//Event Listeners
getRandomUser()
getRandomUser()
addUserBtn.addEventListener('click', getRandomUser)