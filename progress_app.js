//// messy versions & notes

/* 1. Zero everything out
2. Enter a description and value 
  2-1. console.log the description and value and make sure they're in the same array item 
  2-2. Needs a date
  2-3. Needs an id, start with 1 and increment plus by 1
  2-4. Push all items into an array
    2-4-1. If negative value, push into expense list
    2-4-2. If positive value, push into income list
3. Get the values from the form inputs
4. Add the transactions to the DOM
  4-1. negative list to the expense list
  4-2. positive list to the income list
5. Delete the transactions
  5-1. delete from DOM
  5-2. delete from array 
6. Math
  6-1. Percentage in the expense is of total income (single Item Expense / total income)
  6-2. Total expense has percentage as well (total expense / total income)
  6 -3. Available budget (total income - total expenses)
  */

///before event listeners

const budgetMonth = document.querySelector('.budget__title--month');
const finalNumber = document.querySelector('.budget__value');
const finalIncomeNumber = document.querySelector('.budget__income--value');
const finalExpenseNumber = document.querySelector('.budget__expenses--value');
const finalExpensePercent = document.querySelector('.budget__expenses--percentage');
const inputForm = document.querySelector('.add__container');
const descriptionInput = inputForm.querySelector('.add__description');
const valueInput = inputForm.querySelector('.add__value');
const transactionSubmit = document.querySelector('.add__btn');
const incomeList = document.querySelector('.income__list');
const expenseList = document.querySelector('.expenses__list');

let transactionID = 1;

function titleMonthYear(){
  const date = new Date(); 
  const titleDate = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
  return titleDate;
}

function itemDate(){
  const secDate = new Date();
  const itemDate = secDate.toLocaleString('default', { month: 'short' }) + ' ' + secDate.getDate() + ', ' + secDate.getFullYear();
  return itemDate;
}

window.onload = function () {
  budgetMonth.innerHTML = titleMonthYear();
  finalNumber.innerHTML = `$0.00`;
  finalIncomeNumber.innerHTML = `$0.00`;
  finalExpenseNumber.innerHTML = `$0.00`;
  finalExpensePercent.innerHTML = `0%`;
  incomeList.innerHTML = ``;
  expenseList.innerHTML = ``;
}

class Transaction{
  constructor(description, moneyValue){
    this.description = description;
    this.amount = moneyValue;
    this.date = itemDate();
    this.itemID = transactionID++;
  }
}

class TransactionList{
  
  constructor(){
    this.incomeList = [];
    this.expenseList = [];
    this.id;
  }

  addNewTransaction(description, moneyValue){
    if(moneyValue > 0){
      this.incomeList.push(new Transaction(description, moneyValue));
    } else if(moneyValue < 0){
      this.expenseList.push(new Transaction(description, moneyValue));
    }
  }

  removeTransaction(itemID){
    this.incomeList = this.incomeList.filter(item => item.itemID !== itemID);
    this.expenseList = this.expenseList.filter(item => item.itemID !== itemID);
  }

  print(){
    console.log(this.incomeList);
    console.log(this.expenseList);
  }
}

const budgetItems = new TransactionList();

budgetItems.addNewTransaction('Payday',400);
budgetItems.addNewTransaction('Food', -40);
budgetItems.addNewTransaction('Money from Mom', 50);
budgetItems.addNewTransaction('Food', -12.22);
budgetItems.removeTransaction(3);
budgetItems.removeTransaction(2);
budgetItems.print();

// inputForm.addEventListener('submit', function(e){
//   e.preventDefault();
//   console.log(descriptionInput.value);
//   console.log(valueInput.value);
//   budgetItems.addNewTransaction('Payday',400);

//   descriptionInput.value = '';
//   valueInput.value = '';
// })


///// After evenet listeners


const budgetMonth = document.querySelector('.budget__title--month');
const finalNumber = document.querySelector('.budget__value');
const finalIncomeNumber = document.querySelector('.budget__income--value');
const finalExpenseNumber = document.querySelector('.budget__expenses--value');
const finalExpensePercent = document.querySelector('.budget__expenses--percentage');
const inputForm = document.querySelector('.add__container');
const descriptionInput = inputForm.querySelector('.add__description');
const valueInput = inputForm.querySelector('.add__value');
const transactionSubmit = document.querySelector('.add__btn');
const incomeList = document.querySelector('.income__list');
const expenseList = document.querySelector('.expenses__list');

let transactionID = 1;

function titleMonthYear() {
  const date = new Date();
  const titleDate = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
  return titleDate;
}

function itemDate() {
  const secDate = new Date();
  const itemDate = secDate.toLocaleString('default', { month: 'short' }) + ' ' + secDate.getDate() + ', ' + secDate.getFullYear();
  return itemDate;
}

