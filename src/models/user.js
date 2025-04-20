//DB대체용 임시 메모리 저장소
const users = [];

module.exports = {
    findByUsername: (username) => users.find(user => user.username === username),
    addUser: (user) => users.push(user),
};