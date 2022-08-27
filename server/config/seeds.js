const db = require("./connection");
const { User, Listing } = require("../models");

db.once("open", async () => {
   await User.deleteMany();
   await Listing.deleteMany();

   // create users
   const users = await User.insertMany([
      {
         firstName: "Michael",
         lastName: "Faugno",
         email: "michael@email.com",
         password: "test1234",
      },
      {
         firstName: "Richard",
         lastName: "Salvatore",
         email: "Richard@email.com",
         password: "test1234",
      },
      {
         firstName: "Andrew",
         lastName: "Faugno",
         email: "andrew@email.com",
         password: "test1234",
      },
   ]);

   // create listings
   const listing1 = await Listing.create({
      name: "iPhone",
      description: "Lorem ipsum",
      price: 1199.99,
      image: "imagePathHere",
   });

   const listing2 = await Listing.create({
      name: "GPU",
      description: "Lorem ipsum",
      price: 199.99,
      image: "imagePathHere",
   });

   const listing3 = await Listing.create({
    name: "Blanket",
    description: "Lorem ipsum",
    price: 22.50,
    image: "imagePathHere",
 });

   // push listings to users
   await User.updateOne({ firstName: "Andrew" }, { $push: { listings: listing1 } });
   await User.updateOne({ firstName: "Michael" }, { $push: { listings: listing2 } });
   await User.updateOne({ firstName: "Richard" }, { $push: { listings: listing3 } });


   console.log("All done!");
   process.exit(0);
});
