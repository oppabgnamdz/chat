const Message = require('../model/Message');
async function getMessage(room) {
    const messages = await Message.find({ room: room }).sort({ _id: -1 });
    console.log(messages);
    return messages
}
module.exports = getMessage;