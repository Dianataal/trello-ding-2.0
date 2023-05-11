// Minu lambikas versioon

import config from './config.json';

const key = config.key;
const token = config.token;
const board = config.board;
const keyword = config.keyword;

// function checkChanges() {
  fetch(`https://api.trello.com/1/boards/${board}/actions?key=${key}&token=${token}&filter=updateCard,updateList`)
    .then(response => response.json())
  // keyword list data only filter
    .then(data => {
      const filteredData = data.filter(action => {
        const listChanges = action.type ? createCard || updateCard || deleteCard : '';
        const listName = action.listName.includes(keyword);
        const cardName = action.cardName;
        return listName || cardName;
      });
      filteredData.forEach(action => {
        const addCard = action.type ? createCard : console.log(`${cardName} was added to the list ${listName}.`);
        const prevList = action.listBefore;
        const newList = action.listAfter.includes(keyword);
        const moveCard = action.type ? updateCard || action.listBefore && action.listAfter : console.log(`${cardName} was moved from list ${prevList} to ${newList}.`);
        const susMoveCard = action.type ? updateCard || action.listBefore && action.listAfter.(!includes(keyword)) : console.log(`${cardName} was removed from list ${prevList}.`);
        const archiveCard = action.type ? updateCard || action.closed===true : (`${cardName} was archived from list ${listName}.`);
        const returnArchiveCard = action.type ? updateCard || action.closed===false : (`${cardName} was returned to list ${listName}.`);
        const shortId = action.id;
        const deleteCard = action.type ? deleteCard : console.log(`A card with id ${shortId} was deleted from the board.`)
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