const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
const mongoose = require('mongoose');
var cors = require('cors')

mongoose.connect(`mongodb+srv://obnd217:@@123qwe@cluster0.9m2or.mongodb.net/playground?retryWrites=true&w=majority`, { useNewUrlParser: true }).then(() => console.log('connected')).catch(err => console.log(err))


let PORT = process.env.PORT || 4001
app.use(cors())
const userSchema = new mongoose.Schema({
    _id: { type: Number },
    text: { type: String },
    createdAt: { type: String },
    user: {
        _id: { type: Number },
        name: { type: String },
        avatar: { type: String },
    }

})
const User = mongoose.model('User', userSchema)
let currentUserId = 2;
let currentMessageId = 1;
const users = {}
async function createUser(userParam) {
    const user = new User({
        _id: userParam._id,
        text: userParam.text,
        createdAt: userParam.createdAt + "",
        user: {
            _id: userParam.user._id,
            name: userParam.user.name,
            avatar: userParam.user.avatar
        }

    })
    const result = await user.save();
    console.log(result)
    console.log('user param')
    console.log(userParam)
}
let createMessage = (userParam, messageText) => {
    const user = {
        _id: currentMessageId++,
        text: messageText,
        createdAt: new Date(),
        user: {
            _id: userParam.userId,
            name: userParam.userName,
            avatar: `https://robohash.org/${currentMessageId}`,
        },
    }
    createUser(user);
    return user
}
io.on('connection', socket => {
    console.log('have connect')
    console.log(socket.id)
    users[socket.id] = { userId: currentUserId++ };
    socket.on("join", (userName) => {
        console.log(userName)
        users[socket.id].userName = userName
    })
    socket.on("message", messageText => {
        const user = users[socket.id];
        const message = createMessage(user, messageText)
        console.log(message);
        socket.broadcast.emit("message", message)
    })
});

app.use('/', (req, res) => {
    async function getUsers() {
        const users = await User.find().sort({ _id: -1 });
        res.send(users)
    }
    getUsers();
}
)

server.listen(PORT);