import { readFileSync, writeFileSync } from 'fs';

const rawData = readFileSync('./celebrities.json');
const celebrities = JSON.parse(rawData);

const uniqueCelebrities = Array.from(
  new Set(celebrities.map(obj => JSON.stringify(obj)))
).map(str => JSON.parse(str));

writeFileSync('cleanedCelebrities.json', JSON.stringify(uniqueCelebrities, null, 2));
