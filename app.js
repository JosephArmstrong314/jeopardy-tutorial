const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
let score = 0

const jeopardyCategories = [
    {
        genre: "Lord of the Rings",
        questions: [
            {
                question: "Who wrote Lord of the Rings?",
                answers: ["JK Rowling","JRR Tolkein"],
                correct: "JRR Tolkein",
                level: "easy"
            },
            {
                question: "Where did Frodo get stabbed?",
                answers: ["Weathertop","Prancing Pony"],
                correct: "Weathertop",
                level: "medium"
            },
            {
                question: "Who is taller?",
                answers: ["Merry Brandibuck","Pippin Tuk"],
                correct: "Merry Brandibuck",
                level: "hard"
            }
        ]
    },
    {
        genre: "Starwars",
        questions: [
            {
                question: "Who has a blue lightsaber?",
                answers: ["Yoda","Anakin Skywalker"],
                correct: "Anakin Skywalker",
                level: "easy"
            },
            {
                question: "What order killed the jedi?",
                answers: ["68","66"],
                correct: "66",
                level: "medium"
            },
            {
                question: "Where were the droids manufactured?",
                answers: ["Geonosis","Kamino"],
                correct: "Geonosis",
                level: "hard"
            }
        ]
    },
    {
        genre: "The Hobbit",
        questions: [
            {
                question: "What is the name of the dragon?",
                answers: ["Mordred","Smaug"],
                correct: "Smaug",
                level: "easy"
            },
            {
                question: "What stone united the Dwarves?",
                answers: ["Mithril","Arkenstone"],
                correct: "Arkenstone",
                level: "medium"
            },
            {
                question: "Riddles in the ____?",
                answers: ["Dark","Night"],
                correct: "Dark",
                level: "hard"
            }
        ]
    },
    {
        genre: "Star Trek",
        questions: [
            {
                question: "Who is the doctor of Kirk's Enterprise?",
                answers: ["Dr. McCoy","Dr. Crusher"],
                correct: "Dr. McCoy",
                level: "easy"
            },
            {
                question: "What is Picard's Borg name?",
                answers: ["Locutis","Ender"],
                correct: "Locutis",
                level: "medium"
            },
            {
                question: "Who commanded the Enterprise earlier?",
                answers: ["Archer","Pike"],
                correct: "Pike",
                level: "hard"
            }
        ]
    },
    {
        genre: "Harry Potter",
        questions: [
            {
                question: "Who wrote Harry Potter?",
                answers: ["JK Rowling","JRR Tolkein"],
                correct: "JK Rowling",
                level: "easy"
            },
            {
                question: "Which Gringotts Vault is Harry's?",
                answers: ["687","594"],
                correct: "687",
                level: "medium"
            },
            {
                question: "What is Snape's Patronus?",
                answers: ["Doe","Raven"],
                correct: "Doe",
                level: "hard"
            }
        ]
    }
]

function addCategory(category) {
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML = category.genre

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(question => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if (question.level == "easy") {
            card.innerHTML = 100
        }
        if (question.level == "medium") {
            card.innerHTML = 200
        }
        if (question.level == "hard") {
            card.innerHTML = 300
        }

        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer-1', question.answers[0])
        card.setAttribute('data-answer-2', question.answers[1])
        card.setAttribute('data-correct', question.correct)
        card.setAttribute('data-value', card.getInnerHTML())

        card.addEventListener('click', flipCard)
    })
}

jeopardyCategories.forEach(category => addCategory(category))

const resetButton = document.getElementById("button")
resetButton.addEventListener("click", resetGame)

scoreDisplay.innerHTML = "0"



function resetGame() {
    location.reload()
}

function flipCard() {
    this.innerHTML = ""
    this.style.fontSize = "15px"
    this.style.lineHeight = "30px"

    const textDisplay = document.createElement("div")
    textDisplay.classList.add("card-text")
    textDisplay.innerHTML = this.getAttribute("data-question")

    const firstButton = document.createElement("button")
    const secondButton = document.createElement("button")

    firstButton.classList.add("first-button")
    secondButton.classList.add("second-button")

    firstButton.innerHTML = this.getAttribute("data-answer-1")
    secondButton.innerHTML = this.getAttribute("data-answer-2")

    firstButton.addEventListener("click", getResult)
    secondButton.addEventListener("click", getResult)
    
    this.append(textDisplay, firstButton, secondButton)

    const allCards = Array.from(document.querySelectorAll(".card"))

    allCards.forEach(card => card.removeEventListener("click", flipCard))

}

function getResult() {
    const allCards = Array.from(document.querySelectorAll(".card"))
    allCards.forEach(card => card.addEventListener("click", flipCard))

    const cardOfButton = this.parentElement

    if (cardOfButton.getAttribute("data-correct") == this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute("data-value"))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add("correct-answer")
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute("data-value")
        }, 100)
    } else {
        cardOfButton.classList.add("wrong-answer")
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = "0"
        }, 100)
    }
    cardOfButton.removeEventListener("click", flipCard)
}