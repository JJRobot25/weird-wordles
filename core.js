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

const length = solution.length;

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

function compare(input) {
    let outputStr = ''; // C = correct, c = contains, _ = empty
    let timesUsedInSolution = new Map();
    let timesUsedInInput = new Map();
    let toReturn = '<p>';

    // Add used times to timesUsedInSolution for each char in solution, and 0 to timesUsedInInput for each char in input
    for (let i = 0; i < length; i++) {
        if (!timesUsedInSolution.has(solution[i])) {
            // Create new k-v
            timesUsedInSolution.set(solution[i], 1)
        } else {
            // Increase v
            v = timesUsedInSolution.get(solution[i]) + 1;
            timesUsedInSolution.set(solution[i], v);
        }

        timesUsedInInput.set(input[i], 0);
    }

    // Check for corrects, increase char uses in timesUsedInInput
    for (let i = 0; i < length; i++) {
        if (input[i] == solution[i]) {
            outputStr += 'C';
            if (!timesUsedInInput.has(input[i])) {
                // Create new k-v
                timesUsedInInput.set(input[i], 1)
            } else {
                // Increase v
                v = timesUsedInInput.get(input[i]) + 1;
                timesUsedInInput.set(input[i], v);
            }
        } else {
            outputStr += '_';
        }
    }
    
    // Check for contains, if timesUsedInInput < getUsedAmount(), and increase timesUsed
    for (let i = 0; i < length; i++) {
        if (solution.includes(input[i]) && timesUsedInInput.get(input[i]) < timesUsedInSolution.get(input[i])) {
            outputStr =  setCharAt(outputStr, i, 'c');
            // Increase v
            v = timesUsedInInput.get(input[i]) + 1;
            timesUsedInInput.set(input[i], v);
        }
    }


    // Create spans
    for (let i = 0; i < length; i++) {
        if (outputStr[i] == 'C') {
            toReturn += spanCreator(input[i], 'correct');
        } else if (outputStr[i] == 'c') {
            toReturn += spanCreator(input[i], 'contains');
        } else {
            toReturn += spanCreator(input[i], '');
        }
    }
    toReturn += "</p>";

    console.log(outputStr);

    if (input == solution) {
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

function setCharAt(str, index, char) {
    return str.substring(0,index) + char + str.substring(index+1);
}