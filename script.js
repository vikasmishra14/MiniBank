'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'vikas mishra',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-07-05T17:01:17.194Z',
    '2024-07-11T23:36:17.929Z',
    '2024-07-12T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'hi-IN', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2024-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

//ui repaint
const updateUI=function(acc){
  
    // display movements according to user
    displayUi(acc)

    // display balance of curr user
    displayBl(acc)

    // display the summary of deposit and withdral
     summary(acc)
}

//date for mov 
const formateDate=function(date,locale){
 const callDate=function(date1,date2){
return  Math.round(Math.abs(date1-date2)/(1000*60*60*24))
 }
  // Check if the date is valid
  if (isNaN(date)) {
    return 'Invalid Date';
}
 const dayPassed=callDate(new Date(),date)
 if(dayPassed===0)return 'Today';
 if(dayPassed===1)return 'Yesterday';
 if(dayPassed<=7)return `${dayPassed} days ago`;
return new Intl.DateTimeFormat(locale).format(date)
}

//format currency
const formatCurrency=function(value,locale,currency){
  const result= new Intl.NumberFormat(locale,{
    style:'currency',
    currency:currency
  }).format(value)
  return result;
}
const displayUi = function(acc, sort = false) {
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  const clutterArray = [];
  containerApp.style.opacity = 100;
     // date
const date=new Date(); 
let local=navigator.language
const option={
  day:'numeric',
  month:'long',
  year:'numeric',
  hour:'numeric',
  minute:'numeric',
  weekday:"long"
}
labelDate.textContent=new Intl.DateTimeFormat(acc.locale,option).format(date)

  movs.forEach(function(element, i) {
      const date = new Date(acc.movementsDates[i]);
      const displayDate = formateDate(date, acc.locale); 
      const formatcurrmov=formatCurrency(element,acc.locale,acc.currency)
      const type = element > 0 ? 'deposit' : 'withdrawal';

      const row = `
          <div class="movements__row">
              <div class="movements__type movements__type--${type}">${type}</div>
              <div class="movements__date">${displayDate}</div>
              <div class="movements__value">${formatcurrmov}</div>
          </div>`;
      
      // Prepend each new row to the beginning of the array
      clutterArray.unshift(row);
  });

  // Join the array into a single string and set the innerHTML
  containerMovements.innerHTML = clutterArray.join('');
};

// const displayUi=function(acc,sort=false){
//   const movs=sort?acc.movements.slice().sort((a,b)=>a-b):acc.movements;
//   let clutter='';
//   containerApp.style.opacity=100;
//   movs.forEach(function(element,i){
//  const date= new Date( acc.movementsDates[i]);
// const displayDate=formateDate(date,acc.locale);
//       const type=element>0?'deposit':'withdrawal';
//      clutter+=   <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${type}</div>
//         <div class="movements__date">${displayDate}</div>
//         <div class="movements__value">${element}€</div>
//       </div> 
//       containerMovements.innerHTML=clutter;
    
//   }) 
//   }
const displayBl=function(acc){
     acc.balance= acc.movements.reduce((sum,elem)=>sum+elem ,0); 
    labelBalance.textContent= formatCurrency(acc.balance,acc.locale,acc.currency);
}


 let currUser,timer;
btnLogin.addEventListener('click', function(e) {
    e.preventDefault(); 
   currUser= accounts.find((acc)=>acc.username===inputLoginUsername.value)
   if(currUser.pin===Number(inputLoginPin.value)){
    labelWelcome.textContent=`Welcome ${currUser.owner}`
if(timer)clearInterval(timer);
timer=startLogoutTimer()
   updateUI(currUser); 
   }
   inputLoginUsername.value =inputLoginPin.value ='';
   inputLoginPin.blur();
    
});


const createusername=function(accounts){ 
    accounts.forEach((acc)=>{
     acc.username=   acc.owner.toLowerCase().split(' ').map((acc)=>  acc[0] ).join('') })
}
createusername(accounts)
 
const summary= function(acc){
   let deposit= acc.movements.filter((e)=>e>0).reduce((sum,e)=>sum+e)
   labelSumIn.textContent=formatCurrency(deposit,acc.locale,acc.currency);;

   let withdral= acc.movements.filter((e)=>e<0). reduce((sum,e)=>sum+e,0)
   labelSumOut.textContent=formatCurrency(Math.abs(withdral),acc.locale,acc.currency);

   let interst=acc.movements.filter((e)=>e>0).map((e)=>e*1.2/100).reduce((sum,e)=>sum+e,0)
   labelSumInterest.textContent=formatCurrency(interst.toFixed(2,0),acc.locale,acc.currency);;
}
// function for logout
const startLogoutTimer=function(){
  const tick=function( ){
    const min=String(Math.trunc(time/60)).padStart(2,0);
    const sec=String(Math.trunc(time% 60)).padStart(2,0);
    labelTimer.textContent=`${min}:${sec}`;
    if(time===0){
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    time--;
  }
  let time=300;
  tick()
  const timer=setInterval(tick,1000);
  return timer;
}


// sort btn
btnSort.addEventListener('clcik',function(e){
    e.preventDefault();
  
})


// transfer 
btnTransfer.addEventListener('click',function(e){
    e.preventDefault();
   const amt= Number(inputTransferAmount.value)
    const found=accounts.find((acc)=>{
       return acc.username===inputTransferTo.value;
    })
if(amt>0 && amt<=currUser.balance && found?.username !==currUser.username ){
    currUser.movements.push(-amt)
    found.movements.push(amt )
    found.movementsDates.push(new Date().toISOString())
    currUser.movementsDates.push(new Date().toISOString())
    inputTransferTo.value=inputTransferAmount.value='';
    updateUI(currUser)
}
})

// loan
btnLoan.addEventListener('click',function(e){
    e.preventDefault();
    const amt=Math.floor(Number(inputLoanAmount.value));
if(amt>0 && currUser.movements.some((mov)=>amt>=mov*0.1)){
    currUser.movements.push(amt); 
    inputLoanAmount.value='';
    currUser.movementsDates.push(new Date().toISOString())
    updateUI(currUser)
}
})

let sorted=false;
btnSort.addEventListener('click',function(e){
    e.preventDefault();
    displayUi(currUser,!sorted)
    sorted=!sorted;
})

//close account
btnClose.addEventListener('click',function(e){
  e.preventDefault()
  if(inputCloseUsername.value===currUser.username && Number(inputClosePin.value)=== currUser.pin){
    const index=accounts.findIndex((acc)=>acc.username===currUser.username)
    accounts.splice(index,1);
    containerApp.style.opacity=0;
    labelWelcome.textContent='Log in to get started';
    inputClosePin.value=inputCloseUsername.value='';
  }
})

 //fake user login
//  currUser=account1;
//  updateUI(currUser);
//  containerApp.style.opacity=100;

// const day=`${date.getDate()}`.padStart(2,0);
// const month= `${date.getMonth()+1}`.padStart(2,0);
// const year=date.getFullYear();
// const hour=`${date.getHours()}`.padStart(2,0);
// const min=`${date.getMinutes()}`.padStart(2,0);
// const dateNow=`${day}/${month}/${year}  ${hour}:${min}`
// labelDate.textContent=dateNow

/////////////////////////////////////////////////
// LECTURES


const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]); 

/////////////////////////////////////////////////