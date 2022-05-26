const http = require('http')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const pgPromise = require('pg-promise')()

const hostname = 'localhost'
const port = 3000
const config = {
    host: "localhost",
    port: 5432,
    database: "restaurants",
    user: "postgres",
}

const app = express()
const server = http.createServer(app)
const db = pgPromise(config)

app.engine('html', es6Renderer)
app.set('views', 'templates')
app.set('view engine', 'html')

// routes go here
app.get('/restaurants', (req, res) => {
    db.query('SELECT * FROM restaurants;')
        .then((results) => {
            res.render('layout', {
                partials: {
                    body: 'partials/restaurant-list'
                },
                locals: {
                    title: 'Restaurants!',
                    restaurants: results
                }
            })
        })
})


app.get('*', (req, res) => {
    res.status(404).send('404 Not Found')
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
