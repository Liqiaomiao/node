const auth = require('basic-auth')
const express = require('express')
const User = require('../models/user')
exports.auth = (req, res, next) => {
    const { name, pass } = auth
    console.log(name, pass);
    User.authenticate(name, pass, (err, user) => {
        if (user) req.remoteUser = user;
        next(err)
    })
}
exports.user = (req, res, next) => {
    User.get(req.params.id, (err, user) => {
        if (err) return next(err)
        if (!user.id) return res.sendStatus(404)
        res.json(user);
    })
}
exports.add = (req, res, next) => {

}
exports.entries = (req, res, next) => {

}