import express from 'express';
const app = express();
import { static as serveStatic } from 'express';
import morgan from 'morgan';
import { urlencoded, json } from 'body-parser';

import productRoute from './routes/product-route';
import categoryRoute from './routes/category-route';
import orderRoute from './routes/order-route';
import userRoute from './routes/user-route';
import imageRoute from './routes/image-route';

app.use('/uploads', serveStatic('uploads'));
app.use(urlencoded({ extended: false }));  // apenas dados simples
app.use(json()); // json de entrada no body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/products', productRoute);
app.use('/categories', categoryRoute);
app.use('/orders', orderRoute);
app.use('/users', userRoute);
app.use('/images', imageRoute);

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

export default app;