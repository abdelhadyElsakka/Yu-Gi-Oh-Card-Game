var numOfCards= document.getElementsByClassName("card").length
var numOflifes= document.getElementsByClassName("life").length
var flag=numOfCards/2
var lifes=3


for (var cardsOrder=[],i=0;i<numOfCards;++i) cardsOrder[i]=i;
function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}



var userClickedCards = [];
var userClickedCardsIds = [];





for (var i=0;i<numOfCards;i++){
  document.getElementsByClassName("card")[i].addEventListener("click",function(){
    var img = this.lastElementChild.firstElementChild
    style = img.currentStyle || window.getComputedStyle(img, false),
    bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    userClickedCardsIds.push(this.id)

    if(userClickedCardsIds[0]!=userClickedCardsIds[1]){
      userClickedCards.push(bi)
      console.log(userClickedCards);
      

      if(userClickedCards.length==2 && userClickedCards[0]==userClickedCards[1]){
        var matchedSound = new Audio('sounds/matched.mp3');
        matchedSound.play();
        document.getElementById(`${userClickedCardsIds[0]}`).classList.add("done");
        document.getElementById(`${userClickedCardsIds[1]}`).classList.add("done");
        userClickedCardsIds=[];
        userClickedCards=[];
        flag--;

        if(flag==0){
          document.getElementById("win").style.visibility='visible';
          var winSound = new Audio('sounds/win.wav')
          winSound.play();
        }

      }else if(userClickedCards.length==2 && userClickedCards[0]!=userClickedCards[1]){
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        userClickedCardsIds=[];
        userClickedCards=[];
        console.log(userClickedCards);
      }else{
        console.log(userClickedCards);
      }
      
    }else if( userClickedCardsIds[0]==userClickedCardsIds[1]){
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
      userClickedCardsIds=[];
      userClickedCards=[];
      console.log(userClickedCards);
    }else{
      console.log(userClickedCardsIds);
    }
  })
}




document.getElementById('new_game').addEventListener('click',function(){
  var newGameSound = new Audio('sounds/newgame.wav');
  newGameSound.play();
  cardsOrder = shuffle(cardsOrder);
  document.getElementById("win").style.visibility='hidden';
  for(var i=0;i<numOfCards;i++){
    document.getElementsByClassName("card")[i].style.order=`${cardsOrder[i]}`;
    document.getElementsByClassName("card")[i].classList.remove("clicked");
    document.getElementsByClassName("card")[i].classList.remove("done");
  }
  for(var i=0;i<numOflifes;i++){
    document.getElementsByClassName("life")[i].style.visibility="visible";
  }
  flag=numOfCards/2
  lifes=3;
  userClickedCards = [];
  userClickedCardsIds = [];
})




document.getElementById('hint').addEventListener('click',function(){
  if(lifes>=1){
    for(var i=0;i<numOfCards;i++){
      var hintSound = new Audio('sounds/hint.wav')
      hintSound.play();
      document.getElementsByClassName("card")[i].classList.add("clicked");
      doSetTimeout(i)
    } 
    document.getElementsByClassName("life")[lifes-1].style.visibility="hidden";
  }else{
    var noHints = new Audio('sounds/nohints.mp3');
    noHints.play();
  }
  lifes--;
})





function doSetTimeout(i) {
  setTimeout(function() { 
    document.getElementsByClassName("card")[i].classList.remove("clicked"); 
  }, 2000);
}
