const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const fs = require('fs')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8')


const eventController = require('./controller/event.controller')



const app = express();
const port = process.env.PORT || 5173;

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));


app.get('/api/events', (req, res) => {
    eventController.getEvents().then(data => res.json(data));
});

app.post('/api/event', (req, res) => {
    console.log(req.body);
    eventController.createEvent(req.body.event).then(data => res.json(data));
});

app.put('/api/task', (req, res) => {
    eventController.updateTask(req.body.task).then(data => res.json(data));
});

app.delete('/api/task/:id', (req, res) => {
    eventController.deleteTask(req.params.id).then(data => res.json(data));
});

app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});



app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})