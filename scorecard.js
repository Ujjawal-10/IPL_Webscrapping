// const url='https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard'

const request = require('request')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const xlsx= require('xlsx')

function processScoreCard(url) {
    request(url, cb);
}



function cb(error, response, html) {
    if (error) {
        console.log(error)
    }
    else {
        data(html)
    }
}

function data(html) {
    let $ = cheerio.load(html)
    let descElem = $('.header-info .description')
    let result = $('.match-info.match-info-MATCH.match-info-MATCH-half-width .status-text').text();
    let descArr = (descElem).text().split(",");
    

    let venue = descArr[1].trim();
    let date = descArr[2].trim();

    console.log('Venue--> ' + venue)
    console.log('Date--> ' + date)
    console.log('Result--> '+result)



    console.log('-------------------------------------------------------------------')

    let innings = $('.card.content-block.match-scorecard-table>.Collapsible')
    htmlString = ''

    for (let i = 0; i < innings.length; i++) {
        htmlString += $(innings[i]).html()
        // }
        // console.log(htmlString)


        let teamName = $(innings[i]).find('h5').text()
        teamName = teamName.split('INNINGS')[0].trim()

        let opponentIndex = i == 0 ? 1 : 0;

        let opponentName = $(innings[opponentIndex]).find('h5').text()
        opponentName = opponentName.split('INNINGS')[0].trim()

        //--------------------------------------------------------------

        let cInning = $(innings[i]) //current innings  //0 k liye mumbai ki innings

        let allRows = cInning.find('.table.batsman tbody tr') //humara html cInning se aya h to yahi se find krna pdega

        for (let j = 0; j < allRows.length; j++) {

            let allCols = $(allRows[j]).find('td')
            //jaha batsman-cell likha h un rows ko identify krlete hai, kyuki hume commentary wali rows nhi chahiye
            let isWorthy = $(allCols[0]).hasClass('batsman-cell') //hasClass func me dot pass nhi kna hota
            if (isWorthy == true) {
                let playerName = $(allCols[0]).text().trim()
                let runs = $(allCols[2]).text().trim()
                let balls = $(allCols[3]).text().trim()
                let fours = $(allCols[5]).text().trim()
                let sixes = $(allCols[6]).text().trim()
                let STR = $(allCols[7]).text().trim()

                console.log(`${playerName} | ${runs} |${balls} | ${fours} | ${sixes} |${STR}`)

                processPlayer(teamName, playerName, runs, balls, fours, sixes, STR, opponentName, venue, result,date)

            }

        }
        console.log('----------------------------------------------------------')

        // console.log("Team Name--> ",teamName)
        // console.log("Opponent Team--> ",opponentName)
    }
}

function processPlayer(teamName, 
    playerName, 
    runs, 
    balls, 
    fours, 
    sixes, 
    STR, 
    opponentName, 
    venue, 
    result,
    date) {
    let teamPath = path.join(__dirname, "IPL", teamName)
    dirCreator(teamPath);

    let filePath = path.join(teamPath, playerName + ".xlsx") //1-1 player ki xlsx file bn gyi
    let content = excelReader(filePath, playerName)

    let playerObj = {
        teamName, 
        playerName,
        runs, 
        balls, 
        fours, 
        sixes, 
        STR, 
        opponentName, 
        venue, 
        result,
        date
            //agar dono name same rakhne h to ek hi baar key pass krne se kaam ho jayega
    }
    content.push(playerObj) // har loop me player aate renge
    excelWriter(filePath, content, playerName)
}

function dirCreator(filePath) {

    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath)
    }
}

function excelWriter(filePath, jsonData, sheetName) {
    let newWB = xlsx.utils.book_new();
    //Add new WorkBook
    let newWS = xlsx.utils.json_to_sheet(jsonData);
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    xlsx.writeFile(newWB, filePath);
}

function excelReader(filePath, sheetName) {

    if (fs.existsSync(filePath) == false) {
        return []
    }
    let wb = xlsx.readFile(filePath);
    //which workbook(excel file) to read
    let excelData = wb.Sheets[sheetName];
    //pass the sheetname
    let ans = xlsx.utils.sheet_to_json(excelData);
    //conversion from sheet to json
    return ans
    //yaha humne excel se json me convert krke read kiya h 
    //write ka ulta kaam kiya hai
}


module.exports = {
    ps: processScoreCard
}