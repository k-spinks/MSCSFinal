import fs from 'fs'
function processFile(inputFilePath, outputFilePath) {
    // Read the input file
    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        
        // Split the file contents into individual items
        const items = data.trim().split(/\s+/);
        
        // Add single quotes around each item and join them with commas
        const formattedItems = items.map(item => `'${item}'`).join(', ');

        // Write the formatted items to the output file
        fs.writeFile(outputFilePath, formattedItems, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
            console.log('File has been processed and exported successfully.');
        });
    });
}


const inputFilePath = 'wordList.txt';
const outputFilePath = 'dictionary.js';
processFile(inputFilePath, outputFilePath);
