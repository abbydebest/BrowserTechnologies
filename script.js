// Credits naar Chris 🫶🏼
// Function to save form data to localStorage
function saveFormData() {
    // Get all input elements from the acquirer-1 fieldset
    const inputs = document.querySelectorAll('form * input');

    // Create an object to store the form data
    const formData = {};

    // Loop through each input and save its value
    inputs.forEach(input => {
        // For radio buttons, only save if checked
        if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.id;
            }
        } else {
            // For text inputs, save the value
            formData[input.name] = input.value;
        }
    });

    // Save the form data to localStorage
    localStorage.setItem('erfbelastingFormData', JSON.stringify(formData));
}

// Function to load form data from localStorage
function loadFormData() {
    // Get the saved form data from localStorage
    const savedData = localStorage.getItem('erfbelastingFormData');

    // If there's no saved data, exit the function
    if (!savedData) return;

    // Parse the saved data
    const formData = JSON.parse(savedData);

    // Get all input elements from the acquirer-1 fieldset
    const inputs = document.querySelectorAll('form * input');

    // Loop through each input and set its value from the saved data
    inputs.forEach(input => {
        if (input.type === 'radio') {
            // For radio buttons, check if the ID matches the saved value
            if (formData[input.name] === input.id) {
                input.checked = true;
            }
        } else if (input.name in formData) {
            // For text inputs, set the value
            input.value = formData[input.name];
        }
    });
}

// Function to attach event listeners to all form inputs
function setupFormPersistence() {
    // Get all input elements from the acquirer-1 fieldset
    const inputs = document.querySelectorAll('form * input');

    // Add change event listener to each input
    inputs.forEach(input => {
        input.addEventListener('input', saveFormData);
        // For radio buttons, also listen for the change event
        if (input.type === 'radio') {
            input.addEventListener('change', saveFormData);
        }
    });

    // Load saved form data when the page loads
    loadFormData();
}

// Initialize form persistence when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupFormPersistence);

const extraText = document.querySelectorAll(".hide");

document.getElementsByClassName("hide").hidden = true;
