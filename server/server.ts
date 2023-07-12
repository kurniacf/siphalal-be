import express, { Express } from 'express';
const cors = require('cors');
const multer = require('multer');
const morgan = require('morgan');
const app: Express = express();

// Add CORS middleware
app.use(cors());

// Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// for parsing multipart/form-data
app.use(multer().array());
app.use(express.static('public'));

// Morgan logging middleware
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Hello from SIPHalal Server!');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});