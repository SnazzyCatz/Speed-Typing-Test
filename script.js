
var paragraphs = [
  "She patiently waited for his number to be called. She had no desire to be there, but her mom had insisted that she go. She's resisted at first, but over time she realized it was simply easier to appease her and go. Mom tended to be that way. She would keep insisting until you wore down and did what she wanted. So, here she sat, patiently waiting for her number to be called. It was easy to spot her. All you needed to do was look at her socks. They were never a matching pair. One would be green while the other would be blue. One would reach her knee while the other barely touched her ankle. Every other part of her was perfect, but never the socks. They were her micro act of rebellion."
  , "He knew what he was supposed to do. That had been apparent from the beginning. That was what made the choice so difficult. What he was supposed to do and what he would do were not the same. This would have been fine if he were willing to face the inevitable consequences, but he wasn't. I haven't bailed on writing. Look, I'm generating a random paragraph at this very moment in an attempt to get my writing back on track. I am making an effort. I will start writing consistently again!"
  , "They argue. While the argument seems to be different the truth is it's always the same. Yes, the topic may be different or the circumstances, but when all said and done, it all came back to the same thing. They both knew it, but neither has the courage or strength to address the underlying issue. So they continue to argue. Her eyebrows were a shade darker than her hair. They were thick and almost horizontal, emphasizing the depth of her eyes. She was rather handsome than beautiful. Her face was captivating by reason of a certain frankness of expression and a contradictory subtle play of features. Her manner was engaging."
  , "The amber droplet hung from the branch, reaching fullness and ready to drop. It waited. While many of the other droplets were satisfied to form as big as they could and release, this droplet had other plans. It wanted to be part of history. It wanted to be remembered long after all the other droplets had dissolved into history. So it waited for the perfect specimen to fly by to trap and capture that it hoped would eventually be discovered hundreds of years in the future. It was that terrifying feeling you have as you tightly hold the covers over you with the knowledge that there is something hiding under your bed. You want to look, but you don't at the same time. You're frozen with fear and unable to act. That's where she found herself and she didn't know what to do next."
  , "It was that terrifying feeling you have as you tightly hold the covers over you with the knowledge that there is something hiding under your bed. You want to look, but you don't at the same time. You're frozen with fear and unable to act. That's where she found herself and she didn't know what to do next. It went through such rapid contortions that the little bear was forced to change his hold on it so many times he became confused in the darkness, and could not, for the life of him, tell whether he held the sheep right side up, or upside down."
]

const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

if(localStorage.getItem("scores")===null){
  var scores = []
  localStorage.setItem("scores", JSON.stringify(scores));
}

var start = false
var error = false
var count = 0

var x = 0

quoteInputElement.addEventListener('input', () => {
  start = true
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split(" ")
  let correct = true
  
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index] + " "
    if (character == (undefined + " ")) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
    
  })
  count = document.querySelectorAll('.correct');
  //console.log(count)

  if (correct) renderNewQuote()
})

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function getRandomQuote() {
  var randomNumber = getRandomNumber(5)
  return paragraphs[randomNumber].toLowerCase()
}

async function renderNewQuote() {
  const quote = getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split(' ').forEach(character => {
    const characterSpan = document.createElement('span')
    character = character + " "
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  startTimer()
}

let startTime
function startTimer() {
  timerElement.innerText = 10
 
  var interval = setInterval(() => {
    if (start == true) {
      timer.innerText -= 1
    }

    if (timer.innerText == 0) {
      document.getElementById("quoteInput").disabled = true
      clearInterval(interval)
      addData()
      displayScore()
    }
  }, 1000)

}

function addData() {
  counter = 0

  for (let x = 0; x < count.length; x++) {

    counter += count[x].innerHTML.toLowerCase().length
  }
  counter = Math.floor(counter / 5)
  console.log(counter)
  let storage = JSON.parse(localStorage.getItem("scores"));
  storage.unshift(counter)
  localStorage.setItem("scores", JSON.stringify(storage));
  displayScore()
}

function displayScore() {
  let storage = JSON.parse(localStorage.getItem("scores"));
  let element = document.getElementById("listScore")
  console.log("hi")
  element.innerText = ""

  for (let x = 0; x < storage.length; x++) {
    let li = document.createElement("li")
    li.innerHTML = storage[x] + " wpm"
    element.appendChild(li)
  }
}

renderNewQuote()
displayScore()