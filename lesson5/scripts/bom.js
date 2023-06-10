const inputbutton = document.querySelector(".button")
const userinput = document.querySelector("#favchap")
const mylist = document.querySelector("#list")

inputbutton.addEventListener('click',() => {
    //make sure the input is not blank before doing the following remaining tasks in this list
    if (userinput.value == "null" || userinput.value == ''){
        return
    }

    // create an li element
    let newlistitem = document.createElement('li');
    // create a delete button
    let deletebutton = document.createElement("button");
    // populate the li elements textContent or innerHTML with the input
    newlistitem.appendChild(document.createTextNode(userinput.value))
    
    newlistitem.style.color ="red";
    newlistitem.style.backgroundColor ="lightblue";
    // populate the button textContent with an ❌
    deletebutton.textContent = "❌";
    // append the li element with the delete button
    newlistitem.appendChild(deletebutton);
    // append the li element with the delete button
    mylist.appendChild(newlistitem);
    // append the list element with the li element just created and appended with text and the delete button
    // add an event listener to the delete button that removes the li element when clicked
    deletebutton.addEventListener("click",() =>{
        mylist.removeChild(newlistitem);
    })
    // send the focus to the input element
    userinput.focus();

    // change the input value to nothing or the empty string to clean up the interface for the user
    userinput.value = "";

})