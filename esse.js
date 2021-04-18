const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended : false}))

const db = require('./database/data')
const consumer_route = require('./route/Consumer_route')
const product_route = require('./route/ProductRoute')
const adimn_route = require('./route/AdminRoute');
const cartroute=require('./route/CartRoute')
const profileroute = require('./route/ProfileRoute')
const contact_route=require('./route/ContactUs_route')
const order_route = require('./route/OrderRoute')
// const publicDir= path.join(__dirname,'public');


app.use(express.static("images"))
app.use(consumer_route)
app.use(product_route)
app.use(adimn_route)
app.use(cartroute)
app.use(profileroute)
app.use(contact_route)
app.use(order_route)

app.listen(90)