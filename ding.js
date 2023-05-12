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
        // moving cards works!!!
      } else if (action.type === 'updateCard' && newList.includes(keyword)) {
        console.log(`${cardName} was moved from list ${prevList} to ${newList}.`);
      } else if (action.type === 'updateCard' && !(newList.includes(keyword))) {
      // prevList isnt showing up tho so it needs to be changed?
        console.log(`${cardName} was removed from list ${prevList}.`);
        // 
      } else if (action.type === 'updateCard' && typeof action.closed !== 'undefined') {
        const listName = action.data.list ? action.data.list.name : '';
        if (action.closed === true) {
          console.log(`${cardName} was archived from list ${listName}.`);
        } else if (action.closed === false) {
          console.log(`${cardName} was returned to list ${listName}.`);
        }
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
  // catch error is missing here?

// }
// setInterval(checkChanges, 10000);