import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const historyOfValue = input.map(history => {
    return history.split(' ').map(value => parseInt(value));
})

function calculateChangeArray(history) {
    const changeArray = [];
    for (let i = 1; i < history.length; i++) {
        changeArray.push(history[i] - history[i - 1]);
    }
    if (changeArray.every(value => value === 0)) {
        return [changeArray, history];
    } 
    return [...calculateChangeArray(changeArray), history];
}

function extrapolateNextValue(historyArray) {
    const changeArray = calculateChangeArray(historyArray);
    let nextValue = 0;
    for (let i = 1; i < changeArray.length; i++) {
        nextValue = changeArray[i].at(-1) + nextValue;
    }
    return nextValue;
}

const nextValuesList = historyOfValue.map(history => {
    return extrapolateNextValue(history);
});

console.log(nextValuesList.reduce((acc, value) => acc + value, 0));

function extrapolatePreviousValue(historyArray) {
    const changeArray = calculateChangeArray(historyArray);
    let previousValue = 0;
    for (let i = 1; i < changeArray.length; i++) {
        previousValue = changeArray[i][0] - previousValue;
    }
    return previousValue;
}

const previousValuesList = historyOfValue.map(history => {
    return extrapolatePreviousValue(history);
});

console.log(previousValuesList.reduce((acc, value) => acc + value, 0));