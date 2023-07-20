const fruit1Select1 = document.getElementById("fruit1");
const fruit2Select2 = document.getElementById("fruit2");
const fruit3Select3 = document.getElementById("fruit3");

// Fetch fruit options and populate the select elements
fetch("fruits.json")
  .then(response => response.json())
  .then(data => {
    const fruits = data;
    for (const fruit of fruits) {
      const option1 = document.createElement("option");
      option1.text = fruit.name;
      fruit1Select1.add(option1);

      const option2 = document.createElement("option");
      option2.text = fruit.name;
      fruit2Select2.add(option2);

      const option3 = document.createElement("option");
      option3.text = fruit.name;
      fruit3Select3.add(option3);
    }
  })
  .catch(error => {
    console.log("Error fetching fruit options:", error);
  });

// Obtener las referencias de los elementos del formulario
const form = document.getElementById("order-form");
const firstNameInput = document.getElementById("first_name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const fruit1Select = document.getElementById("fruit1");
const fruit2Select = document.getElementById("fruit2");
const fruit3Select = document.getElementById("fruit3");
const specialInstructionsInput = document.getElementById("special_instructions");

// Manejar el envío del formulario
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtener los valores del formulario
  const firstName = firstNameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;
  const fruit1 = fruit1Select.value;
  const fruit2 = fruit2Select.value;
  const fruit3 = fruit3Select.value;
  const specialInstructions = specialInstructionsInput.value;

  // Almacenar los valores en localStorage
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("email", email);
  localStorage.setItem("phone", phone);
  localStorage.setItem("fruit1", fruit1);
  localStorage.setItem("fruit2", fruit2);
  localStorage.setItem("fruit3", fruit3);
  localStorage.setItem("specialInstructions", specialInstructions);

  // Get the current total number of specialty drinks from localStorage
  let totalDrinks = parseInt(localStorage.getItem("totalDrinks")) || 0;

  // Increment the total number of specialty drinks
  totalDrinks++;

  // Store the updated total number of drinks in localStorage
  localStorage.setItem("totalDrinks", totalDrinks);

  // Redireccionar a la página de confirmación
  window.location.href = "confirmation.html";
});

