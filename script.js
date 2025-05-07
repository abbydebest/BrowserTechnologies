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

// Function to add a new verkrijger fieldset
function addNewVerkrijger() {
    // Find the original verkrijger fieldset
    const originalVerkrijger = document.querySelector('.verkrijger');
    
    // Clone the verkrijger fieldset
    const newVerkrijger = originalVerkrijger.cloneNode(true);
    
    // Get the count of existing verkrijgers to number the new one
    const verkrijgerCount = document.querySelectorAll('.verkrijger').length + 1;
    
    // Update the legend title
    newVerkrijger.querySelector('.verkrijger-title').textContent = `Verkrijger ${verkrijgerCount}`;
    
    // Clear input values in the clone
    const inputs = newVerkrijger.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
        
        // Update IDs and names to make them unique
        const oldId = input.id;
        if (oldId) {
            const newId = `${oldId}-v${verkrijgerCount}`;
            input.id = newId;
            
            // Update associated labels
            const label = newVerkrijger.querySelector(`label[for="${oldId}"]`);
            if (label) {
                label.setAttribute('for', newId);
            }
        }
    });
    
    // Insert the new verkrijger before the "Nieuwe verkrijger" button
    const addButton = document.querySelector('.secondary-button');
    addButton.parentNode.insertBefore(newVerkrijger, addButton);
    
    // Apply form persistence to new inputs
    setupInputListeners(newVerkrijger);
}

// Function to set up input listeners for a specific element
function setupInputListeners(element) {
    const inputs = element.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', saveFormData);
        if (input.type === 'radio') {
            input.addEventListener('change', saveFormData);
        }
    });
}

// Initialize form persistence when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    setupFormPersistence();
    
    // Add click event listener to the "Nieuwe verkrijger" button
    const addButton = document.querySelector('.secondary-button');
    if (addButton) {
        addButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent form submission
            addNewVerkrijger();
        });
    }


    // Get both radio buttons
    const radioExecuteur = document.getElementById("executeur");
    const radioGeenExecuteur = document.getElementById("geen-executeur");
    
    // Get the amount of people fieldset
    const amountOfPeople = document.getElementById("executeur-amount-of-people");
    const chooseSituation = document.querySelector(".choose-situation");
    
    // Add event listener for the executeur radio button
    radioExecuteur.addEventListener('change', function() {
        console.log("Executeur selected");
        if (this.checked) {
            console.log("Showing amount of people");
            amountOfPeople.classList.remove("hide");
            chooseSituation.classList.add("hide");
        }
    });
    
    // Add event listener for the geen-executeur radio button
    radioGeenExecuteur.addEventListener('change', function() {
        console.log("Geen executeur selected");
        if (this.checked) {
            console.log("Hiding amount of people");
            amountOfPeople.classList.add("hide");
            chooseSituation.classList.remove("hide");
        }
    });
    
    // Initial state setup - hide if executeur is not checked
    if (!radioExecuteur.checked) {
        amountOfPeople.classList.add("hide");
    } else {
        amountOfPeople.classList.remove("hide");
    }

    if (!radioGeenExecuteur.checked) {
        chooseSituation.classList.add("hide");
    }
});



// document.getElementsByClassName("hide").hidden = true;


