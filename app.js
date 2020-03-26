const path = require('path')
const express = require('express')
const hbs = require('hbs')
const covid19_statics = require('./utils/covid19_statics')

const app = express()
const port = process.env.PORT || 7000

const VIEWS_DIR_PATH = path.join(__dirname, 'views')
const PUBLIC_DIR_PATH = path.join(__dirname, 'public')

//handlerbars
app.set('view engine', 'hbs')
app.use(express.static(PUBLIC_DIR_PATH))
app.set('views', VIEWS_DIR_PATH)

app.get('', (req, res) => {
    // API sends all data
    // if user didn't provide country name >> res.send('select country')
    //if user select a country >> res.send({data})
    //in all cases >> page is loaded
    console.log('req.query.country', req.query.country)
    if (!req.query.country) {
        res.render('index', {
            msg: 'Select a country to see its Confirmed Cases and Deaths',
            title: 'COVID19 Cases',
            //we can send countriesNames from covid19_statics here but
            //I don't want to call it 2 times
            countries: [
                "Egypt",  "UAE", "Kuwait","Saudi Arabia","Bahrain", "Lebanon","Iraq", "Algeria",
                "Jordan","Oman","Palestine","China","Italy", "USA","Spain","Germany","Iran","France","Switzerland",
                "UK","S. Korea","Netherlands", "Australia","Belgium","Canada",
                "Norway","Portugal","Sweden","Turkey","Brazil","Australia",
                "Israel","Malaysia",'Denmark','Pakistan','Poland','Thailand',
                "Finland","South Africa"  
            ]
        })
    } else {
        covid19_statics(req.query.country, ({ countriesNames, country, cases, deaths, total_recovered, new_deaths, new_cases, active_cases }) => {
            res.send({
                // countriesNames: countriesNames,
                country: country,
                cases: cases,
                deaths: deaths,
                total_recovered: total_recovered,
                new_deaths: new_deaths,
                new_cases: new_cases,
                active_case: active_cases
            })
        })
    }
})

//if all pervious pages not found, go to 404 page
app.get('*', (req, res) => {
    res.render('404', {
        msg: '404 NOT FOUND',
        title: '404 Page',
    });
})

app.listen(port, () => {
    console.log('server is listening on port =', port)
})