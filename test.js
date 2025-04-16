import { readFileSync, writeFileSync } from 'fs';

const rawData = readFileSync('./movies.json');
const movies = JSON.parse(rawData);

const uniqueMovies = Array.from(
  new Set(movies.map(obj => JSON.stringify(obj)))
).map(str => JSON.parse(str));

writeFileSync('cleanedMovies.json', JSON.stringify(uniqueMovies, null, 2));