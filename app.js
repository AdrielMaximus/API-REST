import express from 'express';
const app = express();

app.use('/teste', (req, res, next) => {
    res.status(200).send({
        message: 'It works!'
    });
});

export default app;