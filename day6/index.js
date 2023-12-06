import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const timeList = input[0].split(':')[1].trim().replaceAll(/\ +/g, ' ').split(' ').map(Number);
const distanceList = input[1].split(':')[1].trim().replaceAll(/\ +/g, ' ').split(' ').map(Number);

function waysOfWinning(time, distance) {
	const sqrtDelta = Math.sqrt((time**2) - 4 * distance);
	const x1 = Math.ceil((-time + sqrtDelta) / -2);
	const x2 = ((-time - sqrtDelta) / -2);
	if (x2 > Math.floor(x2)) {
		return (Math.floor(x2) - x1 + 1);
	} else {
		return (x2 - x1 - 1);
	}
}

let sum = 1;

for (let i = 0; i < timeList.length; i++) {
	sum *= waysOfWinning(timeList[i], distanceList[i]);
}

console.log(sum);

const time = parseInt(input[0].split(':')[1].trim().replaceAll(/\ +/g, ''));
const distance = parseInt(input[1].split(':')[1].trim().replaceAll(/\ +/g, ''));

console.log(waysOfWinning(time, distance));