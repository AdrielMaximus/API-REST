import express from 'express';
import routes from './routes/products';
import morgan from 'morgan';

const app = express();
const routeproducts = require('./routes/products');
const routepedidos = require('./routes/pedidos');
const BodyParser = require('body-parser');



app.use('/pedidos', routepedidos);
app.use('/products', routeproducts);
app.use(morgan('dev'));
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use('/products', routes);
app.use('/test', (req, res, next) => {
    res.status(200).send({
        
        message: 'Hello World'
    });
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

export default app;