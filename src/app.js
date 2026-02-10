import express from 'express';


const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'EdTech API is running!' });
});

export default app;
