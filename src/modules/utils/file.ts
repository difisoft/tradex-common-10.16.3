import fs from 'fs';

function readTextFromFile(file: string, callback: (err: any, data: string) => void) {
    fs.readFile(file, 'utf8', callback);
}

export {
    readTextFromFile,
}
