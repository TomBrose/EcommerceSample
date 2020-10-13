const express    = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys:['dwadwd6dwda7']
}));

// route handler
app.get('/signup', (req, res) => {
    res.send(`
    <div>
       Your ID is: ${req.session.userId}
        <form method="POST">
            <input name="email" placeholder="Email" />
            <input name="password" placeholder="Password" />
            <input name="passwordConfirmation" placeholder="Confirm Password" />
            <button>Sign Up!</button>
        </form>
    </div>
    `);
});


// Post routes
app.post('/signup', async (req, res) => {
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

app.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out!');
});

app.get('/signin', (reg, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="Email" />
            <input name="password" placeholder="Password" />
            <button>Login</button>
        </form>
    </div>
    `);
});

app.post('/signin', async (req, res) => {
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

app.listen(3000, () =>{
    console.log('Listening');
});