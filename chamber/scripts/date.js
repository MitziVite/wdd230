const today = new Date();

const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full"}).format( new Date());
document.querySelector("#date").textContent = fulldate;



const currentDate = moment();
const formattedDate = currentDate.format("MM/DD/YYYY  HH:mm:ss");
document.querySelector("#date2").textContent = formattedDate;
document.querySelector("#currentyear").textContent = currentDate.year();