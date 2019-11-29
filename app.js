let scoreCount = 0;//----------------------------------counter node!
let iconList = getIconLists();//-----------------get icon node list.
let restart = document.querySelector(".restart");//----restart node.
let turnCard = document.getElementById("cards");//---turn card back.
randomIcon();//--------when open or reload webpage random the icons;
randomNextCade();//------when open the webpage random the left icon;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function randomNextCade() {
  let nextCard = document.querySelector("#next-card i");
  nextCard.className = getIconLists()[getRandomInt(0, 11)];
}

function shuffle(lists) {
  let len = document.querySelectorAll("#cards .card .fas").length;
  let newList = [];
  for (let j = 0; j < len; j++) {
    let randomList = getRandomInt(0, lists.length - 1);
    newList.push(lists[randomList]);
    lists.splice(randomList, 1);
  }
  return newList;
}

function getIconLists() {
  let iconsNode = document.querySelectorAll("#cards .card .fas");
  let temp = [];
  for (let i = 0; i < iconsNode.length; i++) {
    temp.push(iconsNode[i].className);
  }
  return temp;
}

function randomIcon() {
  let icons = document.querySelectorAll("#cards .card .fas");
  let randomList = shuffle(getIconLists());
  for (let i = 0; i < icons.length; i++) {
    icons[i].className = randomList[i];
  }
};

function turnCardsBack() {
  let cardsNode = document.querySelectorAll("#cards .card");
  for (let i = 0; i < cardsNode.length; i++) {
    cardsNode[i].className = "card";
  }
};

//------------------------------on click restart------------------------

restart.addEventListener("click", randomIcon);
restart.addEventListener("click", turnCardsBack);
restart.addEventListener("click", function () {
  let nextCard = document.querySelector("#next-card i");
  nextCard.className = getIconLists()[getRandomInt(0, 11)];
  scoreCount = 0;
  document.getElementById("score").innerHTML = 0;
});

//---------------------------------on click for game---------------------
turnCard.addEventListener("click", function (e) {

  let markClass = document.querySelectorAll(".markClass");//add a marker class and soon will delete it
  if (!(e.target.classList.contains("matched")) && e.target.nodeName === "LI" && markClass.length < 1) {
    e.target.className = "card show markClass";
  };

  let record = document.getElementById("score");
  markClass = document.querySelectorAll(".markClass");
  if (markClass.length === 1) {
    if (markClass[0].querySelector(".fas").className !== document.querySelector("#next-card i").className) {
      setTimeout(() => (markClass[0].className = "card"), 500);
      record.innerHTML = ++scoreCount;//
    } else {
      markClass[0].className = "card matched show";
      let nextCard = document.querySelector("#next-card i");
      let iconIndex = iconList.indexOf(markClass[0].querySelector(".fas").className);
      iconList.splice(iconIndex, 1);
      nextCard.className = iconList[getRandomInt(0, iconList.length - 1)];
      record.innerHTML = ++scoreCount;
    }

    if (iconList.length === 0) {
      alert("All done!");
      iconList = getIconLists();
    }
  };
})