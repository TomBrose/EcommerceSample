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
app.get('/', (req, res) => {
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
app.post('/', async (req, res) => {
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




app.listen(3000, () =>{
    console.log('Listening');
});