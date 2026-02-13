const keyBoard = {
    "й":"l1",
    "ц":"l2",
    "у":"l3",
    "ү":"l4",
    "к":"l5",
    "е":"l6",
    "н":"l7",
    "ң":"l8",
    "г":"l9",
    "ш":"l10",
    "щ":"l11",
    "з":"l12",
    "х":"l13",
    "ъ":"l14",
    "ф":"l15",
    "ы":"l16",
    "в":"l17",
    "а":"l18",
    "п":"l19",
    "р":"l20",
    "о":"l21",
    "ө":"l22",
    "л":"l23",
    "д":"l24",
    "ж":"l25",
    "э":"l26",
    "я":"l27",
    "ч":"l28",
    "с":"l29",
    "м":"l30",
    "и":"l31",
    "т":"l32",
    "ь":"l33",
    "б":"l34",
    "ю":"l35",
}

const kyr = "абвгдежзийклмнопрстуфхцчшщъыьэюяөүң";

const rowEmpty = [true, true, true, true, true, true];
//get the secret word secret word
const wordEl = document.getElementById('secret');
const word = wordEl.innerHTML;

//word that user guessed
let guess= "";

//to get empty row
function getRowIdx(){
    for(let i = 0; i<6; i++){
        if(rowEmpty[i] == true){
            return i+1;
        }
    }
}

//paint the keyboard
function paintKeyboard(char, color){
    const key = document.getElementById(`${keyBoard[char]}`);
    if(key.style.backgroundColor != "green")
        key.style.backgroundColor = color;
}

function paintLetter(i, color){
    rowIdx = getRowIdx();
    const letterEl = document.getElementById(`r${rowIdx}c${i+1}`).parentElement;
    
    if(letterEl.style.backgroundColor != "green")
        letterEl.style.backgroundColor = color;
}

// Counts frequency of letter in original word
let originalWord = {
    // from what letters the word contains
    
}
//verifies if letter already has corner number
let haveNumber = {

}

// distribute letters of word to dictionary -> originalWord
for(let i = 0; i<word.length; i++){
    if(originalWord[word[i]])
        originalWord[word[i]]++;
    else{
        originalWord[word[i]]=1;
    }
    haveNumber[word[i]] = false;
}

//copy of originalWorld
let copyOriginalWord = {...originalWord};

//copy for corner number handler
let copyHaveNumber = {...haveNumber};

//mark corner number - how many times this letter appears
function cornerNumber(i,count){
    rowIdx = getRowIdx();
    const letterEl = document.getElementById(`r${rowIdx}c${i+1}`).nextElementSibling;

    letterEl.innerHTML = count;
}

//check if user won
function isWon(){
    if(guess == word)
        return true;
    else
        return false;
}

//to process the word guessed by user
function process(){
    console.log(originalWord);
    for(let i = 0; i<guess.length; i++){
        for(let j = 0; j<word.length; j++){
            if(guess[i]==word[j]){
                if(i == j){
                    paintKeyboard(guess[i], "green");
                    paintLetter(i, "green");
                    
                    if(originalWord[guess[i]]>1){
                        cornerNumber(i,originalWord[guess[i]]);
                        haveNumber[guess[i]]=true;
                    }

                    originalWord[guess[i]]--;
                }
            }
        }
    }


    for (let i = 0; i<guess.length; i++){
        let count = 0;
        for(let j = 0; j<word.length; j++){
            if(guess[i] == word[j]){
                if(originalWord[guess[i]]){

                    paintKeyboard(guess[i], "yellow");
                    paintLetter(i, "yellow");
                    count++;

                    if(originalWord[guess[i]]>1 && !haveNumber[guess[i]]){
                        cornerNumber(i,originalWord[guess[i]]);
                        haveNumber[guess[i]]=true;
                    }

                }
            }
        }
        
        //paint to black the key if count is zero
        if(count==0){
            paintKeyboard(guess[i], "grey");
            paintLetter(i, "grey");
        }

    }

    let idx = getRowIdx()-1;

    if(isWon()){
        const winEl = document.getElementById('win');
        winEl.firstChild.nodeValue = `Туура таптың! Сөз: ${word} болчу`;
        winEl.removeAttribute("hidden");

        document.removeEventListener('click', handleClick);
    }
    else{
        if(idx == 5){
            const lostEl = document.getElementById('lost');
            lostEl.firstChild.nodeValue = `Утулдуң, cөз ${word} болчу`;
            lostEl.removeAttribute('hidden');
            document.removeEventListener('keydown', handleKeyDown);
        }
        else{
            rowEmpty[idx] = false;
            originalWord = {...copyOriginalWord};
            haveNumber = {...copyHaveNumber};
        }
    }

    guess = '';
    
};


//check if user enters kyrgyz letters, backspace and enter only
function checkSpelling(word){
    if(word == "backspace" || word == "⌫")
        return true;
    if(word == "enter" || word == "enter")
        return true;
    for(let j = 0; j<word.length; j++){
        let fl = false;
        for(let i = 0; i<kyr.length; i++){
            if(word[j] == kyr[i]){
                fl = true;
                break;
            }
        }
        if(!fl)
            return false;
    }
    return true;
}


//handleClick function
function handleClick(click){
    //every time choose empty row
    let emptyRowIdx = getRowIdx();
    
    //what keyboard was pressed
    const pressedKey = document.getElementById(click.target.id);
    
    if(pressedKey){
        if(pressedKey.id[0] != 'l' && pressedKey.id != 'back' && pressedKey.id != "enter")
            return null;

        //check if the char is valid
        if(checkSpelling(pressedKey.firstChild.nodeValue.trim().toLowerCase())){
            
            //if Enter
            if(pressedKey.id == "enter"){
                if(guess.length == word.length){
                    process();
                }
            }

            //if Backspace
            else if(pressedKey.id == "back"){
                for(let i = word.length; i>0; i--){
                    const tile = document.getElementById(`r${emptyRowIdx}c${i}`);
                    if(tile.innerHTML){
                        tile.innerHTML = "";
                        guess = guess.slice(0,-1);
                        break;
                    }
                }
            }
            
            // what tile is empty to fill with letter
            else
            for(let i = 1; i<=word.length; i++){
                const tile = document.getElementById(`r${emptyRowIdx}c${i}`);

                if(!tile.innerHTML){
                    tile.innerHTML = pressedKey.innerHTML;
                    if(guess.length < word.length)
                        guess += pressedKey.innerHTML;
                    break;
                }
            }

        }
    }
}

//handleKeyDown function
function handleKeyDown(event){
    const key = event.key.toLowerCase();
    if(checkSpelling(key)){
        if(key == "backspace"){
            for(let i = guess.length; i>0; i++){
                const tile = document.getElementById(`r${getRowIdx()}c${i}`);

                if(tile.innerHTML){
                    tile.innerHTML = "";
                    guess = guess.slice(0,-1);
                    break;
                }
            }
        }

        else if(key == "enter"){
            if(guess.length == word.length){
                process();
            }
        }

        else
            for(let i = 1; i<=word.length; i++){
                const tile = document.getElementById(`r${getRowIdx()}c${i}`);

                if(!tile.innerHTML){
                    tile.innerHTML = key;
                    if(guess.length < word.length)
                        guess += key;
                    break;
                }
            }
    }

}

//every time user clicks on screen keyboard this below trigers
document.addEventListener('click', handleClick);


// every time user enters from their keyboard
document.addEventListener('keydown', handleKeyDown);