var json2xls = require('json2xls');
var stream = require('stream');
let fs = require('fs');
const rePurser = require("./resume-checker");



module.exports = {
    analizer: async (req, res, next) => {
        var ats = [];
        var ranks = [];
        function percentileCalculator(arr) {
            let max = Math.max(...arr);
            var pArr = [];
            for (let i = 0; i < arr.length; i++) {
                pArr.push((arr[i] / max * 100).toFixed(0));

            };
            return pArr;
        }

        for (let i = 0; i < req.files.length; i++) {

            const data = await rePurser(req.files[i]);
            ats.push(data);
            ranks.push(data?.["Credit Point (in 100)"]);

        }

        const percentile = percentileCalculator(ranks);

        for (let i = 0; i < ats.length; i++) {
            ats[i].rankInPercentile = +percentile[i];
        }

        // console.log(ats);
        var xls = json2xls(ats);


        var slug = Math.floor(Math.random() * 90000) + 10000;

        fs.writeFile(`${__dirname}/../../public/ats/${slug}.xlsx`, xls, 'binary', err => {
            res.send({ link: `/ats/${slug}.xlsx` })
        })


        // res.send({ data: ats })

    },
}
