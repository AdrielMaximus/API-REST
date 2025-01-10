import { verify } from 'jsonwebtoken';

export function required(req, res, next) {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: 'Falha na autenticação' });
    }

}

export function optional(req, res, next) {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (error) {
        next();
    }

}