//const weather = require("C:/Users/Akshay/first-app/weatherApp/app")
const path = require("path");
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast");

const port =process.env.PORT || 3000


//Define path for views and partials directory
const viewPath = path.join(__dirname, "../public/template/views")
const partialsPath = path.join(__dirname, "../public/template/partials")


//Define path for general
app.use(express.static(path.join(__dirname, "../public")));

//Setting handlebar and views directory
app.set('view engine', 'hbs');
app.set("views" , viewPath);

//Registering partials path
hbs.registerPartials(partialsPath)


app.get("/weather" , (req, res) => {    
    const city = req.query.address
    if (!req.query.address) {
        res.send("Please provide the address")
    }  
    geocode(city , (error, {latitude, longitude, location} ={} ) => {
        if (error) {
            return res.send(error);
        }
        forecast(latitude, longitude , (error, forecastData) => {
            if (error) {
                return res.send(error);
            }
            res.send({ 
                location,
                forecastData,
                address: req.query.address
            })
    
        })
    
    })
})




app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app", 
        name : "Akshay Borde"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        name : "Akshay Borde",
        age : 25,
        sex : "male",
        title: "About me",
    })
})



app.get("/help", (req, res) => {
    res.render("help", {
        type : "Emergency",
        Contact : "Someone help",
        title: "Help index",
        name : "Akshay Borde"
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send("You must provide a search term")
    } 
    
    console.log(req.query.search);
    res.send({
        products : []
    })
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        errorhelp : "Help article not found",
        name : "Akshay Borde"
    })
    
})


app.get("*", (req, res) => {
    res.render("error", {
        errorAll : "Page not found",
        name : "Akshay Borde"
    })
})

app.listen(port, () => {
    console.log("Listening on " + port);
})


