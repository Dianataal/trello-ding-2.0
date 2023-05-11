// see mis oli kus veel nimed sees - probleem ongi, et kaartide nimesid sellest fetchist ei saa kuna neid lihtsalt pole seal, aga ma avastasin selle hiljem


fetch(`https://api.trello.com/1/boards/${board}/actions?key=${key}&token=${token}&filter=updateCard,updateList`)
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

    filteredData.forEach(action => {
      if (action.type === 'createCard') {
        const listName = action.data.list ? action.data.list.name : '';
        const cardName = action.data.card ? action.data.card.name : '';
        console.log(`${cardName} was added to the list ${listName}.`);
      } else if (action.type === "updateCard" && action.listBefore && action.listAfter) {
        const cardName = action.data.card ? action.data.card.name : '';
        const prevList = action.listBefore.name;
        const newList = action.listAfter.name;
        if (newList.includes(keyword)) {
          console.log(`${cardName} was moved from list ${prevList} to ${newList}.`);
        } else if (!newList.includes(keyword)) {
          console.log(`${cardName} was removed from list ${prevList}.`);
        }
      } else if (action.type === "updateCard" && typeof action.closed !== 'undefined') {
        const cardName = action.data.card ? action.data.card.name : '';
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


  teine parandatud osa chatgpt poolt kus on osade kaupa tema lahendused (samuti nimedega nii et ei tööta)

  // Chatgpt parandatud ver

const key = config.key;
const token = config.token;
const board = config.board;
const keyword = config.keyword;

// chatGPT ütleb et nii see filter töötab i guess
fetch(`https://api.trello.com/1/boards/${board}/actions?key=${key}&token=${token}&filter=updateCard,updateList`)
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


    filteredData.forEach(action => {
        // tema ver kaarti loomisest
        if (action.type === 'createCard') {
            console.log(`${cardName} was added to the list ${listName}.`);
          };
        // kaart liigub listide vahel !!Kas järgmine lahedab selle osa ka ära???
//        const prevList = action.listBefore ? action.listBefore.name : '';
//  const newList = action.listAfter && action.listAfter.name.includes(keyword);
//  const moveCard = action.type === 'updateCard' && prevList && newList ?
//  console.log(`${cardName} was moved from list ${prevList} to ${newList}.`) :
//  '';
  // kaart liigub ilma keywordita listi (ja keywordiga?)
  if (action.type === "updateCard" && action.listBefore && action.listAfter) {
    const prevList = action.listBefore.name;
    const newList = action.listAfter.name;
    if (newList.includes(keyword)) {
      console.log(`${cardName} was moved from list ${prevList} to ${newList}.`);
    } else if (!newList.includes(keyword)) {
      console.log(`${cardName} was removed from list ${prevList}.`);
    }
  }
      // kaart läheb arhiivi / tuleb arhiivist
        const archiveCard = action.type ? updateCard || action.closed===true : (`${cardName} was archived from list ${listName}.`);
        const returnArchiveCard = action.type ? updateCard || action.closed===false : (`${cardName} was returned to list ${listName}.`);
        if (action.type && action.closed === true) {
            console.log(`${cardName} was archived from list ${action.list.name}.`);
        } else if (action.type && action.closed === false) {
            console.log(`${cardName} was returned to list ${action.list.name}.`);
        }
    // Kaart kustutatakse täielikult
    cards.forEach((card) => {
        card.actions.forEach((action) => {
          const shortId = action.data.idShort;
          if (action.type === "deleteCard") {
            console.log(`A card with id ${shortId} was deleted from the board.`);
          }
        });
      });
      
  

    // ye see on alati siin nii et suht suva
    .catch(error => console.error(error));