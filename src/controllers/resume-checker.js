const fs = require('fs');
const pdf = require('pdf-parse');
const ResumeParser = require('simple-resume-parser');




const parser = (file) => {
    // console.log(file);

    return new Promise((resolve, reject) => {

        var slug = Math.floor(Math.random() * 90000) + 10000;

        function resumeParser(data) {
            return new Promise((resolve, reject) => {
                fs.writeFile(`${__dirname}/../../public/cv/${slug}.pdf`, data, err => {
                    if (err) {
                        console.log(err);
                        return ""
                    } else {
                        // return new Promise((resolve, reject) => {
                        const resume = new ResumeParser(`http://localhost:3000/cv/${slug}.pdf`);

                        //Convert to JSON Object
                        resume.parseToJSON()
                            .then(data => {
                                if (data?.parts) {
                                    // console.log(data);
                                    resolve(data);
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });

                        // });
                    }
                })
            });
        }



        function extractName(text) {
            const nameRegex = /([a-zA-Z]+[a-zA-Z\s]+)/;
            const match = text.match(nameRegex);
            return match ? match[0]?.split("\n")?.[0] : '';
        }

        function extractEmail(text) {
            const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
            const match = text.match(emailRegex);
            return match ? match[0] : '';
        }

        function extractPhone(text) {
            const phoneRegex = /(\+\d{1,2}\s?)?(\d{10,})/;
            const match = text.match(phoneRegex);
            return match ? match[0] : '';
        }

        const keywords = [
            "software",
            "design",
            "develop",
            "implement",
            "algo",
            "program",
            "project",
            "skill",
            "present",
            "app",
            "web",
            "data",
            "sql",
            "c++",
            "java",
            "js",
            "py",
            "it",
            "ai",
            "admin",
            "agile",
            "lead",
            "analyz",
            "test",
            "fix",
            "validat",
            "edu",
            "manage",
            "creativ",
            "skill",
            "coding",
            "usabl",
            "network",
            "tech",
            "github",
            "linkedin",
            "code",
            "api",
            "ui",
            "ux",
            "portfolio",
            "html",
            "linux",
            "os",
            "certificat",
            "info",
            "user",
            "cms",
            "start",
            "serve"
        ]




        // let resumeLocation = './cv.pdf';
        // let dataBuffer = fs.readFileSync(resumeLocation);
        let dataBuffer = file?.buffer;

        pdf(dataBuffer).then(async function (data) {

            // // number of pages
            // console.log(data.numpages);
            // // number of rendered pages
            // console.log(data.numrender);
            // // PDF info
            // console.log(data.info);
            // // PDF metadata
            // console.log(data.metadata);
            // // PDF.js version
            // // check https://mozilla.github.io/pdf.js/getting_started/
            // console.log(data.version);
            // // PDF text

            // console.log("-----------------------------------\n");

            // console.log(data.text);
            // console.log(extractName(data.text));
            // console.log(extractEmail(data.text));
            // console.log(extractPhone(data.text));

            const parsedJSON = await resumeParser(dataBuffer)


            // console.log(parsedJSON?.parts?.experience);
            // console.log(parsedJSON?.parts?.education);
            // console.log(parsedJSON?.parts?.skills);
            // console.log(parsedJSON?.parts?.profiles);
            // console.log(parsedJSON?.parts?.certification);

            const text = data?.text

            // console.log(text);

            var rank = 0; //50

            for (let i = 0; i < keywords.length; i++) {
                let result = text.toLowerCase().includes(keywords[i]);
                if (result) {
                    rank++;
                }
            }

            // console.log(rank * 2 + " %");


            const result = {
                name: extractName(data.text) || parsedJSON?.parts?.name,
                email: extractEmail(data.text) || parsedJSON?.parts?.email,
                phone: extractPhone(data.text),
                education: parsedJSON?.parts?.education,
                skills: parsedJSON?.parts?.skills,
                experience: parsedJSON?.parts?.experience,
                "Credit Point (in 100)": rank * 2,
                rankInPercentile: rank * 2,
                link: `/cv/${slug}.pdf`
            }

            return resolve(result);

        }).catch(function (error) {
            // handle exceptions
        });
    })
}

module.exports = parser;

