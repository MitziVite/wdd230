
menubutton = document.querySelector("#menu-button");

menubutton.addEventListener("click", () =>
{
    document.querySelector("#navbar").classList.toggle('active');
    document.querySelector("#menu-close").classList.toggle('active');
    document.querySelector("#menu-open").classList.toggle('active');

});
  const currentDate = moment();
  const formattedDate = currentDate.format("MM/DD/YYYY  HH:mm:ss");
  document.querySelector("#date2").textContent = formattedDate;

  // Get the total number of specialty drinks from localStorage
const totalDrinks = parseInt(localStorage.getItem("totalDrinks")) || 0;

// Display the total number of drinks in the information card
document.getElementById("total-drinks-output").textContent = totalDrinks.toString();
