import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');
const grid = input.map((row) => row.split(''));

const borderY = grid.length - 1;
const borderX = grid[0].length - 1;
const partNumberList = [];

const possibleGearCords = [];

for (let y = 0; y < grid.length; y++) {
	let numberCounter = 0;
	let validPartNumber = false;
  	for (let x = 0; x < grid[y].length; x++) {
		if (grid[y][x].match(/\*/)) {
			possibleGearCords.push({y, x});
		}
		if (grid[y][x].match(/[0-9]/)) {
			numberCounter++;
			const maxY = y == borderY ? y : y + 1;
			const maxX = x == borderX ? x : x + 1;
			for (let i = y > 0 ? y - 1 : y; i <= maxY; i++) {
				for (let j = x > 0 ? x - 1 : x; j <= maxX; j++) {
					if (grid[i][j].match(/[^0-9.]/)) {
						validPartNumber = true;
					}
				}
			}
		} 
		if(grid[y][x].match(/[^0-9]/) || x == borderX) {
			if (validPartNumber && numberCounter > 0) {
				if (x == borderX && grid[y][x].match(/[0-9]/)) {
					x++;
				} 
				let number = parseInt(grid[y][x-numberCounter]);
				while (numberCounter > 1) {
					numberCounter--;
					number *= 10;
					number += parseInt(grid[y][x-numberCounter]);
				}
				partNumberList.push(number);
				validPartNumber = false;
				numberCounter = 0;
			} else {
				validPartNumber = false;
				numberCounter = 0;
			}
		}
  	}
}

const sum = partNumberList.reduce((a, b) => a + b, 0);

console.log(sum);

// console.log(possibleGearCords);
const gearCordList = [];
const gearUnidentifiedNumbers = new Map();
for (const possibleGear of possibleGearCords) {
	let numberCounter = 0;
	const numberCords = [];
	for (let y = possibleGear.y - 1; y <= possibleGear.y + 1; y++) {
		for (let x = possibleGear.x - 1; x <= possibleGear.x + 1; x++) {
			if (grid[y][x].match(/[0-9]/)) {
				if (numberCounter == 0) {
					numberCords.push({y, x});
					numberCounter++;
				} else if (numberCords[0].y != y || (x - numberCords[0].x > 1 && grid[numberCords[0].y][possibleGear.x].match(/[^0-9]/))) {
					numberCords.push({y, x});
					numberCounter++;
				}
			}
			if (numberCounter == 2) {
				break;
			}
		}
		if (numberCounter == 2) {
			break;
		}
	}
	if (numberCounter == 2) {
		gearCordList.push(possibleGear);
		gearUnidentifiedNumbers.set(possibleGear, numberCords);
	}
}

function findNumber(x, y, direction) {
	let number = "";
	if (direction == "left") {
		while (--x >= 0 && grid[y][x].match(/[0-9]/)) {
			number = grid[y][x] + number;
		}
	} else if (direction == "right") {
		while (++x <= borderX && grid[y][x].match(/[0-9]/)) {
			number = number + grid[y][x];
		}
	}
	return number;
}
let sum2 = 0;
for (const gear of gearCordList) {
	const numberCords = gearUnidentifiedNumbers.get(gear);
	const number1 = findNumber(numberCords[0].x, numberCords[0].y, "left") + grid[numberCords[0].y][numberCords[0].x] + findNumber(numberCords[0].x, numberCords[0].y, "right");
	const number2 = findNumber(numberCords[1].x, numberCords[1].y, "left") + grid[numberCords[1].y][numberCords[1].x] + findNumber(numberCords[1].x, numberCords[1].y, "right");
	gear.ratio = parseInt(number1) * parseInt(number2);
	sum2 += gear.ratio;
}



console.log(sum2);