const today = new Date();

const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full"}).format( new Date());
document.querySelector("#date").textContent = fulldate;

