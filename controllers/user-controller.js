import { execute } from '../mysql';
import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export async function createUser(req, res, next) {

    try {
        // var query = `SELECT * FROM users WHERE email = ?`;
        // var result = await mysql.execute(query, [req.body.email]);

        // if (result.length > 0) {
        //     return res.status(409).send({ message: 'Usuário já cadastrado' })
        // }

        // const hash = await bcrypt.hashSync(req.body.password, 10);

        const users = req.body.users.map(user => [
            user.email,
            hashSync(user.password, 10)
        ])

        query = 'INSERT INTO users (email, password) VALUES ?';
        const results = await execute(query, [ users ]);

        const response = {
            message: 'Usuário criado com sucesso',
            createdUsers: req.body.users.map(user => { return { email: user.email } })
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

export async function Login(req, res, next) {

    try {
        const query = `SELECT * FROM users WHERE email = ?`;
        var results = await execute(query, [req.body.email]);

        if (results.length < 1) {
            return res.status(401).send({ message: 'Falha na autenticação' })
        }

        if (await compareSync(req.body.password, results[0].password)) {
            const token = sign({
                userId: results[0].userId,
                email: results[0].email
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            });
            return res.status(200).send({
                message: 'Autenticado com sucesso',
                token: token
            });
        }
        return res.status(401).send({ message: 'Falha na autenticação' })

    } catch (error) {
        return res.status(500).send({ message: 'Falha na autenticação' });
    }
}