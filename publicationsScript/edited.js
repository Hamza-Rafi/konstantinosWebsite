const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs')

const url = "https://pure.royalholloway.ac.uk/en/persons/konstantinos-markantonakis/publications/?page=";
const paperSelector = "div.result-container > div > h3 > a";

async function GetPagePapers(number) {
  const page = await axios.get(url + number);
  let $ = cheerio.load(page.data);

//   get all pagelinks for publications
    const paperLinks = $(paperSelector);
    const links = [];
    paperLinks.each(function (_, elem) {
        links.push(elem.attribs["href"]);
    });

//   fetch data from every page
    const promiseList = links.map((l) => axios.get(l));
    const data = await Promise.all(promiseList);
    return data.map((d, i) => {
    $ = cheerio.load(d.data);

    const title = $('div.rendering>h1>span').text()
    const titleLink = links[i]
    const publishDate = $('tr.status>td>span.date').text()
    const authorElement = $('p.relations.persons>a')

    const authorNames = $('p.relations.persons').text().split(', ')

    const authors = []
    authorElement.each(function(_, elem){
        authors.push({
            name: $(this).text(),
            link: elem.attribs["href"]
        })
    })

    // author formatting
    authorNames.forEach((authorName, i) => {
        authors.forEach(author => {
            if(author.name == authorName){
                authorNames[i] = author
            }
        });
    })
    authorNames.forEach((element, i) => {
        if(typeof element != 'object'){
            authorNames[i] = {
                name: element
            }
        }
    })

    returnObject = {
        title: title,
        titleLink: titleLink,
        publishDate: publishDate,
        authors: authorNames
    }
    return returnObject;
    });
}
async function GetPapers(){
    let pageCounter = 0;
    let papers = [0];
    let totalRefs = [];
    while (papers.length > 0) {
        papers = await GetPagePapers(pageCounter);
        console.log(`Page: ${pageCounter}`)
        pageCounter++;
        totalRefs = [...totalRefs, ...papers];
    }
    return totalRefs
}

async function Main() {
    console.log("starterd")
    
    var totalRefs = await GetPapers();
    console.log("Total amount of papers:", totalRefs.length);

    let all = []

    let counter = totalRefs.length;
    for (const r of totalRefs) {
        // console.log(`${counter}`);
        all.push(r)
        counter--;
    }

    fs.writeFile('publications.json', JSON.stringify(all, null, 4), (err) => {
        if (err){
            console.log(err)
        }
    })

}

Main();
