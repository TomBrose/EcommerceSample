const express    = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// route handler
app.get('/', (reg, res) => {
    res.send(`
    <div>
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
app.post('/', (req, res) => {
    console.log(req.body);
    res.send("account created");
});




app.listen(3000, () =>{
    console.log('Listening');
});