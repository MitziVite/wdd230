menubutton = document.querySelector("#menu-button");

menubutton.addEventListener("click", () =>
{
    document.querySelector("#navbar").classList.toggle('active');
    document.querySelector("#menu-open").classList.toggle('active');
    document.querySelector("#menu-close").classList.toggle('active');
});