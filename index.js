'use strict'

const searchBtn = document.getElementById("button");
const playSound = document.getElementById("sound");
const resultSection = document.getElementById('result');
const container = document.querySelector('.container');

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";    //API
// const getWordData = function(word){   
//     fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((response) => {
//         return response.json();
//     }).then((data) => {
//         console.log(data);
//         console.log(data[0].meanings[0].definitions[0].definition);
//         console.log(data[0].meanings[0].definitions[0].example);
//         console.log(data[0].phonetics[0].audio);
//         console.log(data[0].meanings[0].partOfSpeech);
//         console.log(data[0].phonetic);
//     })
// }

searchBtn.addEventListener('click', () => {
    const word = document.getElementById("input").value;
    fetch(`${url}${word}`).then((response) =>    // FETCHING API AND HANDLING PROMISES USING then()
        response.json()).then((data) => {
        console.log(data);
        //html section for displaying search result
        resultSection.innerHTML = `
                    <div class="content">
                        <div class="sound-box">
                            <h2>${word.toUpperCase()}</h2>
                            <button class="play" onclick ="spellWord()">
                                <i class="fa-solid fa-play"></i>
                            </button>
                        </div>

                            <div class="phonetics">
                                <p>${data[0].meanings[0].partOfSpeech}</p>
                                <p class="italic">
                                    ${data[0].phonetic}
                                </p>
                            </div>


                        <div class="meaning">
                            <p class="para-meaning">
                                ${data[0].meanings[0].definitions[0].definition}
                            </p>
                            <p class="example">
                                ${data[0].meanings[0].definitions[0].example}
                            </p>
                            <h2 class="learning">HAPPY LEARNING 🚀</h2>
                        </div>

                    </div>`
                    playSound.setAttribute("src", data[0].phonetics[0].audio);
                    if(data[0].meanings[0].definitions[0].example === undefined){   //in case example is undefined
                        document.querySelector('.example').innerHTML = "How about making your own example😎";
                    }
    }).catch( (err) => {    //handling error
        const warning = document.createElement('h2');
        warning.classList.add('warning');
        warning.innerHTML = err;
    })
})

function spellWord(){
    playSound.play();    // play sound of the word
}
