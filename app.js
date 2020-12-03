const budgetMonth = document.querySelector('.budget__title--month');
const finalNumber = document.querySelector('.budget__value');
const finalIncomeNumber = document.querySelector('.budget__income--value');
const finalExpenseNumber = document.querySelector('.budget__expenses--value');
const finalExpensePercent = document.querySelector('.budget__expenses--percentage');
const inputForm = document.querySelector('.add__container');
const descriptionInput = inputForm.querySelector('.add__description');
const valueInput = inputForm.querySelector('.add__value');
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

  addNewTransaction(description, moneyValue) {
    if (description === '' || moneyValue === '') {
      return false;
    }
        if (moneyValue > 0) {
          this.incomeArr.push(new Transaction(description, moneyValue));
        } else if (moneyValue < 0) {
          this.expenseArr.push(new Transaction(description, moneyValue));
        }
    this.UI();
    this.incomeTotal();
    this.expenseTotal();
    this.finalBudget();
    this.totalExPercent();
  }

  removeTransaction(itemID) {
    this.incomeArr = this.incomeArr.filter(item => item.itemID !== itemID);
    this.expenseArr = this.expenseArr.filter(item => item.itemID !== itemID);

    this.UI();
    this.incomeTotal();
    this.expenseTotal();
    this.finalBudget();
    this.totalExPercent();
  }

  UI() {
    let incomeTotal = 0;

    this.incomeArr.forEach(function (i) {
      incomeTotal += parseInt(i.amount);
    })

    let incomeFinal = parseInt(incomeTotal);
    
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
      let exSinglePercent = Math.ceil((exItem.amount / incomeFinal) * 100);
      expenseList.insertAdjacentHTML('afterbegin', `<div class="item" data-transaction-id="${exItem.itemID}">
            <div class="item__description">${exItem.description}</div>
            <div class="right">
              <div class="item__value">- $${exItem.amount}</div>
              <div class="item__percentage">${exSinglePercent}%</div>
              <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
              </div>
            </div>
            <div class="item__date">${exItem.date}</div>
          </div>`);
    })
  }

  incomeArrAmount() {
    let incomeTotal = 0;

    this.incomeArr.forEach(function (i) {
      incomeTotal += parseInt(i.amount);
    })

    let incomeFinal = parseInt(incomeTotal);

    return incomeFinal;
  }

  expenseArrAmount() {
    let expenseTotal = 0;

    this.expenseArr.forEach(function (i) {
      expenseTotal += parseInt(i.amount);
    })

    let expenseFinal = parseInt(expenseTotal);

    return expenseFinal;
  }

  incomeTotal() {
    let incomeFinal = parseInt(this.incomeArrAmount());
    finalIncomeNumber.textContent = '+ $' + incomeFinal.toFixed(2);
  }

  expenseTotal() {
    let expenseFinal = parseInt(this.expenseArrAmount());
    finalExpenseNumber.textContent = '- $' + expenseFinal.toFixed(2);
  }

  finalBudget() {
    let budgetTotal = this.incomeArrAmount() - this.expenseArrAmount();

    if (budgetTotal < 0) {
      let string = budgetTotal.toString();
      let altBudgetTotal = parseInt(string.replace('-', ''));
      finalNumber.textContent = '- $' + altBudgetTotal.toFixed(2);
    } else {
      finalNumber.textContent = '+ $' + budgetTotal.toFixed(2);
    }
  }

  totalExPercent() {
    let exTotalPercent = Math.ceil((this.expenseArrAmount() / this.incomeArrAmount()) * 100);

    finalExpensePercent.textContent = exTotalPercent + '%';
  }
}

const budgetItems = new TransactionList();


inputForm.addEventListener('submit', function (e) {
  budgetItems.addNewTransaction(descriptionInput.value, valueInput.value);

  descriptionInput.value = '';
  valueInput.value = '';

  e.preventDefault();
})

document.addEventListener('click', function (e) {
  if (e.target.className === 'ion-ios-close-outline') {
    const transactionItem = e.target.parentElement.parentElement.parentElement.parentElement;
    const transactionID = parseInt(transactionItem.getAttribute('data-transaction-id'));

    budgetItems.removeTransaction(transactionID);
  }
})
