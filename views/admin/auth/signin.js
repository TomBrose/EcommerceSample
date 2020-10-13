const layout = require('../layout');

module.exports = () => {
    return layout({
        content: `
            <div>
                <form method="POST">
                    <input name="email" placeholder="Email" />
                    <input name="password" placeholder="Password" />
                    <button>Login</button>
                </form>
            </div>
        `
    });
};