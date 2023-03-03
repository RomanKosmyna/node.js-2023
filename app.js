// fs.writeFile(path.join(__dirname, 'dataBase.json'), '[{"name": "Roki", "age": 18, "gender": "male"}]', (err) => {
//     if (err) throw new Error();
// });
// const event = require('node:events');
// const eventEmitter = new event();
// eventEmitter.on('click', () => {
//     console.log('Click click click');
// });
//
// eventEmitter.emit('click');
// eventEmitter.once('click', (data) => {
//     console.log(data);
//     console.log('123');
// });
// eventEmitter.emit('click');
// const readStream = fs.createReadStream(path.join('dataBase.json'));
// const writeStream = fs.createWriteStream(path.join(__dirname, 'writeStream.json'));
// // readStream.on('data', (chunk) => {
// //     // console.log(chunk.toString())
// //     writeStream.write(chunk);
// // });
// // readStream.pipe(writeStream);
// const handleError = () => {
//     console.error('ERROR!!!!!!!');
//     readStream.destroy();
//     writeStream.end('ERROR while reading file');
// }
// readStream.on('error', handleError).pipe(writeStream)
// duplex, transform
// const users = [
//     {
//         name: 'Oleh',
//         age: 19,
//         gender: 'male'
//     },
//     {
//         name: 'Anya',
//         age: 27,
//         gender: 'female'
//     },
//     {
//         name: 'Kokos',
//         age: 37,
//         gender: 'mixed'
//     }
// ]
// app.get('/users', (req, res) => {
//     res.json(users);
// })
//
// app.get('/users/:userId', (req, res) => {
//     const {userId} = req.params;
//     const user = users[+userId];
//     res.json(user);
// })
// app.get('/welcome', (req, res) => {
//     console.log('Welcome');
//     res.send('Welcome');
// })
// app.post('/users', (req, res) => {
//     const body = req.body;
//     users.push(body);
//
//     res.json({
//         message: 'User created'
//     })
// })
// app.put('/users/:userId', (req, res) => {
//     const {userId} = req.params;
//     const updatedUser = req.body;
//
//     users[+userId] = updatedUser;
//
//     res.status(200).json({
//         message: 'User updated'
//     })
// })
// const pathToUsers = path.join(process.cwd(), 'dataBase.json');
// //--------- All Users ----------//
// app.get('/users', (req, res) => {
//     fs.readFile(pathToUsers, {encoding: "utf-8"}, (err, data) => {
//         if (err) throw new Error;
//         res.json(data);
//     })
// })
// //----- By ID ------//
// app.get('/users/:userId', (req, res) => {
//     const {userId} = req.params;
//     fs.readFile(pathToUsers, {encoding: "utf-8"}, (err, data) => {
//         if (err) throw new Error();
//         const info = JSON.parse(data);
//         const user = info[+userId];
//         res.json(user);
//     })
// })
//
// //----------- New User -----------//
// app.post('/users', (req, res) => {
//     // const {name, age ,gender} = req.body;
//     // console.log(name, age, gender)
//     const body = req.body;
//     console.log(body)
//     fs.appendFile(path.join(process.cwd(), 'dataBase.json'), body, (err) => {
//         if (err) throw new Error;
//     })
//     res.json({
//         message: 'User has been successfully created!'
//     })
// })

const express = require('express');
const app = express();
const fsService = require('./fs.service');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// ----- GET ------//
app.get('/users', async (req, res) => {
    const users = await fsService.reader();
    res.json(users);
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fsService.reader();
    // const user = await users[+userId];
    const user = users.find((user) => user.id === +userId);
    if (!user) {
        res.status(422).json(`User with an id ${userId} not found`);
        return;
    }
    res.json(user);
})

//---- POST ----//
app.post('/users', async (req, res) => {
    const { name, age, gender } = req.body;

    if (!name || name.length < 2) {
        res.status(400).json('Wrong name, please choose another.');
        return;
    }
    if (!age || !Number.isInteger(age) || Number.isNaN(age)) {
        res.status(400).json('You are not old enough.');
        return;
    }
    if (!gender || gender !== 'male' && gender !== 'female') {
        res.status(400).json('Change your gender :)');
        return;
    }
    const users = await fsService.reader();
    const newUser = {
        id: users[users.length - 1]?.id + 1 || 1,
        name,
        age,
        gender
    };
    users.push(newUser);
    await fsService.writer(users);
    res.status(201).json({
        message: 'User has been created!'
    });
})

//---- PUT ----//
app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const {name, age, gender} = req.params;

    if (name && name.length < 2) {
        res.status(400).json('Wrong name, please choose another.');
        return;
    }
    if (age && !Number.isInteger(age) || Number.isNaN(age)) {
        res.status(400).json('You are not old enough.');
        return;
    }
    if (gender && (gender !== 'male' && gender !== 'female')) {
        res.status(400).json('Change your gender :)');
        return;
    }
    const users = await fsService.reader();
    const index = users.findIndex((user) => user.id === +userId);

    if (index === -1) {
        res.status(422).json(`User with an id ${userId} not found`);
        return;
    }
    users[index] = {...users[index], ...req.body};


    await fsService.writer(users);
    res.status(200).json(users[index]);
})

//---- DELETE ----//
app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const users = await fsService.reader();
    const index = users.findIndex((user) => user.id === +userId);
    if (index === -1) {
        res.status(422).json(`User with an id ${userId} not found`);
        return;
    }

    users.splice(index, 1);
    await fsService.writer(users);
    // console.log()
    res.sendStatus(204);
})

const PORT = 5100;

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})