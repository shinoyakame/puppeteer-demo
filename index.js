const puppeteer = require('puppeteer');

(async() => {

    console.log("Started...");

    let webUrl = 'https://www.hackerrank.com/shinoyakame?hr_r=1';
    
    let browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();

    await page.goto(webUrl, {waitUntil:"networkidle2"});

    console.log(webUrl + " has loaded. ");

    let data = await page.evaluate(()=>{

        let titles = document.querySelectorAll(".hacker-badge .badge-title");
        let output = [];
        let starCollections = document.querySelectorAll(".hacker-badge .star-section");
        for(let i=0; i<titles.length; i++){
            let title = titles[i].innerHTML;
            let starCount = starCollections[i].children[0].children.length;
            output.push("Badge : " + title + " " + starCount + " stars");
        }
        let outputString = "";
        for(let i=0; i<output.length; i++){
            outputString = outputString.concat("<div>" + output[i] + "</div>");
        }
        document.write(outputString);
        return output;
    });

    console.log(data);

})();