/**
 * The code to fetch the payments data has already been written
 * for you below. To complete this group project, your group
 * will need to write code to make this app do the following:
 *
 * 1. Show the current balance based on the initial balance and
 *    any completed payments. Each completed payment will add to
 *    the balance.
 * 2. Add the payments to the table. Each payment should show
 *    the date of the payment, its status (whether is pending or
 *    complete), the description, the amount, and the balance
 *    after that payment was completed.
 *
 *    Pending payments should appear with a pink background.
 *    This can be applied by adding the `pending` class to the
 *    table row (`<tr>`) for each pending payment.
 * 3. Show what the balance will be after pending payments are
 *    completed.
 * 4. Show the total income of all payments that were received
 *    this month (May, 2019), including pending payments.
 * 5. Show the amount of the most valuable payment that was
 *    received this month (May 2019).
 * 6. For each PENDING payment, add a button that says "cancel"
 *    to the end of that payment's row. When the button is
 *    clicked, the payment should be removed from the account
 *    and the render function should be called again to update
 *    the page.
 */

/**
 * This is the account details that you will use with this
 * exercise.
 *
 * Do not edit this code.
 */
var account = {
  number: 100402153,
  initialBalance: 100,
  paymentsUrl: "/data/payments.json",
  payments: []
};

/**
 * The code below has been written for you. When the "Load"
 * button is clicked, it will get the payments details, assign
 * them to the account variable, and call the render function
 * to update details in the DOM.
 *
 * You may edit this code.
 */
document.querySelector("#loadButton").addEventListener("click", function() {
  fetch(account.paymentsUrl)
    .then(response => response.json())
    .then(payments => {
      account.payments = payments;
      render(account);
    });
});

/**
 * Write a render function below that updates the DOM with the
 * account details.
 *
 * EVERY update to the DOM should be contained in this
 * function so that you can call it over and over again
 * whenever there is an update to the account details.
 *
 * We have completed one of the DOM updates already by
 * entering the account number on the page.
 *
 * @param {Object} account The account details
 */
function render(account) {
  // Display the account number
  document.querySelector("#accountNumber").innerText = account.number;

  //render payments
  renderPayments(account);
}

/**
 * Write any additional functions that you need to complete
 * the group project in the space below.
 *
 * For example, you might want to have functions that
 * calculate balances, find completed or pending payments,
 * add up payments, and more.
 */

//to show all payments
function renderPayments(account) {
  let paymentTable = document.querySelector("#paymentsList");
  paymentTable.innerHTML = "";
  account.payments.forEach(showPayment);
}

//creating payment table cells
function showPayment(payment) {
  let paymentTable = document.querySelector("#paymentsList");
  let row = paymentTable.insertRow();
  let tableCell1 = row.insertCell(0);
  let tableCell2 = row.insertCell(1);
  let tableCell3 = row.insertCell(2);
  let tableCell4 = row.insertCell(3);
  let tableCell5 = row.insertCell(4);

  tableCell1.innerText = payment.date;
  tableCell2.innerText = completeOrPendingPayment(payment);
  tableCell3.innerText = payment.description;
  tableCell4.innerText = payment.amount;
  if (!payment.completed) {
    row.className = "pending";
    tableCell5.appendChild(createButton(payment));
  }
}

//to show Complete and Pending payments
function completeOrPendingPayment(payment) {
  if (payment.completed) {
    return "Complete";
  } else {
    return "Pending";
  }
}

function completeOrPendingPayment(payment) {
  if (payment.completed) {
    return "Complete";
  } else {
    return "Pending";
  }
}

//Adding a cancel button
function createButton(payment) {
  let cancelButton = document.createElement("button");
  cancelButton.innerText = "CANCEL";
  cancelButton.addEventListener("click", removePendingPayment);
  return cancelButton;
}

function removePendingPayment(event) {
  let button = event.target;
  let date = button.parentElement.parentElement.firstChild.innerText;
  account.payments = account.payments.filter(
    p => p.date !== date || p.completed
  );
  render(account);
}
