import { dbConnect } from "./dbConnect.js";

export const saveToDatabase = (data) => {
  const result = dbConnect("insert", data);

  //console.log("Workout inserted: " + result);

  if (result) {
    res.status(201).json({ message: "Workout inserted!" });
  } else {
    res.status(201).json({ message: "Workout NOT inserted!" });
  }
};
