document.addEventListener("DOMContentLoaded", function () {
  // Capture all elements
  const form = document.getElementById("petForm");
  const petList = document.getElementById("petList");

  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const image = document.getElementById("image");
  const birthdate = document.getElementById("birthdate");
  const priceField = document.getElementById("price");
  const code = document.getElementById("code");
  const sold = document.getElementById("sold");

  // Create the event handler to the form 'submit'
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the form from submitting automatically
    event.stopPropagation(); // Prevents the event from bubbling up

    // Calling the main validation function
    if (validateForm()) {
      console.log("All fields are ok, we can proceed to create the pet card");
      createPetCard();
    } else {
      console.log("There is some not-valid field. The user should check them.");
    }
  });

  // This function validates all fields and returns a boolean
  function validateForm() {
    var isValid = true;

    // 1. Validation for Name
    if (name.value.trim() === "") {
      markFieldAsNotValid(name, "Please enter a pet name.");
      isValid = false;
    } else {
      markFieldAsValid(name);
    }

    // 2. Validation for Description
    if (description.value.trim() === "") {
      markFieldAsNotValid(description, "Please enter a description.");
      isValid = false;
    } else {
      markFieldAsValid(description);
    }

    // 3. Validation for Image URL
    const imageValue = image.value.trim();
    const imageRegex = /\.(jpg|jpeg|png|gif)$/i;
    if (imageValue === "") {
      markFieldAsNotValid(image, "Please enter an image URL.");
      isValid = false;
    } else if (!imageRegex.test(imageValue)) {
      markFieldAsNotValid(image, "The image URL must end in .jpg, .jpeg, .png or .gif.");
      isValid = false;
    } else {
      markFieldAsValid(image);
    }

    // 4. Validation for Birthdate
    const birthdateValue = birthdate.value;
    const today = new Date();
    const selectedDate = new Date(birthdateValue);
    if (!birthdateValue) {
      markFieldAsNotValid(birthdate, "Please select a birthdate.");
      isValid = false;
    } else if (selectedDate > today) {
      markFieldAsNotValid(birthdate, "The birthdate cannot be in the future.");
      isValid = false;
    } else {
      markFieldAsValid(birthdate);
    }

    // 5. Validation for Price
    const priceValue = Number(priceField.value);
    if (priceField.value.trim() === "" || isNaN(priceValue)) {
      markFieldAsNotValid(priceField, "Please enter a valid price.");
      isValid = false;
    } else if (priceValue <= 0) {
      markFieldAsNotValid(priceField, "The price must be greater than 0.");
      isValid = false;
    } else {
      markFieldAsValid(priceField);
    }

    // 6. Validation for Code
    const codeValue = code.value.trim().toUpperCase();
    const codeRegex = /^[A-Z]{3}\d{3}$/;
    if (codeValue === "") {
      markFieldAsNotValid(code, "Please enter a pet code.");
      isValid = false;
    } else if (!codeRegex.test(codeValue)) {
      markFieldAsNotValid(code, "The pet code must have 3 letters followed by 3 numbers, e.g. CAT123.");
      isValid = false;
    } else {
      markFieldAsValid(code);
    }

    return isValid;
  }

  // Function that generates and displays the pet card once validation passes
  function createPetCard() {
    const nameVal = name.value.trim();
    const descriptionVal = description.value.trim();
    const imageVal = image.value.trim();
    const birthdateVal = birthdate.value;
    const priceVal = Number(priceField.value);
    const codeVal = code.value.trim().toUpperCase();
    const isSold = sold.checked;

    const petCard = document.createElement("div");
    petCard.className = "pet";

    const petImage = document.createElement("img");
    petImage.src = imageVal;
    petImage.alt = nameVal;

    const petName = document.createElement("h3");
    petName.textContent = nameVal;

    const petDescription = document.createElement("p");
    petDescription.textContent = descriptionVal;

    const petBirthdate = document.createElement("p");
    petBirthdate.textContent = "Birthdate: " + birthdateVal;

    const petPrice = document.createElement("p");
    petPrice.textContent = "Price: " + priceVal.toFixed(2) + " €";

    const petCode = document.createElement("p");
    petCode.textContent = "Code: " + codeVal;

    petCard.appendChild(petImage);
    petCard.appendChild(petName);
    petCard.appendChild(petDescription);
    petCard.appendChild(petBirthdate);
    petCard.appendChild(petPrice);
    petCard.appendChild(petCode);

    if (isSold) {
      const soldBadge = document.createElement("span");
      soldBadge.className = "sold";
      soldBadge.textContent = "SOLD";
      petCard.appendChild(soldBadge);
    }

    petList.appendChild(petCard);
    form.reset();
  }

  // Functions to set a valid or not-valid field

  function markFieldAsNotValid(element, message) {
    element.classList.add("error");
    const errorContainer = element.parentNode.querySelector(".error-message");
    if (errorContainer && message) {
      errorContainer.textContent = message;
    }
  }

  function markFieldAsValid(element) {
    element.classList.remove("error");
    const errorContainer = element.parentNode.querySelector(".error-message");
    if (errorContainer) {
      errorContainer.textContent = "";
    }
  }
});