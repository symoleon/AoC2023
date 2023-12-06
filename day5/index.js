import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const seedList = [];
const seedToSoilMap = [];
const soilToFertilizerMap = [];
const fertilizerToWaterMap = [];
const waterToLightMap = [];
const lightToTemperatureMap = [];
const temperatureToHumidityMap = [];
const humidityToLocationMap = [];


for (let i = 0; i < input.length; i++) {
	let line = input[i]; 
	line = line.split(":");
	switch (line[0]) {
		case "seeds":
			seedList.push(...line[1].trim().split(" ").map(seed => parseInt(seed)));
			// const list = line[1].trim().split(" ").map(seed => parseInt(seed));
			// for (let j = 0; j < list.length; j++) {
			// 	for (let k = list[j]; k < list[j] + list[j+1]; k++ ) {
			// 		seedList.push(k);
			// 	}
			// 	j++;
			// }
			break;
		case "seed-to-soil map": {
			while(true) {
				i++;
				line = input[i];
				if (line === "") {
					i++;
					break;
				}
				seedToSoilMap.push(line.split(" ").map(num => parseInt(num)));
			}
		}
		case "soil-to-fertilizer map": {
			while(true) {
				i++;
				line = input[i];
				if (line === "") {
					i++;
					break;
				}
				soilToFertilizerMap.push(line.split(" ").map(num => parseInt(num)));
			}
		}
		case "fertilizer-to-water map": {
			while(true) {
				i++;
				line = input[i];
				if (line === "") {
					i++;
					break;
				}
				fertilizerToWaterMap.push(line.split(" ").map(num => parseInt(num)));
			}
		}
		case "water-to-light map": {
			while(true) {
				i++;
				line = input[i];
				if (line === "") {
					i++;
					break;
				}
				waterToLightMap.push(line.split(" ").map(num => parseInt(num)));
			}
		}
		case "light-to-temperature map": {
			while(true) {
				i++;
				line = input[i];
				if (line === "") {
					i++;
					break;
				}
				lightToTemperatureMap.push(line.split(" ").map(num => parseInt(num)));
			}
		}
		case "temperature-to-humidity map": {
			while(true) {
				i++;
				line = input[i];
				if (line === "") {
					i++;
					break;
				}
				temperatureToHumidityMap.push(line.split(" ").map(num => parseInt(num)));
			}
		}
		case "humidity-to-location map": {
			while(true && i < input.length - 1) {
				i++;
				line = input[i];
				if (line === "") {
					i++;
					break;
				}
				humidityToLocationMap.push(line.split(" ").map(num => parseInt(num)));
			}
		}
	}
}

function mapSeed(seedList, map) {
	const mappedSeedList = [];
	for (let i = 0; i < seedList.length; i++) {
		const seed = seedList[i];
		let mapped = false;
		for (const fertilizer of map) {
			if (fertilizer[1] <= seed && seed <= fertilizer[2] + fertilizer[1] - 1) {
				mappedSeedList.push(fertilizer[0] + seed - fertilizer[1]);
				mapped = true;
				break;
			}
		}
		if (!mapped) {
			mappedSeedList.push(seed);
		}
	}
	return mappedSeedList;
}

const plantedSeedList = mapSeed(seedList, seedToSoilMap);
const fertilizedSeedList = mapSeed(plantedSeedList, soilToFertilizerMap);
const wateredSeedList = mapSeed(fertilizedSeedList, fertilizerToWaterMap);
const lightedSeedList = mapSeed(wateredSeedList, waterToLightMap);
const temperedSeedList = mapSeed(lightedSeedList, lightToTemperatureMap);
const humidifiedSeedList = mapSeed(temperedSeedList, temperatureToHumidityMap);
const locationSeedList = mapSeed(humidifiedSeedList, humidityToLocationMap);

let min = locationSeedList[0];
for (const location of locationSeedList) {
	if (location < min) {
		min = location;
	}
}

console.log(min);