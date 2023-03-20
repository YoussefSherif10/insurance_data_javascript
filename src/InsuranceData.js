//import all the modules require
const fs = require('fs');
const readline = require('readline');

const readFileContentsLineByLine = (fileName, cb) => {
    /**
     * This method will take two parameters first the fileName and second a callback
     * read file data line by line using readLine create array and push all data inside the array
     * @type {*[]}
     */

    let fileContents = [];

    const rl = readline.createInterface({
        input: fs.createReadStream(fileName),
        output: process.stdout,
        terminal: false
    });

    rl.on('line', (line) => {
        fileContents.push(line);
    });

    rl.on('close', () => {
        cb(null, fileContents);
    });
}

//This method will take two parameters first the fileContent
//and second the callback 
//use map to filter the data 
//Filter all the records for female candidates given region as southwest.

const filterFemaleCandidates = (fileContents, cb) => {
    /**
     * This method will take two parameters first the fileContent and second the callback
     * use map to filter the data
     * Filter all the records for female candidates given region as southwest.
     */

    let filteredData = fileContents.filter(line => {
        const words = line.split(', ');
        if ((words[1] === 'female') && (words[5] === 'southwest'))
            return true;
        else
            return false;
    });

    cb(null, filteredData);
}

const writeFilteredDataToFile = (outputFileName, filteredData, cb) => {
    /**
     * This method will write filtered data in the output file
     */

     fs.writeFile(outputFileName, filteredData);
}


//This method will read the file content using Streams
//create array and push all the data from file to it


const readFileContentsUsingStream = (fileName, cb) => {
    let fileContents = [];

    fs.createReadStream(fileName)
        .on("error", (err) => {
            console.log("Error while reading contents of file using streams, ERROR::", err);
            cb("Encountered error while reading file contents using streams..!");
        })

}

const filterDataWithNoChildren = (fileContents, cb) => {
    /**
     * This method will filter Data with No Children it will take two parameters
     * first the fileContent and second the callback
     */

    let filteredData = fileContents.filter(line => {
        const words = line.split(", ");
        return (words[4] === 'no') ? true : false;
    });

    cb(null, filteredData);
}




module.exports = {
    readFileContentsLineByLine,
    filterFemaleCandidates,
    readFileContentsUsingStream,
}
