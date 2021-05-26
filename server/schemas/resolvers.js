const { AuthenticationError } = require('apollo-server-express');
const { User, WishList, Item } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {

  Query: {

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate('friends')
          .populate('wishlist');

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

    users: async (parent, args, context) => {
      if (context.user) {
        const user = await User.find()
          .populate('friends')
          .populate('wishlist');

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

    username: async (parent, args, context) => {
      console.log(args);

      if (context.user) {
        return await User.findOne(args);
      }
    },

    // checkout: async (parent, args, context) => {
    //   const url = new URL(context.headers.referer).origin;
    //   const order = new Order({ products: args.products });
    //   const { products } = await order.populate('products').execPopulate();
    //   const line_items = [];

    //   for (let i = 0; i < products.length; i++) {
    //     // generate product id
    //     const product = await stripe.products.create({
    //       name: products[i].name,
    //       description: products[i].description,
    //       images: [`${url}/images/${products[i].image}`]
    //     });

    //     // generate price id using the product id
    //     const price = await stripe.prices.create({
    //       product: product.id,
    //       unit_amount: products[i].price * 100,
    //       currency: 'usd'
    //     });

    //     // add price id to the line items array
    //     line_items.push({
    //       price: price.id,
    //       quantity: 1
    //     });
    //   }

    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items,
    //     mode: 'payment',
    //     success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
    //     cancel_url: `${url}`
    //   });

    //   return { session: session.id };
    // }
  },

  Mutation: {

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addWishList: async (parent, { name, month, day, year, items }, context) => {
      if (context.user) {
        const list = new WishList({ name, month, day, year, items });

        await User.findByIdAndUpdate(context.user._id, { $push: { lists: list } });

        return list;
      }

      throw new AuthenticationError('Not logged in');
    },

    updateWishList: async (parent, args, context) => {
      const itemObj = args.input;
      const wishId = args._id;

      const item = new Item(itemObj);

      const updatedList = await WishList.findOneAndUpdate(
        { _id: wishId },
        {
          $addToSet: { items: item }
        },
        { new: true }
      );

      let updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        {
          $pull: {
            lists: { _id: wishId }
          }
        },
        { new: true });

      updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        {
          $push: {
            lists: updatedList
          }
        },
        { new: true }
      );

      return updatedUser;

    },
  }
};

module.exports = resolvers;
