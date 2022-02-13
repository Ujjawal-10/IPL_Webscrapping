const request=require('request')
const cheerio=require('cheerio')
const scoreCardObj=require('./scorecard')

function getAllMatchLink(uri){

    // request(uri,cb)
    //or
    request(uri,function(error,response,html){
     if(error){
         console.log(error)
     }
     else{
         extractAllMatchLink(html) //next page ka link layenge is function se
     }
 
    });
 }
 function extractAllMatchLink(html)
 {
     let $=cheerio.load(html)
 
     let scoreCardElemArr =$('a[data-hover="Scorecard"]') 
 
     for(let i=0;i<scoreCardElemArr.length;i++)
     {
         let scoreCardlink=$(scoreCardElemArr[i]).attr('href')
         let fullLink=' https://www.espncricinfo.com'+scoreCardlink
         console.log(fullLink);

         scoreCardObj.ps(fullLink)
 
     }
 }
 
 
     // let $= cheerio.load(uri)
     // let scorecard=$('a[data-hover="Scorecard"]')
     // // let scorecard_link=scorecard.attr('href')
     // // for(let i=0;i<scorecard_link.length;i++)
     // // {
     // //     console.log(scorecard_link[i])
     // // }
     // for(let i=0;i<scorecard.length;i++)
     // {   let scorecard_link=scorecard.attr('href')
     //     console.log(scorecard_link[i])
     //}

 module.exports = {
     getAllMatch : getAllMatchLink
 } 