import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const movePattern = input.shift().split('');
input.shift();

const mapArray = input.map((row) => {
    const [name, instruction] = row.split('=').map((x) => x.trim());
    const [left, right] = instruction.replaceAll(/[\(\)]/g, '').split(', ');
    return { name, left, right };
});

const map = new Map();

const currentList = [];

for (const element of mapArray) {
    map.set(element.name, element);
    if (element.name.endsWith('A')) currentList.push(element);
}

let stepCounter = 0;
// let current = map.get('AAA');
// while (current.name !== 'ZZZ') {
//     for (const move of movePattern) {
//         stepCounter++;
//         if (move === 'L') {
//             current = map.get(current.left);
//         } else {
//             current = map.get(current.right);
//         }
//         if (current.name === 'ZZZ') {
//             break;
//         }
//     }
// }
// console.log(stepCounter);

const stepNumberList = [];
for (const start of currentList) {
    stepCounter = 0;
    let current = start;
    while (!current.name.endsWith('Z')) {
        for (const move of movePattern) {
            stepCounter++;
            if (move === 'L') {
                current = map.get(current.left);
            } else {
                current = map.get(current.right);
            }
            if (current.name.endsWith('Z')) {
                break;
            }
        }
    }
    stepNumberList.push(stepCounter);
}

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
function lcm(a, b) {
    if (a === 0 || b === 0) {
        return 0;
    } else {
        return Math.abs(a * b) / gcd(a, b);
    }
}

console.log(stepNumberList.reduce((acc, cur) => lcm(acc, cur), 1));