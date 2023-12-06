import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const cardList = input.map((row) => {
	const [cardId, sequence] = row.split(':');
	const [winning, scratched] = sequence.trim().split("|").map((sequence) => {
		sequence = sequence.replaceAll("  ", " ");
		return sequence.trim().split(" ").map((number) => {
			return parseInt(number);
		});
	});
	return {winning, scratched};
})

let sum = 0;
const cardsWinningNumberCount = [];
for (const card of cardList) {
	const winning = card.winning;
	const scratched = card.scratched;
	let winningNumberCount = 0;
	for (const number of scratched) {
		if (winning.includes(number)) {
			winningNumberCount++;
		}
	}
	if (winningNumberCount >= 1)  {
		sum += 2**(winningNumberCount-1);
	}
	cardsWinningNumberCount.push(winningNumberCount);
}

console.log(sum);
const cardCount = [];
for (let i = 0; i < cardList.length; i++) {
	cardCount.push(1);
}
for (let i = 0; i < cardsWinningNumberCount.length; i++) {
	for (let k = cardCount[i]; k > 0; k--) {
		for (let j = i + 1; j < cardsWinningNumberCount[i] + i + 1; j++) {
			cardCount[j]++;
		}
	}
}

console.log(cardCount.reduce((a, b) => a + b, 0));