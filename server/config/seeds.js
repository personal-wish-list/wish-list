const db = require('./connection');
const { User, WishList, Item } = require('../models');

db.once('open', async () => {

    await WishList.deleteMany();
    await Item.deleteMany();
    await User.deleteMany();

    await User.create({
        firstName: 'Pamela',
        lastName: 'Washington',
        email: 'pamela@testmail.com',
        password: 'password12345',
    });

    await User.create({
        firstName: 'Elijah',
        lastName: 'Holt',
        email: 'eholt@testmail.com',
        password: 'password12345'
    });

    console.log('users seeded');

    process.exit();
});
