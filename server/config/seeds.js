const db = require('./connection');
const { User, WishList, Item } = require('../models');

db.once('open', async () => {

    await WishList.deleteMany();
    await Item.deleteMany();
    await User.deleteMany();

    await User.create({
        firstName: 'Pamela',
        lastName: 'Washington',
        username: 'PamWashington',
        email: 'pamela@testmail.com',
        password: 'password12345',
    });

    await User.create({
        firstName: 'Elijah',
        lastName: 'Holt',
        username: 'EliHolt',
        email: 'eholt@testmail.com',
        password: 'password12345',
        lists: [
            {
                name: 'Birthday',
                month: 2,
                day: 3,
                year: 2022,
                items: [
                    {
                        name: 'Cocktail Shaker',
                        link: 'https://www.amazon.com/Barfly-M37009-Shaker-Cocktail-Stainless/dp/B07FPK6HRZ?th=1',
                        specialNote: 'Copper one, please!',
                        price: 30,
                        isClaimed: false
                    }
                ]
            }
        ]
    });

    console.log('users seeded');

    process.exit();
});
