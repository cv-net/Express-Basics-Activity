const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { json } = require('body-parser');

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const account = {
    balance: 7000, 
    deposits: [],
    withdrawals: []
}

app.get('/', (req, res) => {
    res.render('ATM', { account });
});

app.post('/deposit', (req, res) => {
    const deposit = parseInt(req.body.deposit);
    account.balance += deposit;
    account.deposits.push(deposit)
    console.log(account.balance);

    res.redirect('/');
});

app.post('/withdraw', (req, res) => {
    const withdrawal = parseInt(req.body.withdraw);
    account.balance -= withdrawal;
    account.withdrawals.push(withdrawal)
    console.log(account.balance);

    res.redirect('/');
});

app.get('/balance', (req, res) => {
    res.redirect('/');
});

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
})

app.use((err, req, res, next) => {
	res.locals.error = err;
	res.status(err.status);
	res.render('error');
});

app.listen(3000, () => {
    console.log('Server running at localhost:3000/');

});