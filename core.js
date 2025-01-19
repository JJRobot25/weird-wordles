let textInput = document.getElementById('text-input');
const output = document.getElementById('words-holder');
const title = document.getElementsByTagName('h1')[0].innerHTML;

let wordleType;
let solution;

if (title == 'Lockle') {
    wordleType = 'lockle';
    solution = randomdigitsgobrrr(4);
} else if (title == 'Lockle (5-digit version)') {
    wordleType = 'lockle-5';
    solution = randomdigitsgobrrr(5);
} else if (title == 'Passwordle (easy)') {
    wordleType = 'pass-e';
    solution = randomPassword(5, wordleType);
} else if (title == 'Passwordle (medium)') {
    wordleType = 'pass-m';
    solution = randomPassword(8, wordleType);
} else if (title == 'Passwordle (hard)') {
    wordleType = 'pass-h';
    solution = randomPassword(8, wordleType);
} else if (title == 'Passwordle (extreme)') {
    wordleType = 'pass-ex';
    solution = randomPassword(12, wordleType);
}

let tries = 0;

console.log(solution);

function keyPress(event) {
    if (event.key == "Enter") {
        let inputted_text = textInput.value;
        if (wordleType == 'pass-e' || wordleType == 'pass-m') {
            inputted_text = inputted_text.toUpperCase();
        }
        if (validate(inputted_text)) {
            tries++;
            compare(inputted_text, solution);
            textInput.value = '';

            if (output.innerHTML.includes('<br><p class="win">You won! Tries: ')) {
                window.scrollTo(0, document.body.scrollHeight);
            }
        }
    }
}

function validate (input) {
    toReturn = false;
    switch (wordleType) {
        case 'lockle':
            toReturn = /\d{4,4}/.test(input);
            break;
    
        case 'lockle-5':
            toReturn = /\d{5,5}/.test(input);
            break;

        case 'pass-e':
            toReturn = /[A-Z]{5,5}/.test(input);
            break;
        
        case 'pass-m':
            toReturn = /[A-Z\d]{8,8}/.test(input);
            break;

        case 'pass-h':
            toReturn = /[A-Za-z\d]{8,8}/.test(input);
            break;

        case 'pass-ex':
            toReturn = /.{12,12}/.test(input);
            break;

        default:
            break;
    }
    return toReturn;
}

function compare(input, correct) {
    let toReturn = '<p>';
    for (let i = 0; i < correct.length; i++) {
        if (input[i] == correct[i]) {
            toReturn += spanCreator(input[i], 'correct');
        } else if (correct.includes(input[i])) {
            toReturn += spanCreator(input[i], 'contains');
        } else {
            toReturn += spanCreator(input[i], '');
        }
    }
    toReturn += "</p>";
    if (input == correct) {
        toReturn += '<br><p class="win">You won! Tries: '+ tries + '</p>';
        textInput.readOnly = true;
    }
    output.innerHTML = output.innerHTML + toReturn;
}

function spanCreator(input, clas) {
    if (clas == '') {
        return '<span>'+ input + '</span>';
    } else {
        return '<span class="' + clas + '">' + input + '</span>';
    }
}

function randomdigitsgobrrr(amount) {
    let L = '';
    for (let i = 0; i < amount; i++) {
        R = Math.floor(Math.random()*10);
        L += R.toString();
    }
    return L;
}

function randomPassword(length, type) {
    let result = '';
    let characters = '';
    switch (type) {
        case 'pass-e':
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 'pass-m':
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            break;
        case 'pass-h':
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            break;
        case 'pass-ex':
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
            break;
        default:
            break;
    }

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        
    }
    return result;
}