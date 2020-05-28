// dependencies
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

module.exports = (app) => {
    // main page
    app.get('/', (req, res) => {
        // look for existing articles in database
        db.Article.find({})
            .sort({ timestamp: -1 })
            .then((dbArticle) => {
                if (dbArticle.length == 0) {
                    // if no articles found, render index
                    res.render('index');
                }
                else {
                    // if there are existing articles, show articles
                    res.redirect('/articles');
                }
            })
            .catch((err) => {
                res.json(err);
            });
    });

    // saved articles page
    app.get('/saved', (req, res) => {
        db.Article.find({ saved: true })
            .then((dbArticle) => {
                let articleObj = { article: dbArticle };

                // render page with articles found
                res.render('saved', articleObj);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    // scrape data then save to mongodb
    app.get("/scrape", (req, res) => {
        // get body of url
        axios.get("https://www.bbc.com/sport/football")
            .then((response) => {
                // use cheerio for shorthand selector $
                let $ = cheerio.load(response.data);

                $(".gs-c-promo-heading").each(function (i, element) {
                    let result = {};
                    // Save the text and href of each link enclosed in the current element
                    const title = $(this).children("h3").text();
                    const link = $(this).attr("href");
                    const summary = $(this).siblings("p").text();

                    // console.log(title);
                    // console.log(link);


                    result.title = title;
                    result.link = link;
                    result.summary = summary;
                    console.log(summary);
                    // create new Article
                    db.Article.create(result)
                        .then((dbArticle) => {
                            console.log(dbArticle);
                        })
                        .catch((err) => {
                            console.log(`\n error while saving to database: ${err}`);
                        });
                });

                res.redirect('/articles');
            })
            .catch((error) => {
                console.log(`error while getting data from url: ${error}`);
            });
    });

    app.get("/articles", (req, res) => {
        db.Article.find({})
            .sort({ timestamp: -1 })
            .then((dbArticle) => {
                let articleObj = { article: dbArticle };

                // render page with articles found
                res.render('index', articleObj);
            })
            .catch((err) => {
                res.json(err);
            });
    });
}
// // save article
// app.put('/article/:id', (req, res) => {
//     let id = req.params.id;

//     db.Article.findByIdAndUpdate(id, { $set: { saved: true } })
//         .then((dbArticle) => {
//             res.json(dbArticle);
//         })
//         .catch((err) => {
//             res.json(err);
//         });
// });










