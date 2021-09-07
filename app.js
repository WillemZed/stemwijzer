/*subjects.forEach(function(subjects){ 
    console.log(subjects)
}
)*/

var stemmen = [];
let currentSubject = 0;
let answerArray = [];
var partySize = 9
var partyResults = []

parties.forEach(party => {
    party.points = 0;
}); 

subjects.forEach(subject => {
    subject.important = false;
});

const intro = document.getElementById("intro");
const seeResults = document.getElementById("checkResults");
const calcRes = document.getElementById("showResults")
const importantStatement = document.getElementById("important");
const choiceBtn = document.getElementById("choiceBtn")
const startButton = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const previousBtn =document.getElementById("previousBtn");
const titleHeader = document.getElementById("title");
const statementPar = document.getElementById("statement");
const partiePar = document.getElementById("parties");
const eensBtn = document.getElementById("pro");
const oneensBtn = document.getElementById("contra");
const gvBeideBtn = document.getElementById("none");
const filterSecular = document.getElementById("secular");
const filterAll = document.getElementById("all");
const filterBig = document.getElementById("big");
const uitslagen = document.getElementById("uitslagen");
const partijen = document.getElementById("partijen");
const buttons = document.getElementsByClassName("btn");
const home = document.getElementById("home");


startButton.onclick = clickStartBtn;
nextBtn.onclick = skipStatement;
previousBtn.onclick = previousStatement;
filterSecular.onclick = getSecularParties;
filterAll.onclick = getAllParties;
filterBig.onclick = getBigParties;
calcRes.onclick = resultCalc;
home.onclick = returnHome;

eensBtn.onclick = (event) => {
    processAnswer("pro");
}
oneensBtn.onclick = (event) => {
    processAnswer("contra");
}
gvBeideBtn.onclick = (event) => {
    processAnswer("none");
}

function clickStartBtn() {
    const container = document.getElementById("container");
    show(container);
    show(nextBtn);
    show(previousBtn);
    show(choiceBtn);
    hide(intro);
    hide(start);

    titleHeader.innerHTML = subjects[currentSubject].title;
    statementPar.innerHTML = subjects[currentSubject].statement;

    colorBtn();
}

//colors the choice previously clicked
function colorBtn(){
    if(subjects[currentSubject].answerArray){
        eensBtn.classList.remove("remember-btn");
        gvBeideBtn.classList.remove("remember-btn");
        oneensBtn.classList.remove("remember-btn");
        document.getElementById(subjects[currentSubject].answerArray).classList.add("remember-btn");
    }else{
        eensBtn.classList.remove("remember-btn");
        gvBeideBtn.classList.remove("remember-btn");
        oneensBtn.classList.remove("remember-btn");
    }
}

//skips the current statement
function skipStatement() {
    currentSubject++
    if(currentSubject < subjects.length){
        titleHeader.innerHTML = subjects[currentSubject].title;
        statementPar.innerHTML = subjects[currentSubject].statement;
    } else {
        currentSubject--
    }
    console.log(currentSubject);
    colorBtn();
}

//goes to the previous statement
function previousStatement() {
    if (currentSubject != "0") {   
        currentSubject--
        if(currentSubject < subjects.length){
            titleHeader.innerHTML = subjects[currentSubject].title;
            statementPar.innerHTML = subjects[currentSubject].statement;
        }
    }
    console.log(currentSubject);
    colorBtn();
}

function processAnswer(insert){
    choice(insert);
    if ((subjects.length -1) == currentSubject){
        calculate();
        displayResultButtons();
        sortParties();
    }else {
        currentSubject ++;
        titleHeader.innerHTML = subjects[currentSubject].title;
        statementPar.innerHTML = subjects[currentSubject].statement;; 
        rememberChoice();
    }
    console.log(currentSubject);
    colorBtn();
}

function choice(insert){
    subjects[currentSubject].answerArray = insert;
    subjects[currentSubject].important = importantStatement.checked;
    console.log(subjects[currentSubject].answerArray);
    console.log(subjects[currentSubject].important);
}

function compare() {
    var i = 0
    subjects.forEach(subject => {
        subject.parties.forEach(subjectParty => {
            if(answerArray[i] == subjectParty.position) {

            }
        })
    i++    
    })
    
}


//show element
function show(element) {
    element.classList.remove("hidden")
}

//hide element
function hide(element) {
    element.classList.add("hidden")
}

//color element
function color(element) {
    element.style.backgroundColor = "green"
}


function unColor(element) {
    element.style.backgroundColor = "lightgray"
}

//goes to next statement whenever it is used
function next() {
    currentSubject++
        if(currentSubject < subjects.length){
            titleHeader.innerHTML = subjects[currentSubject].title;
            statementPar.innerHTML = subjects[currentSubject].statement;
        } else {
            currentSubject--
        }
}

function rememberChoice(){
    importantStatement.checked = false;

    if(subjects[currentSubject].important == true){
        importantStatement.checked = true;
    }
}

function calculate(){
    subjects.forEach(subject => {
        subject.parties.forEach(partyPar =>{
            if(subject.answerArray == partyPar.position){
                var partyScore = parties.find(party => party.name == partyPar.name);
                if(subject.important == true) {
                    partyScore.points += 2;
                }else {
                    partyScore.points += 1;
                }
            }
        });
    });

}   
function displayResultButtons(){
    hide(container);
    hide(choiceBtn);
    hide(previousBtn);
    hide(nextBtn);
    show(seeResults);
}

// this function selects all parties that are "big". This value is set within a var on row 4
function getBigParties() {
    partyResults = [];

    filterAll.classList.remove("remember-btn");
    filterSecular.classList.remove("remember-btn");
    filterBig.classList.add("remember-btn");

    partyResults = parties.filter(party => {
        return party.size >= partySize;
    });
}

// this function filters all secular parties
function getSecularParties() {
    partyResults = [];

    filterAll.classList.remove("remember-btn");
    filterBig.classList.remove("remember-btn");
    filterSecular.classList.add("remember-btn");

    partyResults = parties.filter(party => {
        return party.secular == true;
    }); 
}

// this function selects all parties within the party array
function getAllParties() {
    partyResults = [];

    filterBig.classList.remove("remember-btn");
    filterSecular.classList.remove("remember-btn");
    filterAll.classList.add("remember-btn");

    partyResults = parties;
}

function sortParties(){
    parties.sort(function (a, b) {
        return b.points - a.points;
    });
    console.log(parties);
}

function ok(){
    let counter = 0;
    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i].important === true) counter++;
    }  
    return(counter);
}

function resultCalc(){
    if(partyResults.length == 0) {
        return alert('Kies uit de drie onderstaande knoppen om je resultaat te zien');
    }

    hide(seeResults);
    show(uitslagen);
    hide(previousBtn);
    displayPartyResults();
}

// this functions shows the results of the voting guide
function displayPartyResults(){
    var x = ok();

    partyResults.forEach(party => {
        var percentage = 100 / (subjects.length + x) * party.points;

        var p = percentage.toFixed(0);
            partijen.innerHTML+=party.name + " " + p + "%" + "</br>";   
        console.log(p)
    });
}


function returnHome(){
    location.reload();
}



// DOM Manipulation
// functions, parameters
// eventhandlers
// arrays en objects in javascript
// changing styles in javascript 
