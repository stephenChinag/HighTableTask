import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDb connected Succesfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection Error, please make sure MongoDB is running, ' " +
          err
      );
    });
  } catch (error) {
    console.log(error);
  }
}
