import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

export const dbConnect = async (process, insertData) => {
  const client = await MongoClient.connect("<MongoDB cluster url>", {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  //TODO: connetion error checking

  const workoutsCollections = await client
    .db("crossfit-wod-app")
    .collection("crossfit-data");

  let workoutsData;

  switch (process) {
    case "find":
      if (insertData.length > 0) {
        if (insertData === "id") {
          workoutsData = await workoutsCollections
            .find({}, { _id: 1 })
            .toArray();
        } else if (insertData === "all") {
          workoutsData = await workoutsCollections.find().toArray();
        } else {
          workoutsData = await workoutsCollections.findOne({
            _id: ObjectId(insertData),
          });
        }
      }
      break;
    case "insert":
      workoutsData = await workoutsCollections.insertOne(insertData);
      break;
  }

  client.close();

  return workoutsData;
};
