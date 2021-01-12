const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
const mongoose = require('mongoose');
var cors = require('cors')
var bodyParser = require('body-parser')

//import from file
const createMessageToDb = require('./controller/CreateMessage');
const getMessage = require('./controller/GetMessage')
const createUser = require('./controller/CreateUser')
// declare variable
let PORT = process.env.PORT || 4001
let currentUserId = 2;
let plusMess = 1;
const users = {}

//connect to DB
mongoose.connect(`mongodb+srv://obnd217:@@123qwe@cluster0.9m2or.mongodb.net/login?retryWrites=true&w=majority`, { useNewUrlParser: true }).then(() => console.log('connected')).catch(err => console.log(err))

//middware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//createMessage
let createMessage = (userParam, messageText) => {
    const message = {
        _id: plusMess++,
        text: messageText,
        createdAt: new Date(),
        time: new Date().getTime(),
        room: userParam.room,
        user: {
            _id: userParam.userId,
            name: userParam.userName,
            avatar: `https://robohash.org/${userParam.userId}`,
        },
    }
    createMessageToDb(message);
    return message
}
// io listener
io.on('connection', socket => {
    users[socket.id] = { userId: currentUserId++ };
    socket.on("join", ({ name, room }) => {
        users[socket.id].userName = name
        users[socket.id].room = room
        socket.join(room);
    })
    socket.on("message", messageText => {
        const user = users[socket.id];
        const message = createMessage(user, messageText)
        socket.to(message.room).emit("message", message)
    })
});
// route get  messages from room 
app.get('/:params', (req, res) => {
    const room = req.params.params
    if (room !== 'favicon.io') {
        const getData = async () => {
            const messages = await getMessage(room)
            res.send(messages)
        }
        getData();
    }
})
// route login
app.post('/login', (req, res) => {
    const { account, name, password, avatar } = req.body
    createUser({ account, name, password, avatar })
        .then(result => {
            result ? res.send(result) : res.send({ status: 'fail' })
        })

})


server.listen(PORT);