window.onload = function () {
  budgetMonth.innerHTML = titleMonthYear();
  finalNumber.innerHTML = `$0.00`;
  finalIncomeNumber.innerHTML = `$0.00`;
  finalExpenseNumber.innerHTML = `$0.00`;
  finalExpensePercent.innerHTML = `0%`;
  incomeList.innerHTML = ``;
  expenseList.innerHTML = ``;
}

class Transaction {
  constructor(description, moneyValue) {
    this.description = description;
    let string = moneyValue.replace('-', '');
    this.amount = string;
    this.date = itemDate();
    this.itemID = transactionID++;
  }
}

class TransactionList {
  constructor() {
    this.incomeArr = [];
    this.expenseArr = [];
    this.id = 10;
  }

  print() {
    console.table(this.incomeArr);
    console.table(this.expenseArr);
  }

  addNewTransaction(description, moneyValue) {
    if (description !== '' || moneyValue !== '') {
      if (moneyValue > 0) {
        this.incomeArr.push(new Transaction(description, moneyValue));
      } else if (moneyValue < 0) {
        this.expenseArr.push(new Transaction(description, moneyValue));
      }
    }
    this.UI();
  }

  removeTransaction(itemID) {
    // this.incomeArr = this.incomeArr.filter(item => item.itemID !== itemID);
    // this.expenseArr = this.expenseArr.filter(item => item.itemID !== itemID);

    // this.incomeArr = this.incomeArr.filter(e => {
    //   return e['data-transaction-id'] !== itemID;
    // })

    console.log('Delete the ' + itemID)

    // const index = this.incomeArr.indexOf(this.itemID);
    // if (index > -1) {
    //   this.incomeArr.splice(index, 1);
    // }

    // if(this.incomeArr)


    // for (let i = itemID; i < this.incomeArr.length; i++) {
    //   if (this.incomeArr[i] === itemID) {
    //     console.log('bitch');
    //   }
    // }

    // const removed = this.incomeArr.splice(itemID);

    // return removed;

    let newitemID = parseInt(itemID);

    this.incomeArr = this.incomeArr.filter(item => item.newitemID !== newitemID);
    this.expenseArr = this.expenseArr.filter(item => item.newitemID !== newitemID);
    
    console.table(this.incomeArr);
  }

  incomeTotal(){
    let incomeFinal = 0;
    this.incomeArr.forEach((a) =>{
      incomeFinal += a.price;
    })
    return incomeFinal.toFixed(2);
  }

  UI() {
    // console.log(this.incomeArr);
    // console.log(this.expenseArr);
    incomeList.innerHTML = '';
    this.incomeArr.forEach(function (item) {
      incomeList.insertAdjacentHTML('afterbegin', `<div class="item" data-transaction-id="${item.itemID}">
      <div class="item__description">${item.description}</div>
      <div class="right">
        <div class="item__value">+ $${item.amount}</div>
        <div class="item__delete">
          <button class="item__delete--btn">
            <i class="ion-ios-close-outline"></i>
          </button>
        </div>
      </div>
      <div class="item__date">${item.date}</div>
    </div>`);
    })

    expenseList.innerHTML = '';
    this.expenseArr.forEach(function (exItem) {
      expenseList.insertAdjacentHTML('afterbegin', `<div class="item" data-transaction-id="${exItem.itemID}">
            <div class="item__description">${exItem.description}</div>
            <div class="right">
              <div class="item__value">- $${exItem.amount}</div>
              <div class="item__percentage">52%</div>
              <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
            </div>
            <div class="item__date">${exItem.date}</div>
          </div>`);
    })
  }
}

const budgetItems = new TransactionList();


inputForm.addEventListener('submit', function (e) {
  budgetItems.addNewTransaction(descriptionInput.value, valueInput.value);

  descriptionInput.value = '';
  valueInput.value = '';
  budgetItems.print();

  e.preventDefault();
})

document.addEventListener('click', function (e) {
  if (e.target.className === 'ion-ios-close-outline') {
    // console.log(e.target.className);
    const transactionItem = e.target.parentElement.parentElement.parentElement.parentElement;
    const transactionID = transactionItem.getAttribute('data-transaction-id');
    console.log(transactionID);
    budgetItems.removeTransaction(transactionID);
    budgetItems.UI();

  }
})



//////

////// Deleting working and numbers on DOM

const budgetMonth = document.querySelector('.budget__title--month');
const finalNumber = document.querySelector('.budget__value');
const finalIncomeNumber = document.querySelector('.budget__income--value');
const finalExpenseNumber = document.querySelector('.budget__expenses--value');
const finalExpensePercent = document.querySelector('.budget__expenses--percentage');
const inputForm = document.querySelector('.add__container');
const descriptionInput = inputForm.querySelector('.add__description');
const valueInput = inputForm.querySelector('.add__value');
const transactionSubmit = document.querySelector('.add__btn');
const incomeList = document.querySelector('.income__list');
const expenseList = document.querySelector('.expenses__list');

let transactionID = 1;

function titleMonthYear() {
  const date = new Date();
  const titleDate = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
  return titleDate;
}

