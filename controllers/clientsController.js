import joi from 'joi';
import mongo from '../db/db.js';
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

let db = await mongo();

const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(8).required(),
    confirmpassword: joi.any().valid(joi.ref('password'))
});

const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
});

/* REGISTER */
const register = async (req,res)=>{
    const validation = registerSchema.validate(req.body,{abortEarly:true});
    if(validation.error){
        res.sendStatus(422);
        return;
    };

    const {name, email, password, confirmpassword} = req.body;
    const criptpassword = bcrypt.hashSync(password,10);
    const register = {
        name: name,
        email: email,
        password: criptpassword
    };

    try{
        const onlyuser = await db.collection('clients').findOne({email});
        if(!onlyuser){
            await db.collection('clients').insertOne(register);
            res.sendStatus(201);
        } else {
            res.sendStatus(422);
        };

    }catch(err){
        res.send(err);
    };
};
/* LOGIN */
const login = async (req,res)=>{
    const { email, password } = req.body;
    const validation = loginSchema.validate(req.body, {abortEarly:true});
    if (validation.error){
        res.sendStatus(422);
        return;
    };

    try{
        const user = await db.collection('clients').findOne({email});
        if (user && bcrypt.compareSync(password, user.password)){
            const token = uuid();
            await db.collection('sessions').insertOne({
                userId:user._id,
                token
            });
            res.send({token:token,name:user.name});
        } else {
            res.sendStatus(422);
            return;
        };

    }catch(err){
        res.send(err);
    };
};

const logout = async (req,res)=>{
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    try{
        await db.collection('sessions').deleteOne({token: token});
    }catch(err){
        res.send(err);
    }

};

export {login, register, logout};
