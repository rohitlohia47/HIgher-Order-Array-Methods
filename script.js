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

const doubleMoney = () =>{
    let double = data.map((item)=>{
        return{name: item.name,
        money: 2*item.money}
    })
    updateDOM(double)
    data = [...double]


}

const onlyMillion = () =>{
   let millioner= data.filter((item)=>{
        return item.money>1000000
    })
    updateDOM(millioner)
}

const sortByRichest = () =>{
    data.sort(function (a, b) {
        return b.money - a.money;
      });

      updateDOM(data)

   
      
}

const calculateWeath = () =>{

   let wealtharr = data.map((item)=>item.money)
   const reducer = (acc, val)=>{
       return acc+val
   }

   let totalWealth=wealtharr.reduce(reducer)
   console.log(totalWealth);

   if(document.querySelector('.wealth')==null){

       const element = document.createElement('div');
       element.classList.add('wealth')
       element.innerHTML=`<strong>Total Wealth</strong> ${formatNumber(totalWealth)}`
       main.appendChild(element)
   }
  


}

//Event Listeners
getRandomUser()
getRandomUser()
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
showMillionariesBtn.addEventListener('click', onlyMillion)
sortBtn.addEventListener('click', sortByRichest)
calculateWealthBtn.addEventListener('click', calculateWeath)