const fs = require('fs')
const xlsx = require('xlsx')

// let buffer=fs.readFileSync('./example.json') // reading the json file

// console.log(buffer)

// //we can directly convert this buffer data into json

// let data = JSON.parse(buffer) // ye JSON k format me data ko dedega

// // console.log(data)


// data.push({
//     "name": "Thor",
//     "last name": "Odinson",
//     "isAvenger": true,
//     "Age": 1020,
//     "friends": [
//         "Bruce",
//         "Tony",
//         "Peter"
//     ],
//     "address": {
//         "planet": "Asguard"
//     }
// })

// console.log(data)

// let stringData =JSON.stringify(data)

// fs.writeFileSync('./example.json',stringData)

let data = require('./example.json')

data.push({
    "name": "Bruce",
    "last name": "Banner",
    "isAvenger": true,
    "Age": 1020,
    "friends": [
        "Bruce",
        "Tony",
        "Peter"
    ],
    "address": {
        "planet": "Asguard"
    }
})

// console.log(data)

let stringData = JSON.stringify(data)
// console.log(stringData)

fs.writeFileSync('./example.json', stringData)


function excelWriter(filePath , jsonData, sheetName){
    let newWB = xlsx.utils.book_new();
    //Add new WorkBook
    let newWS = xlsx.utils.json_to_sheet(jsonData);
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName); 
    xlsx.writeFile(newWB, filePath);
}



function excelReader(filePath,sheetName){
    let wb = xlsx.readFile(filePath);
    //which workbook(excel file) to read
    let excelData = wb.Sheets[sheetName];
    //pass the sheetname
    let ans = xlsx.utils.sheet_to_json(excelData);
    //conversion from sheet to json
    console.log(ans)
    //yaha humne excel se json me convert krke read kiya h 
    //write ka ulta kaam kiya hai
}


