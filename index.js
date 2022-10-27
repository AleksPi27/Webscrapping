const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://vc.ru/';
// const PAGE_SIZE=12;
// const data=[];

const getData = (html) => {
    const data=[];
    const $ = cheerio.load(html);
    $('div.feed__item').each((i, el)=> {
        let title=''
        if ($(el).find('div.content-title').text().trim().indexOf('\n')!==-1){
            title=$(el).find('div.content-title').text().trim().substring(0,$(el).find('div.content-title').text().trim().indexOf('\n')-1);
        } else {
            title=$(el).find('div.content-title').text().trim();
        }
        data.push([
            title,
            $(el).find('a.content-link').attr('href'),
        ]);
        // console.log($(el).find('div.l-mb-28').attr('data-content-id'));
    })
    console.log(data);
    return data;
}
async function main(){
    const resp = await axios.get(URL);
    const data=getData(resp.data);
    fs.writeFileSync('./result.json', JSON.stringify(data),'utf8');
}

main()


