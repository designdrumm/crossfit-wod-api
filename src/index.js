import express from "express";
import bodyParser from "body-parser";
import apicache from "apicache";

import workoutRoutes from "./v1/routes/workoutRoutes.js";
import memberRoutes from "./v1/routes/memberRoutes.js";

import { swaggerDocs } from "./v1/docs/swagger.js";

const app = express();
const cache = apicache.middleware;
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cache("2 minutes"));
app.use("/api/v1/workouts", workoutRoutes);
app.use("/api/v1/members", memberRoutes);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  swaggerDocs(app, PORT);
});


// const server = app.listen(PORT, () => {
//   console.log(`API is listening on port ${PORT}`);
//   swaggerDocs(app, PORT);
// });

// To stop the server from listening
// For example, after a certain time or based on an event
// setTimeout(() => {
//     server.close(() => {
//       console.log('HTTP server closed.');
//     });
//   }, 5000); // Close the server after 5 seconds
