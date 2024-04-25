// Array to store objects
let itemsArray = [];

// Function to handle the buy button click event
function handleBuyButtonClick(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get values from input fields
    const nrInput = document.getElementById("nr");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const phoneNrInput = document.getElementById("phoneNr");
    const eMailInput = document.getElementById("eMail");

    // Validate input fields
    const inputsToValidate = [nrInput, firstNameInput, lastNameInput, phoneNrInput, eMailInput];
    const inputsWithErrors = inputsToValidate.filter(input => !validateInput(input));

    if (inputsWithErrors.length === 0) {
        // If all input fields are valid, proceed
        const nr = nrInput.value;
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const phoneNr = phoneNrInput.value;
        const eMail = eMailInput.value;

        // Create object and push it to array
        itemsArray.push({ nr, firstName, lastName, phoneNr, eMail });

        // Display the updated array
        displayItemsArray();

        // Clear input fields
        clearInputFields();
    } else {
        // If any input field is invalid, show error messages
        showErrorMessages(inputsWithErrors);
    }
}

// Function to display the items array under the subheader
function displayItemsArray() {
    const subheader = document.querySelector("h2");
    const itemsList = document.createElement("ul");

    // Clear previous items
    subheader.nextElementSibling.innerHTML = '';

    // Create list items for each object in the array
    itemsArray.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `Antall: ${item.nr}, Fornavn: ${item.firstName}, Etternavn: ${item.lastName}, Telefonnr: ${item.phoneNr}, Email: ${item.eMail}`;
        itemsList.appendChild(listItem);
    });

    // Append the list under the subheader
    subheader.parentNode.insertBefore(itemsList, subheader.nextElementSibling);
}

// Function to validate input field
function validateInput(input) {
    const value = input.value.trim();
    if (value === '') {
        return false; // Empty input is considered invalid
    }
    
    // Custom validation logic for each input field
    switch (input.id) {
        case 'nr':
            return !isNaN(value); // Check if it's a valid number
        case 'firstName':
        case 'lastName':
            return /^[a-zA-Z]+$/.test(value); // Check if it contains only letters
        case 'phoneNr':
            return /^\d{8}$/.test(value); // Check if it's an 8-digit number
        case 'eMail':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Check if it's a valid email address
        default:
            return true; // Default to true for other input fields
    }
}

// Function to show error message
function showErrorMessages(inputsWithErrors) {
    // Clear existing error messages
    clearErrorMessages();

    // Create and append error messages for each input field with errors
    inputsWithErrors.forEach(input => {
        console.log("Validity of input:", input.validity.valid);
        console.log("Validation message:", input.validationMessage);
        const errorMessage = document.createElement("span");
        errorMessage.className = "error-message";
        errorMessage.textContent = input.validationMessage;
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    });
}

// Function to clear error messages
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(errorMessage => {
        errorMessage.parentNode.removeChild(errorMessage);
    });
}

function clearInputFields() {
    document.getElementById("nr").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phoneNr").value = "";
    document.getElementById("eMail").value = "";
}

// Function to handle the delete button click event
function handleDeleteButtonClick() {
    // Clear the items array
    itemsArray = [];

    // Clear the displayed items
    displayItemsArray();
}

// Attach event listener to the buy button
document.getElementById("buy").addEventListener("click", handleBuyButtonClick);

// Attach event listener to the delete button
document.getElementById("delete").addEventListener("click", handleDeleteButtonClick);