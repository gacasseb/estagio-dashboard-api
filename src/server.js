const express = require('express');
const passport = require('./config/passport');
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(session({ secret: 'your-secret-key' }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

const userRouter = require('./routes/users');
const trapRouter = require('./routes/traps');

app.use('/user', userRouter);
app.use('/trap', trapRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
