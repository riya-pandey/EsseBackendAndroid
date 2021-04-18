// we are going to check if the user is authenticated or not

const jwt = require('jsonwebtoken')
const Consumer = require('../model/Consumer_model')
const Admin = require('../model/AdminModel')

module.exports.verifyConsumer = function (req, res, next) {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]
    const verifiedData = jwt.verify(token, 'csecretkey')
    Consumer.findOne({ _id: verifiedData.consumerId })
        .then(function (ConsumerData) {
            res.ConsumerData = ConsumerData
            next()
        })
        .catch(function (e) {
            res.status(401).json({ message: "Authorization Failed!!" })
        }
        )


}
module.exports.verifyAdmin = function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1]
    const verifiedData = jwt.verify(token, 'secretkey');
    Admin.findOne({ _id: verifiedData.AdminId })
        .then(function (adminInfo) {
            // res.send(adminInfo) 
            req.AdminData = adminInfo
            next();
        })
        .catch(function (e) {
            res.status(401).json({ message: "Authorization Failed!!" })
        })
}