function itemDate() {
  const secDate = new Date();
  const itemDate = secDate.toLocaleString('default', { month: 'short' }) + ' ' + secDate.getDate() + ', ' + secDate.getFullYear();
  return itemDate;
}

window.onload = function () {
  budgetMonth.innerHTML = titleMonthYear();
  finalNumber.innerHTML = `$0.00`;
  finalIncomeNumber.innerHTML = `+ $0.00`;
  finalExpenseNumber.innerHTML = `- $0.00`;
  finalExpensePercent.innerHTML = `0%`;
  incomeList.innerHTML = ``;
  expenseList.innerHTML = ``;
}

class Transaction {
  constructor(description, moneyValue) {
    this.description = description;
    let string = parseInt(moneyValue.replace('-', ''));
    this.amount = string.toFixed(2);
    this.date = itemDate();
    this.itemID = transactionID++;
  }
}

class TransactionList {
  constructor() {
    this.incomeArr = [];
    this.expenseArr = [];
    this.id = 10;
  }

  print() {
    console.table(this.incomeArr);
    console.table(this.expenseArr);
  }

  addNewTransaction(description, moneyValue) {
    if (description !== '' || moneyValue !== '') {
      if (moneyValue > 0) {
        this.incomeArr.push(new Transaction(description, moneyValue));
      } else if (moneyValue < 0) {
        this.expenseArr.push(new Transaction(description, moneyValue));
      }
    }
    this.UI();
    this.incomeTotal();
    this.expenseTotal();
    this.finalBudget();
  }

  removeTransaction(itemID) {
    this.incomeArr = this.incomeArr.filter(item => item.itemID !== itemID);
    this.expenseArr = this.expenseArr.filter(item => item.itemID !== itemID);
    
    this.UI();
    this.incomeTotal();
    this.expenseTotal();
    this.finalBudget();
  }

  UI() {
    incomeList.innerHTML = '';
    this.incomeArr.forEach(function (item) {
      incomeList.insertAdjacentHTML('afterbegin', `<div class="item" data-transaction-id="${item.itemID}">
      <div class="item__description">${item.description}</div>
      <div class="right">
        <div class="item__value">+ $${item.amount}</div>
        <div class="item__delete">
          <button class="item__delete--btn">
            <i class="ion-ios-close-outline"></i>
          </button>
        </div>
      </div>
      <div class="item__date">${item.date}</div>
    </div>`);
    })

    expenseList.innerHTML = '';
    this.expenseArr.forEach(function (exItem) {
      expenseList.insertAdjacentHTML('afterbegin', `<div class="item" data-transaction-id="${exItem.itemID}">
            <div class="item__description">${exItem.description}</div>
            <div class="right">
              <div class="item__value">- $${exItem.amount}</div>
              <div class="item__percentage">52%</div>
              <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
            </div>
            <div class="item__date">${exItem.date}</div>
          </div>`);
    })
  }

  incomeTotal(){
    let incomeTotal = 0;
    this.incomeArr.forEach((i) => {
      incomeTotal += i.amount;
    })
    let string = parseInt(incomeTotal);
    let incomeFinal = string;
    finalIncomeNumber.textContent = '+ $' + incomeFinal.toFixed(2);
    // finalIncomeNumber.textContent = '+ $' + incomeFinal;
  }

  expenseTotal(){
    let expenseTotal = 0;
    this.expenseArr.forEach(function(ex){
      expenseTotal += ex.amount;
    })
    let expenseFinal = parseInt(expenseTotal);
    finalExpenseNumber.textContent = '- $' + expenseFinal.toFixed(2);
  }

  finalBudget(){
    let incomeTotal = 0;
    let expenseTotal = 0;

    this.incomeArr.forEach(function(i){
      incomeTotal += i.amount;
    })
    this.expenseArr.forEach(function(ex){
      expenseTotal += ex.amount;
    })

    let incomeFinal = parseInt(incomeTotal);
    let expenseFinal = parseInt(expenseTotal);
    let budgetTotal = incomeFinal - expenseFinal;

    if(budgetTotal < 0){
      let string = budgetTotal.toString();
      let altBudgetTotal = parseInt(string.replace('-', ''));
      finalNumber.textContent = '- $' + altBudgetTotal.toFixed(2);
    } else{
      finalNumber.textContent = '+ $' + budgetTotal.toFixed(2);
    }
  }
}

const budgetItems = new TransactionList();


inputForm.addEventListener('submit', function (e) {
  budgetItems.addNewTransaction(descriptionInput.value, valueInput.value);

  descriptionInput.value = '';
  valueInput.value = '';
  budgetItems.print();

  e.preventDefault();
})

document.addEventListener('click', function (e) {
  if (e.target.className === 'ion-ios-close-outline') {
    const transactionItem = e.target.parentElement.parentElement.parentElement.parentElement;
    const transactionID = parseInt(transactionItem.getAttribute('data-transaction-id'));

    budgetItems.removeTransaction(transactionID);
  }
})


