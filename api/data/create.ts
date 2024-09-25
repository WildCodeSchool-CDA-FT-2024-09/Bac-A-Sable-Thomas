import fs from 'fs';

const testString: string = 'Hello World';

console.log(testString);

fs.writeFileSync('test.txt', testString);