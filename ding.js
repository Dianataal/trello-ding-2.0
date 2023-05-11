import config from './config.json';

const key = config.key;
const token = config.token;
const board = config.board;
const keyword = config.keyword;

// see peaks checkima iga mõne aja tagant aga lisab selle siis, kui asi töötab
// function checkChanges() {

  fetch(`https://api.trello.com/1/boards/${board}/actions?key=${key}&token=${token}&filter=updateCard,updateList`)
    .then(response => response.json())
  // keyword list data only filter
    .then(data => {
      const filteredData = data.filter(action => {
        const listName = action.data.list ? action.data.list.name : '';
        const cardName = action.data.card ? action.data.card.name : '';
        return listName.includes(keyword) || cardName;
      });
      filteredData.forEach(action => {
        const listName = action.data.list ? action.data.list.name : '';
        const cardName = action.data.card ? action.data.card.name : '';
        console.log(`Card '${cardName}' was added to list '${listName}'.`);
      });
    })
    .catch(error => console.error(error));

// uus kaart tehti, liigutati listi non-keyword listist?


// Kaart liigub listide vahel


// Kaart liigub keyword listist non-keyword listi ehk eemaldatakse


// Kaart arhiveeritakse


// Kaart taastatakse arhiivist


// Kaart kustutatakse täielikult

// }
// setInterval(checkChanges, 10000);