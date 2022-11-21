const app = require("express")();
(bodyParser = require("body-parser")), (fs = require("fs")), (port = 3080);

// import library and files
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");

console.log("Listening at:// port:%s", `${port}`);
console.log("Listening at:// localhost:%s/api-docs", `${port}`);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { customCss })
);
app.use(bodyParser.json());

require("./endpoints")(app);
