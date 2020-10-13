const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

// Sign up route handler
router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});


// signup Post route
router.post('/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    const existingUser = await usersRepo.getOneBy({ email: email });
    if(existingUser) {
        return res.send('Email already in use!');
    }
    if (password !== passwordConfirmation) {
        return res.send('Passwords must match!');
    }
    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;
    res.send("account created");
});


// Singout Route
router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out!');
});



// Signin Route
router.get('/signin', (reg, res) => {
    res.send(signinTemplate());
});



// Signin Post Route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email });
    if (!user) {
        return res.send('Email not found!');
    }
    const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
    );
    if (!validPassword) {
        return res.send('Invalid Password!');
    }
    req.session.userId = user.id;
    res.send('You are signed in!');
});



module.exports = router;