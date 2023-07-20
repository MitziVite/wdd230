// Obtén las referencias de los elementos del DOM
const fruitTextElements = document.querySelectorAll(".texto");

// URL del JSON de las frutas
const fruitsEndpoint = "fruits.json"; // Reemplaza con la URL correcta de tu servidor o API

// Cargar los datos del JSON de las frutas
fetch(fruitsEndpoint)
  .then(response => response.json())
  .then(data => {
    const fruits = data;
    updateFruitText(fruits);
  })
  .catch(error => {
    console.log("Error fetching fruits:", error);
  });

// Función para actualizar el contenido de texto con los nutrientes de las frutas


function updateFruitText(fruits) {
  fruitTextElements.forEach((fruitTextElement) => {
    const fruitName = fruitTextElement.textContent.trim();

    const fruit = fruits.find((item) => item.name === fruitName);
    if (fruit) {
      const nutritions = fruit.nutritions;
      for (const key in nutritions) {
        const nutrition = `${key}: ${nutritions[key]}`;
        const nutritionElement = document.createElement("p");
        nutritionElement.textContent = nutrition;
        fruitTextElement.appendChild(nutritionElement);
      }
    } else {
      const nutritionElement = document.createElement("p");
      nutritionElement.textContent = "Nutritional information not available.";
      fruitTextElement.appendChild(nutritionElement);
    }
  });
}
