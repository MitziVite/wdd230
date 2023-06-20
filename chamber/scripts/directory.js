// Toggle active/not active buttons

let gridSelector = document.querySelector('#directory-grid');
let listSelector = document.querySelector('#directory-list');
let directoryData = document.querySelector('#directory-data');

gridSelector.addEventListener('click', ()=>{
    if (!gridSelector.classList.contains('active')){    
        gridSelector.classList.add('active');
        listSelector.classList.remove('active');
        directoryData.classList.add('cards-directory')
        directoryData.classList.remove('directory-list')
    }
});

listSelector.addEventListener('click', ()=>{
    if (!listSelector.classList.contains('active')){
        listSelector.classList.add('active');
        gridSelector.classList.remove('active');
        directoryData.classList.add('directory-list')
        directoryData.classList.remove('cards-directory')
    }
});

// Directory Data 

const url = "./data/directory.json";

// COMPARE THIS TO THE VERSION FOUND IN THE W09 Activity: Working with JSON data and the Fetch API module
// Using the innerHTML version is a little less Javascript intensive.
const displayMembers = (members) => {
  const cards = document.querySelector(".cards-directory"); // select the output container element

  members.forEach((member) => {
    // Create elements to add to the div.cards element
    let card = document.createElement("section");
    card.classList.add("cards-directory")
    if (member.membershipLevel == 'gold'){
      card.classList.add("gold-member")
    }
    else if(member.membershipLevel == 'bronze'){
        card.classList.add("bronze-member")
    }
    else if(member.membershipLevel == 'silver'){
        card.classList.add("silver-member")
    }
    else if(member.membershipLevel == 'non profit'){
        card.classList.add("non-member")
    }
    card.innerHTML = `<h2>${member.name}</h2>
    <img src="${member.imageURL}" alt="member image">
    <p>${member.street}</p>
    <p>${member.city}, ${member.state} ${member.zip}</p>
    <p><a href="${member.websiteURL}">Visit</a></p>`;
    cards.appendChild(card);
  }); // end of forEach loop
  
}; // end of function expression

async function getMemberData() {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    displayMembers(data.members);
  } else {
    console.error("There was an error loading the data.");
    const cards = document.querySelector("div.cards");
    cards.innerHTML = "<section><h1>There was an error loading the data</h1></section>";
  }
}

getMemberData();