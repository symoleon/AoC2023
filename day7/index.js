import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const symbolList = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];

const handList = input.map(hand => {
	return hand.split(' ');
});

function assignType(hand, withJoker = false) {
	const symbolsInHand = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	let jokerNumber = 0;
	for (const symbol of hand[0]) {
		if (symbol === 'J' && withJoker) {
			jokerNumber++;
		} else {
			symbolsInHand[symbolList.indexOf(symbol)]++;
		}
	}
	if (jokerNumber > 0) {
		const max = [...symbolsInHand].sort((a,b) => b - a)[0];
		symbolsInHand[symbolsInHand.indexOf(max)] += jokerNumber;
	}
	if (!symbolsInHand.some(symbol => symbol > 1)) {
		return 0;
	} else if (symbolsInHand.filter(symbol => symbol === 2).length === 1 && symbolsInHand.filter(symbol => symbol === 1).length === 3) {
		return 1;
	} else if (symbolsInHand.filter(symbol => symbol === 2).length === 2) {
		return 2;
	} else if (symbolsInHand.filter(symbol => symbol === 3).length === 1 && symbolsInHand.filter(symbol => symbol === 1).length === 2) {
		return 3;
	} else if (symbolsInHand.filter(symbol => symbol === 3).length === 1 && symbolsInHand.filter(symbol => symbol === 2).length === 1) {
		return 4;
	} else if (symbolsInHand.filter(symbol => symbol === 4).length === 1) {
		return 5;
	} else if (symbolsInHand.filter(symbol => symbol === 5).length === 1) {
		return 6;
	}
}

function compareHands(hand1, hand2) {
	const hand1Type = assignType(hand1);
	const hand2Type = assignType(hand2);
	if (hand1Type > hand2Type) {
		return 1;
	} else if (hand1Type < hand2Type) {
		return -1;
	} else {
		const hand1Symbols = hand1[0].split('').map(symbol => symbolList.indexOf(symbol));
		const hand2Symbols = hand2[0].split('').map(symbol => symbolList.indexOf(symbol));
		for (let i = 0; i < hand1Symbols.length; i++) {
			if (hand1Symbols[i] < hand2Symbols[i]) {
				return 1;
			} else if (hand1Symbols[i] > hand2Symbols[i]) {
				return -1;
			}
		}
	}
}

function compareHandsWithJoker(hand1, hand2) {
	const hand1Type = assignType(hand1, true);
	const hand2Type = assignType(hand2, true);
	if (hand1Type > hand2Type) {
		return 1;
	} else if (hand1Type < hand2Type) {
		return -1;
	} else {
		const hand1Symbols = hand1[0].split('').map(symbol => symbol == 'J' ? 100 : symbolList.indexOf(symbol));
		const hand2Symbols = hand2[0].split('').map(symbol => symbol == 'J' ? 100 : symbolList.indexOf(symbol));
		for (let i = 0; i < hand1Symbols.length; i++) {
			if (hand1Symbols[i] < hand2Symbols[i]) {
				return 1;
			} else if (hand1Symbols[i] > hand2Symbols[i]) {
				return -1;
			}
		}
	}
}

handList.sort(compareHands);
let sum = 0;
for (let i = 1; i <= handList.length; i++) {
	sum += i * parseInt(handList[i-1][1]);
}

handList.sort(compareHandsWithJoker);
let sum2 = 0;
for (let i = 1; i <= handList.length; i++) {
	sum2 += i * parseInt(handList[i-1][1]);
}

console.log(sum);
console.log(sum2);