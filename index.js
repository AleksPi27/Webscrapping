const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://vc.ru/';
// const PAGE_SIZE=12;
const data=[];

const getData = (html) => {
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
        console.log($(el).find('div.l-mb-28').attr('data-content-id'));
    })
    console.log(data);
}
async function main(){
    const resp = await axios.get(url);
    getData(resp.data)
}

main()

module.exports = data;



