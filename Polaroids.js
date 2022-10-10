"use strict"

const BASEURL = "http://deckofcardsapi.com/api/deck/";
let deckId = '';

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
const randomSign = () => Math.random() >= 0.5 ? 1 : -1;

/**GetDeckID takes no parameters
 * Calls deckofcardsAPI
 * Returns a deckId as string.
 */
async function getDeckId() {
  const deckP = await axios.get(`${BASEURL}new/shuffle/?deck_count=1`);
  // const deckId = deckP.data.deck_id;
  // return deckId;
  deckId = deckP.data.deck_id;
}

/**drawCard takes a deckId (Str) as parameter.
 * Calls deckofcardsAPI
 * Returns card value and suit in a single string.
 */
async function drawCard(deckId) {
  const card1P = await axios.get(`${BASEURL}${deckId}/draw/?count=1`);
  // return `${card1P.data.cards[0].value} of ${card1P.data.cards[0].suit}`
  return card1P.data.cards[0].image;
}

/**GetDeckAndDrawTwoCards takes no parameters.
 * Console.logs()
 * TODO: Confirm if each call is a new succsessive ID.
*/
async function getDeckAndDrawTwoCards() {
  const deckId = await getDeckId();
  const card1 = await drawCard(deckId);
  const card2 = await drawCard(deckId);
  console.log(card1 + " , " + card2)
}

/**createCard takes a card image string value
 * Creates a img tag nested in a div and appends to the DOM.
 * Returns the created card element.
*/
function createCard(img){
  const $holder = $("<div>");
  $holder.attr('class','card');

  const $imgTag = $("<img>");
  $imgTag.attr('src',img);
  $imgTag.attr('style',`transform:rotate(${Math.random()}turn)`);
  // transform: rotate(0);


  $holder.append($imgTag);

  return $holder;
}

/** appendCard takes:
 * Call drawCard for the card's image value.
 * Calls createCard to get html
 * Appends to DOM in #placedcards div.
 *  */
 async function appendCard(){
  console.log(appendCard);
  console.log(deckId);
  const cardImage = await drawCard(deckId);
  const cardHtml = createCard(cardImage);

  // $("#placedcards").prepend(cardHtml);
  // $("#placedcards").append(cardHtml);
  $("#placeAll").append(cardHtml);

}


// _______________________________________________________________ Polaroid Work

// FIXME: Check for Poloroid spelling mistakes.
/**createPolaroid takes a static image string value
 * Returns the created polaroid element.
 *
 * Dev Help:
 * 1. Create all elements
 * 2. Append all elements
 * 3. Return top most wrapper <div/>
 *
 *   <div class="wrapper">
      <div class="item">
        <div class="polaroid">
          <img src="https://image...jpg">
          <div class="caption">I Miss London</div>
        </div>
      </div>
    </div>
*/
function createPolaroid(){
  const imgValue = "https://image.ibb.co/b8UJBc/administration_architecture_big_ben_221166.jpg";
  /**testPhotoURL takes a number parameter and returns a full photo URL */
  function testPhotoURL(){
    let randInt = getRndInteger(1,11);
    let baseURL = `https://raw.githubusercontent.com/Clair-Hawkes/polaroids/main/testPhotos/building_${randInt}.JPG`;
    return baseURL;
  }
  const captionText = 'I love Big Ben!';

  // _________ 1. Create all elements
  // Outermost - Wrapper Div
  // <div class="wrapper">
  const $wrapper = $("<div>");
  $wrapper.attr('class','wrapper');

  // Item Div
  // <div class="item">
  const $item = $("<div>");
  $item.attr('class',"item");
  console.log($item);

  $wrapper.append($item);


  //Polaroid Div
  const $polaroid = $('<div>');
  $polaroid.attr('class','polaroid');
  $polaroid.attr('style',`transform:rotate(${randomSign()*(getRndInteger(0,7)*0.01)}turn)`);


  //img
  const $polaroidPicture = $("<img>");
  // $polaroidPicture.attr('src',imgValue);
  $polaroidPicture.attr('src',testPhotoURL());
  //Caption Div
  const $caption = $('<div>');
  $caption.attr('class','caption');
  // $caption.text(captionText);

  // ___________ 2. Append all Element in order
  $polaroid.append($polaroidPicture);
  $polaroid.append($caption);

  $item.append($polaroid);


  return $wrapper;
}

/** appendPolaroid takes:
 * Call drawCard for the card's image value.
 * Calls createCard to get html
 * Appends to DOM in #placedcards div.
 *  */
function appendPolaroid(){
  console.log(appendPolaroid);
  const polaroidHtml = createPolaroid();

  // $("#placedPolaroids").append(polaroidHtml);
  $("#placeAll").append(polaroidHtml);
}






// EVENT LISTENER FOR PAGE LOAD, CALL getDeck...
$("body").ready(getDeckId)



// EVENT LISTENER for button click, Call drawCard...
// $("#draw").on("click",deckId,appendCard)
$("#draw").on("click",appendCard)

// EVENT LISTENER for button click, Call drawPolaroid
$("#snapshot").on("click",appendPolaroid)





// Create a div
// Create a nested img tag
// Set the img tag source to card img value
//






























// const FAVNUM = '42';
// const FAVNUMS = '42,45,57..60'
// const NUMAPIURL = `http://numbersapi.com/`;

// /**
//  * callNumAPI will take a fav num; call numsAPI;
//  * Create a htmlTag of num fact; And append to the html Dom,
//  *  Returns nothing.
//  */
// async function callNumAPI(favNum){
//   const factP = await axios.get(`${NUMAPIURL}${FAVNUMS}`);
//   const $htmlBody = $("body")
//   console.log(factP);

//   for(let fact in factP.data){
//     console.log
//     const $paraTag = $("<p></p>");

//     $paraTag.text(factP.data[fact]);
//     $htmlBody.append($paraTag);
//   }
// }






