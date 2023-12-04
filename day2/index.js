import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const games = input.map((line) =>  {
	line = line.split(':');
	const gameId = line[0].split(' ')[1];
	const reavelSets =  line[1].split(';');
	const cubes = reavelSets.map((set) => {
		const cubesMap = new Map();
		set = set.split(',');
		for (const cubes of set) {
			const  [number, color] = cubes.trim().split(' ');
			cubesMap.set(color, parseInt(number));
		}
		return cubesMap;
	});
	return {id: parseInt(gameId), cubes};
});
let sum = 0;
for (const game of games) {
	let validSet = true;
	for (const cubeSet of game.cubes) {
		if (cubeSet.get('red') > 12 || cubeSet.get('blue') > 14 || cubeSet.get('green') > 13) {
			validSet = false;
			break;
		}
	}
	if (validSet) {
		sum += game.id;
	}
}

console.log(sum);

let sum2 = 0;
for (const game of games) {
	let minRed = 0;
	let minBlue = 0;
	let minGreen = 0;
	for (const cubeSet of game.cubes) {
		if (cubeSet.get('red') > minRed) {
			minRed = cubeSet.get('red');
		}
		if (cubeSet.get('blue') > minBlue) {
			minBlue = cubeSet.get('blue');
		}
		if (cubeSet.get('green') > minGreen) {
			minGreen = cubeSet.get('green');
		}
	}
	const power = minRed * minBlue * minGreen;
	sum2 += power;
}

console.log(sum2);