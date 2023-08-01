const fs = require("fs");
const fileUrl = process.argv[2];
// console.log(process.argv[2]);
const outputUrl = createOutputUrl(fileUrl);
const data = readFile(fileUrl);

if (data) {
    const report = createReport(data);
    writeData(outputUrl, report);
}

function createOutputUrl(url) {
    const splittedUrl = url.split('.');
    // const finalUrl = '.' + splittedUrl[1] + '-report.' + splittedUrl[2];
    const lastPart = splittedUrl.pop();
    const firstPart = splittedUrl.join('.');
    const finalUrl = firstPart + '-report.' + lastPart;

    return finalUrl;
}

function createReport(data) {
    let report = "Numero caratteri: " + countChars(data) + '\n' + "Numero di parole: " + countWords(data) + '\n' + "Carattere con più occorrenze: " + mostUsedChar(data) + '\n' + "Parola con più occorrenze: " + mostUsedWord();

    return report;
}

function countChars(data) {
    const dataWithoutSpaces = data.replace(/ /g, '');

    return dataWithoutSpaces.length;
}

function countWords(data) {
    const dataArray = data.split(' ');

    return dataArray.length;
}

function mostUsedChar(data) {
    const dataWithoutSpaces = data.replace(/ /g, '');
    let charMap = {};

    for (let i = 0; i < dataWithoutSpaces.length; i++) {
        const char = dataWithoutSpaces[i];
        
        if (charMap[char]) {
            charMap[char] += 1;
        } else {
            charMap[char] = 1;
        }
    }
    console.log(charMap);

    const keyValues = Object.entries(charMap);

    keyValues.sort((e1, e2) => {
        const firstValue = e1[0];
        const secondValue = e2[0];

        return secondValue - firstValue;
    });
    return keyValues[0][0];
}

function mostUsedWord(data) {
    const splittedData = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()(\r\n|\n\r)]/g,"").split(" ");
    let wordMap = {};

    for (let i = 0; i < splittedData.length; i++) {
        const word = splittedData[i];
        
        if (wordMap[word]) {
            wordMap[word] += 1;
        } else {
            wordMap[word] = 1;
        }
    }
    console.log(wordMap);

    const keyValues = Object.entries(wordMap);

    keyValues.sort((e1, e2) => {
        const firstValue = e1[0];
        const secondValue = e2[0];

        return secondValue - firstValue;
    });
    return keyValues[0][0];
}

function readFile(url) {
    try {
        const data = fs.readFileSync(url, "utf8");
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

function writeData(url,data) {
    try {
        fs.writeFileSync(url, data);
    } catch (err) {
        console.error(err.message);
    }
}