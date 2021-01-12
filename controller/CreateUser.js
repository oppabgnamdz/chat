const User = require('../model/User');
async function createUser({ account, name, password, avatar }) {
    const checker = await User.find({ account: account });

    if (!checker.length) {
        const user = new User({
            account: account,
            name: name,
            password: password,
            avatar: avatar,
        })

        const result = await user.save();
        return result
    }
    return null;
}
module.exports = createUser