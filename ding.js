import config from './config.json';

const key = config.key;
const token = config.token;
const board = config.board;
const keyword = '!!!';

fetch (`https://api.trello.com/1/boards/${board}/actions?key=${key}&token=${token}`), {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
}
}
// näita ainult keywordiga liste
// see fetchi hoopis https://api.trello.com/1/boards/${board}/actions?key=${key}&token=${token}&filter=list_name:${keyword}



// uus kaart tehti, liigutati listi non-keyword listist?


// Kaart liigub listide vahel


// Kaart liigub keyword listist non-keyword listi ehk eemaldatakse


// Kaart arhiveeritakse


// Kaart taastatakse arhiivist


// Kaart kustutatakse täielikult
