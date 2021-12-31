import bcrypt from 'bcryptjs';

const users = [
    {
        name:'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name:'jhon Doe',
        email: 'jhon@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name:'sam smith',
        email: 'sam@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
]

export default users