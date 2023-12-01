import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const calibrationValue = input.map(input => {
	const numbers = input.match(/([0-9])+?/g).map(number => parseInt(number));
	return 10*numbers.at(0) + numbers.at(-1);
});

const numbers = input.map(input => {
	const codes = {
		one: 'o1e',
		two: 't2o',
		three: 't3e',
		four: 'f4r',
		five: 'f5e',
		six: 's6x',
		seven: 's7n',
		eight: 'e8t',
		nine: 'n9e',
	};
	for (const code in codes) {
		input = input.replaceAll(code, codes[code]);
	}
	const numbers = input.match(/([0-9])+?/g).map(number => parseInt(number));
	return 10*numbers.at(0) + numbers.at(-1);
});
console.log(calibrationValue.reduce((acc, curr) => acc + curr, 0));
console.log(numbers.reduce((acc, curr) => acc + curr, 0));
