const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);    
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const project = {
      id : uuid(), 
      title, 
      url,
      techs,
      likes: 0
  };
  repositories.push(project);
  return response.json(project);  
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const projectindex = repositories.findIndex(project => project.id == id);
  if(projectindex < 0)
      return response.status(400).json({erro : "Project not found" });

  repositories[projectindex]["title"] = title;
  repositories[projectindex]["url"] = url;
  repositories[projectindex]["techs"] = techs;
  return response.json(repositories[projectindex]); 
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const projectindex = repositories.findIndex(project => project.id == id);
  if(projectindex < 0)
    return response.status(400).json({erro : "Project not found" });
  repositories.splice(projectindex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const projectindex = repositories.findIndex(project => project.id == id);
  if(projectindex < 0)
    return response.status(400).json({erro : "Project not found" });
  repositories[projectindex]["likes"] +=1;
  response.json(repositories[projectindex]);
});

module.exports = app;
