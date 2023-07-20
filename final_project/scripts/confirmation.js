// Obtener los valores del formulario almacenados en localStorage
const firstName = localStorage.getItem("firstName");
const email = localStorage.getItem("email");
const phone = localStorage.getItem("phone");
const fruit1 = localStorage.getItem("fruit1");
const fruit2 = localStorage.getItem("fruit2");
const fruit3 = localStorage.getItem("fruit3");
const specialInstructions = localStorage.getItem("specialInstructions");

// Mostrar los valores en la página de confirmación
document.getElementById("first-name-output").textContent = `First Name: ${firstName}`;
document.getElementById("email-output").textContent = `Email: ${email}`;
document.getElementById("phone-output").textContent = `Phone: ${phone}`;
document.getElementById("fruit1-output").textContent = `Fruit 1: ${fruit1}`;
document.getElementById("fruit2-output").textContent = `Fruit 2: ${fruit2}`;
document.getElementById("fruit3-output").textContent = `Fruit 3: ${fruit3}`;
document.getElementById("special-instructions-output").textContent = `Special Instructions: ${specialInstructions}`;

// Obtener los datos de las frutas desde el archivo fruits.json
fetch('fruits.json')
  .then(response => response.json())
  .then(data => {
    const fruitsData = data;

    // Calcular el total de los valores nutricionales
    let totalCarbohydrates = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalSugar = 0;
    let totalCalories = 0;

    [fruit1, fruit2, fruit3].forEach(fruitName => {
      const selectedFruit = fruitsData.find(fruit => fruit.name === fruitName);
      if (selectedFruit) {
        totalCarbohydrates += selectedFruit.nutritions.carbohydrates;
        totalProtein += selectedFruit.nutritions.protein;
        totalFat += selectedFruit.nutritions.fat;
        totalSugar += selectedFruit.nutritions.sugar;
        totalCalories += selectedFruit.nutritions.calories;
      }
    });

    // Mostrar los valores nutricionales totales en la página de confirmación
    document.getElementById("carbohydrates-output").textContent = `Carbohydrates: ${totalCarbohydrates.toFixed(2)}`;
    document.getElementById("protein-output").textContent = `Protein: ${totalProtein.toFixed(2)}`;
    document.getElementById("fat-output").textContent = `Fat: ${totalFat.toFixed(2)}`;
    document.getElementById("sugar-output").textContent = `Sugar: ${totalSugar.toFixed(2)}`;
    document.getElementById("calories-output").textContent = `Calories: ${totalCalories.toFixed(2)}`;
  })
  .catch(error => {
    console.log('Error fetching fruit data:', error);
  });

// Obtener la fecha y hora actual
const currentDate1 = new Date();
const orderDate = currentDate1.toLocaleString();
document.getElementById("order-date-output").textContent = `Order Date: ${orderDate}`;

// Calcular la hora de recogida en 30 minutos
const pickupDate = new Date(currentDate1.getTime() + 30 * 60000); // Sumar 30 minutos en milisegundos
const pickupTime = pickupDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Mostrar la hora de recogida en la página de confirmación
document.getElementById("pickup-time-output").textContent = `You can pickup your order at: ${pickupTime}`;

function rate(stars) {
  const starElements = document.getElementsByClassName("star");

  // Remove the "active" class from all stars
  for (let i = 0; i < starElements.length; i++) {
    starElements[i].classList.remove("active");
  }

  // Add the "active" class to the clicked star and all preceding stars
  for (let i = 0; i < stars; i++) {
    starElements[i].classList.add("active");
  }
}
