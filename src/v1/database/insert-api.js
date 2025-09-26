import dbConnect from "./dbConnect";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const result = dbConnect("insert", data);

    //console.log("Workout inserted: " + result);
    
    if(result) {
      res.status(201).json({ message: "Workout inserted!" });
    } else {
      res.status(201).json({ message: "Workout NOT inserted!" });
    }
  }
};

export default handler;
