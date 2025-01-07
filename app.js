import express from 'express';
const app = express();
import routes from './routes/products';
import morgan from 'morgan';
app.use(morgan('dev'));
app.use('/products', routes);
app.use('/test', (req, res, next) => {
    res.status(200).send({
        
        message: 'Hello World'
    });
});

export default app;