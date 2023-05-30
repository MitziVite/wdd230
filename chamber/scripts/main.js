menubutton = document.querySelector("#menu-button");

menubutton.addEventListener("click", () =>
{
    document.querySelector("#navbar").classList.toggle('active');
    document.querySelector("#menu-close").classList.toggle('active');
    document.querySelector("#menu-open").classList.toggle('active');

});


let message = new Date();
if (message.getDay() == 1 || message.getDay() == 2) {
    document.querySelector("#meet-greet").classList.add('active');
};