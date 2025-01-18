let numInput = document.getElementById('numInput');
const output = document.getElementById('words-holder');
const solution = fourdigitrandomintgobrrr();
let tries = 0;

console.log(solution);

function keyPress(event) {
    if (event.key == "Enter") {
        let inputted_text = numInput.value;
        if (validate(inputted_text)) {
            compareStrict(inputted_text, solution);
            numInput.value = '';
            tries++;
        }
    }
}

function validate (input) {
    return /\d{4,4}/.test(input);
}

function compareStrict(input, correct) {
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
        numInput.readOnly = true;
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

function fourdigitrandomintgobrrr() {
    let L = '';
    for (let i = 0; i < 4; i++) {
        R = Math.floor(Math.random()*10);
        L += R.toString();
    }
    return L;
}