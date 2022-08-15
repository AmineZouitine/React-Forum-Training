
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const privateRoute = require('../routes/privateRoute');
const Joi = require("@hapi/joi");

const schema = Joi.object(
{
    name: Joi.string().min(6).required().max(30),
    email: Joi.string().min(6).required().max(255).email(),
    password: Joi.string().min(6).required().max(255),
});


router.get('/is-connected', privateRoute, (req, res) =>
{
    res.status(200).send("Connected");
});

router.post('/register', async (req, res) =>
{

    const { error } = schema.validate(req.body);
    if (error)
        return res.status(400).send(error);

    const duplication = await User.findOne({name: req.body.name, email: req.body.email});

    if (duplication)
        return res.status(400).send("email/name already exist");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        }
    );

    try
    {
        const savedUser = await user.save();
        res.status(200).send();
    }
    catch(err)
    {
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) =>
{
    const user = await User.findOne({name: req.body.name});
    if (!user)
        return res.status(400).send("The name does not exist");
    const passwordExist = await bcrypt.compare(req.body.password, user.password);
    if (!passwordExist)
        return res.status(400).send("The password does not exist");

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({name: user.name});
});


router.post('/disconnect', privateRoute, async (req, res) =>
{
    jwt.destroy(req.user);
});


module.exports = router;
