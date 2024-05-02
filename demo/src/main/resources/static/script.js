// Array to store objects
let itemsArray = [];

// Function to handle the buy button click event
function handleBuyButtonClick(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get values from input fields and dropdown
    const chooseInput = $("#choose");
    const nrInput = $("#nr");
    const firstNameInput = $("#firstName");
    const lastNameInput = $("#lastName");
    const phoneNrInput = $("#phoneNr");
    const eMailInput = $("#eMail");

    // Validate input fields and dropdown
    const inputsToValidate = [nrInput, firstNameInput, lastNameInput, phoneNrInput, eMailInput];
    const inputsWithErrors = inputsToValidate.filter(input => !validateInput(input));
    if (!validateInput(chooseInput)) {
        inputsWithErrors.push(chooseInput);
    }

    if (inputsWithErrors.length === 0) {
        // If all input fields are valid, proceed
        const choose = chooseInput.val(); // Get selected option
        const nr = nrInput.val();
        const firstName = firstNameInput.val();
        const lastName = lastNameInput.val();
        const phoneNr = phoneNrInput.val();
        const eMail = eMailInput.val();

        // Create object and push it to array
        itemsArray.push({ choose, nr, firstName, lastName, phoneNr, eMail });

        // Display the updated array
        displayItemsArray();

        // Clear input fields
        clearInputFields();

        // Clear existing error messages
        clearErrorMessages();
    } else {
        // If any input field is invalid, show error messages
        showErrorMessages(inputsWithErrors);
    }
}

// Function to display the items array under the subheader
function displayItemsArray() {
    const subheader = $("h2");
    const itemsList = $("<ul>");

    // Clear previous items
    subheader.next().html('');

    // Create list items for each object in the array
    itemsArray.forEach(item => {
        const listItem = $("<li>");
        const chooseOption = $(`#choose option[value="${item.choose}"]`);
        const chooseText = chooseOption.length ? chooseOption.text() : "Ukjent Filmvalg";
        listItem.text(`Film: ${chooseText}, Antall: ${item.nr}, Fornavn: ${item.firstName}, Etternavn: ${item.lastName}, Telefonnr: ${item.phoneNr}, Email: ${item.eMail}`);
        itemsList.append(listItem);
    });

    // Append the list under the subheader
    subheader.parent().find("#itemsList").before(itemsList);
}

// Function to validate input field
function validateInput(input) {
    const value = input.val().trim();
    if (value === '') {
        return false; // Empty input is considered invalid
    }

    // Custom validation logic for each input field
    switch (input.attr('id')) {
        case 'nr':
            return !isNaN(value); // Check if it's a valid number
        case 'firstName':
        case 'lastName':
            return /^[a-zA-Z]+$/.test(value); // Check if it contains only letters
        case 'phoneNr':
            return /^\d{8}$/.test(value); // Check if it's an 8-digit number
        case 'eMail':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Check if it's a valid email address
        case 'choose':
            return value !== "option1"; // Check if selected option is not the first option
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
        const errorMessage = $("<span>");
        errorMessage.addClass("error-message"); // Adding class for styling
        errorMessage.text(createErrorMessageText(input));
        errorMessage.css("color", "red"); // Set text color to red
        input.after(errorMessage);
    });
}

// Function to create error message text
function createErrorMessageText(input) {
    switch (input.attr('id')) {
        case 'nr':
            return "Må oppgi antall";
        case 'firstName':
            return "Må oppgi fornavn";
        case 'lastName':
            return "Må oppgi etternavn";
        case 'phoneNr':
            return "Må oppgi telefonnummer";
        case 'eMail':
            return "Må oppgi epost";
        case 'choose':
            return "Må velge en film";
        default:
            return "";
    }
}

// Function to clear error messages
function clearErrorMessages() {
    $(".error-message").remove();
}

function clearInputFields() {
    $("#nr, #firstName, #lastName, #phoneNr, #eMail").val("");
}

// Function to handle the delete button click event
function handleDeleteButtonClick() {
    // Clear the items array
    itemsArray = [];

    // Clear the displayed items
    displayItemsArray();
}

// Attach event listener to the buy button
$("#buy").click(handleBuyButtonClick);

// Attach event listener to the delete button
$("#delete").click(handleDeleteButtonClick);