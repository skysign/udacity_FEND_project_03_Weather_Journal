// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

app.post('/postProjectData', postProjectData);
function postProjectData(req, res) {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;

    console.log(`postProjectData`);
    console.log(`projectData: ${projectData['temp']}`);
    console.log(`projectData: ${projectData['date']}`);
    console.log(`projectData: ${projectData['content']}`);

    res.send(projectData);
}

app.get('/getProjectData', getProjectData);
function getProjectData(req, res) {
    console.log(`getProjectData: ${projectData}`);
    res.send(projectData);
}

// Setup Server
const port = 80;
const server = app.listen(port, () => {
    console.log(`server port: ${port}`);
});