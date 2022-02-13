const url ='https://www.espncricinfo.com/series/ipl-2020-21-1210595'
const fs= require('fs')
const request=require('request')
const cheerio=require('cheerio')
const allMatchObj=require('./allMatch')
const path= require('path')

let iplPath =path.join(__dirname,"IPL") //jis directory pe aap  ho uska full path laake deta h
//isse mera ipl folder ka path bn jayega
dirCreator(iplPath) //dircreator func me is path ko pass kr diya h



request(url,cb);

function cb(error,response,html)
{
    if(error){
        console.log(error)
    }
    else{
        extractLink(html) //next page ka link layenge is function se
    }
}

function extractLink(html)
{
    let $ =cheerio.load(html) //cheerio.cheerio.api->sari library  $ pe aa gyi h
    let anchorElem = $('a[data-hover="View All Results"]')

    let link = anchorElem.attr('href') //href attribute ko dega

    let fullLink= 'https://www.espncricinfo.com'+link
    console.log(fullLink)

//    getAllMatchLink(fullLink)
    allMatchObj.getAllMatch(fullLink)

}

function dirCreator(filePath){

    if(fs.existsSync(filePath)==false){
        fs.mkdirSync(filePath)
    }
}

