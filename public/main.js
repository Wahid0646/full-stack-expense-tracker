const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

// Function to create a new expense item and append it to the expense list
function createExpenseItem(expense) {
    console.log('Creating expense item:', expense);

    const listItem = document.createElement('li');
    listItem.textContent = `${expense.description}: $${expense.amount}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    // Attach an event listener to the delete button
    deleteButton.addEventListener('click', async (event) => {
        event.stopPropagation(); // Prevent click event from reaching the list item
        try {
            const response = await fetch(`/expenses`, {
                method: 'DELETE'
            });

            if (response.ok) {
                listItem.remove(); // Remove the item from the UI
            } else {
                console.error('Error deleting expense');
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    });

    listItem.appendChild(deleteButton);
    expenseList.appendChild(listItem);
}

// ... Rest of your code remains unchanged

expenseForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;

  try {
    const response = await fetch('/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, amount }),
    });

    if (response.ok) {
      const newExpense = await response.json();
      const listItem = document.createElement('li');
      listItem.textContent = `${newExpense.description}: $${newExpense.amount}`;
      expenseList.appendChild(listItem);
    } else {
      console.error('Error adding expense');
    }
  } catch (error) {
    console.error('Error adding expense:', error);
  }
});

window.addEventListener('load', async () => {
  try {
    const response = await fetch('/expenses');
    if (response.ok) {
      const expenses = await response.json();
      expenses.forEach(expense => {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.description}: $${expense.amount}`;
        expenseList.appendChild(listItem);
      });
    } else {
      console.error('Error fetching expenses');
    }
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
});
