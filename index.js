const express = require("express");
const cors = require("cors");
const router = require("./route");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerOptions = require("./swagger.json");
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/service/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cors("*"));
app.use("/service", router);

app.listen(9096, (req, res) => {
  console.log("server started");
});
module.exports=app;