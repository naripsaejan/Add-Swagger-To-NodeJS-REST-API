const express = require("express");
const path = require("path");
const app = express(),
  bodyParser = require("body-parser"),
  fs = require("fs"),
  port = 3080;

// import library and files
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");

// let express to use this
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);

// place holder for the data
const tasks = [
  {
    id: 1,
    task: "task1",
    assignee: "assignee1000",
    status: "completed",
  },
  {
    id: 2,
    task: "task2",
    assignee: "assignee1001",
    status: "completed",
  },
  {
    id: 3,
    task: "task3",
    assignee: "assignee1002",
    status: "completed",
  },
  {
    id: 4,
    task: "task4",
    assignee: "assignee1000",
    status: "completed",
  },
];

app.use(bodyParser.json());

app.get("/api/todos", (req, res) => {
  console.log("api/todos called!!!!!");
  res.json(tasks);
});

app.post("/api/todo", (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.json(tasks);
});

app.delete("/api/todo/:id", (req, res) => {
  console.log("Id to delete:::::", req.params.id);
  tasks = tasks.filter((task) => task.id != req.params.id);
  res.json(tasks);
});

app.put("/api/todo", (req, res) => {
  const taskToUpdate = req.body.task;
  tasks = tasks.map((task) => {
    if (task.id === taskToUpdate.id) task = taskToUpdate;
    return task;
  });
  res.json(tasks);
});

app.get("/", (req, res) => {
  res.send(`<h1>API Running on port localhost:${port}</h1>`);
});

app.listen(port, () => {
  // localhost:3080/api-docs

  console.log(
    `Server listening on the localhost:${port} or localhost:${port}/api-docs`
  );
  //   console.log(`Server listening on the port::::::${port}`);
});
