const express = require('express');
const app = express();
const bodyparser = require('body-parser');
let fs = require('fs');
const _ = require('lodash');

app.use(bodyparser.json());

const table = 'Users.json';

app.listen(3000);
console.log('App listening port 3000');

app.get('/', (req, res) => {
    res.send('Server started at PORT 3000');
});

app.post('/login', (req, res) => {
    console.log('LOGIN FUNCTION');
    console.log(JSON.stringify(req.body));
    if(req.body.username == 'a' && req.body.password == 'a') {
        res.send({ 'Message': 'Login success' });
    } else {
        res.send({ 'Message': 'Invalid login' });
    }
    
});

app.post('/create', async (req, res) => {
    console.log('CREATE FUNCTION');
    console.log(JSON.stringify(req.body));
    const file = await fs.readFileSync(table);
    let users = JSON.parse(file);
    let id = _.random(100, 999);
    let a = req.body
    let b = { "id": id }
    _.assign(a, b);
    await users.push(JSON.stringify(a));
    fs.writeFileSync(table, JSON.stringify(users))
    res.send({ 'Message': 'Successfully saved' });
});

app.get('/list', async (req, res) => {
    console.log('LIST FUNCTION');
    const file = await fs.readFileSync(table);
    let users = JSON.parse(file);
    let tempData = []
    for (let i = 0; i < users.length; i++) {
        tempData.push(JSON.parse(users[i]))
    }
    res.send(JSON.stringify(tempData));
});

app.post('/select', async (req, res) => {
    console.log('SELECT FUNCTION');
    console.log(JSON.stringify(req.body));
    const file = await fs.readFileSync(table);
    let users = JSON.parse(file);
    let tempData = []
    for (let i = 0; i < users.length; i++) {
        tempData.push(JSON.parse(users[i]))
    }
    let user = await _.filter(tempData, { id: req.body.id })
    res.send(JSON.stringify(user));
});

app.post('/update', async (req, res) => {
    console.log('UPDATE FUNCTION');
    console.log(JSON.stringify(req.body));
    const file = await fs.readFileSync(table);
    let users = JSON.parse(file);
    let tempData = []
    for (let i = 0; i < users.length; i++) {
        tempData.push(JSON.parse(users[i]))
    }
    await _.remove(tempData, { id: req.body.id })
    let array = []
    for (let i = 0; i < tempData.length; i++) {
        await array.push(JSON.stringify(tempData[i]));
    }
    await array.push(JSON.stringify(req.body));
    fs.writeFileSync(table, JSON.stringify(array))
    res.send({ 'Message': 'Successfully updated' });
});

app.post('/delete', async (req, res) => {
    console.log('DELETE FUNCTION');
    console.log(JSON.stringify(req.body));
    const file = await fs.readFileSync(table);
    let users = JSON.parse(file);
    let tempData = []
    for (let i = 0; i < users.length; i++) {
        tempData.push(JSON.parse(users[i]))
    }
    await _.remove(tempData, { id: req.body.id })
    let array = []
    for (let i = 0; i < tempData.length; i++) {
        await array.push(JSON.stringify(tempData[i]));
    }
    fs.writeFileSync(table, JSON.stringify(array))
    res.send({ 'Message': 'Successfully saved' });
});


