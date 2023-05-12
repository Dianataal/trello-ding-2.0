import config from './config.json';

const key = config.key;
const token = config.token;
const board = config.board;
const keyword = config.keyword;

// see peaks checkima iga mõne aja tagant aga lisab selle siis, kui asi töötab
// function checkChanges() {

fetch(`https://api.trello.com/1/boards/${board}/actions?key=${key}&token=${token}`)
  .then(response => response.json())
  .then(data => {
    const filteredData = data.filter(action => {
      const listName = action.data.list ? action.data.list.name : '';
      const cardName = action.data.card ? action.data.card.name : '';
      return listName.includes(keyword) || cardName.includes(keyword);
    });

    filteredData.forEach(action => {
      const listName = action.data.list ? action.data.list.name : '';
      const cardName = action.data.card ? action.data.card.name : '';
      console.log(`Card '${cardName}' was added to list '${listName}'.`);
    });

    data.forEach(action => {
     const cardName = action.data.card ? action.data.card.name : '';
const prevList = action.data.listBefore ? action.data.listBefore.name : '';
const newList = action.data.listAfter ? action.data.listAfter.name : '';
if (action.type === 'createCard') {
  console.log(`${cardName} was added to the list ${newList}.`);
  // moving cards works well enough
} else if (action.type === 'updateCard' && newList.includes(keyword)) {
  console.log(`${cardName} was moved from list ${prevList} to ${newList}.`);
} else if (action.type === 'updateCard' && !(newList.includes(keyword))) {
  console.log(`${cardName} was moved from ${prevList ? 'list ' + prevList : 'unknown list'} to a non-keyword list.`);
        // archiving cards
      } 
    const listName = action.data.list ? action.data.list.name : '';
    if (action.data.card.closed === true) {
      console.log(`${cardName} was archived from list ${listName}.`);
    } else if (action.data.card.closed === false) {
      console.log(`${cardName} was returned from archive to list ${listName}.`);
        }
      
    });

    cards.forEach((card) => {
      card.actions.forEach((action) => {
        const shortId = action.data.idShort;
        if (action.type === "deleteCard") {
          console.log(`A card with id ${shortId} was deleted from the board.`);
        }
      });
    });
  });
  
// }
// setInterval(checkChanges, 10000);