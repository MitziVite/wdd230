//get data for spotlights
const cardDataUrl = './data/directory.json'
//loop through data to make array that can be chosen from
function displaySpotlights(cardList){
    cardList = cardList.filter(x => x.membershipLevel == 'gold' || x.membershipLevel == 'silver');
    spotlights = []
    for (let i = 0; i < 3; i++){
        var elt = Math.floor(Math.random() * cardList.length)
        spotlights.push(cardList.splice(elt, 1)[0]);
    }
    //display stuff
    var mainspotlight = document.querySelector('.spotlightbox');
    spotlightcount = 1;
    results = spotlights.map((spotlight) => {
        var newdiv = document.createElement('div');
        newdiv.classList.add('spotlight'+spotlightcount);
        spotlightcount++;
        newdiv.innerHTML = `<h2>${spotlight.name}</h2>
        <p class="center"><a href="${spotlight.websiteURL}"><img src="${spotlight.imageURL}" alt="${spotlight.name}"></a></p>
        <p>${spotlight.street}</p>
        <p>${spotlight.adCopy}</p>`;
        mainspotlight.append(newdiv);
        return `${spotlight.adCopy}`;
    });
    // let maxitem = results.reduce((max, item) => {return item > max ? item : max}, result[0])
}
async function getCardData() {
    const response = await fetch(cardDataUrl);
    if (response.ok) {
        const data = await response.json();
        displaySpotlights(data.members);
    } else {
        console.error("There was an error loading the data.");
    }
};
getCardData();