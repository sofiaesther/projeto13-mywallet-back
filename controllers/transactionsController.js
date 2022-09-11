import mongo from '../db/db.js';
import dayjs from 'dayjs';

let db = await mongo();

const transactions = async (req,res)=>{
    const client = res.locals.user;

    try{
        const usertransactions = await db.collection('transactions').find({userId: client._id}).toArray();
        console.log(usertransactions)
        res.sendStatus(201);


    }catch(err){
        res.send(err);
    };
};

const add = async ( req,res ) => {
    const client = res.locals.user;
    const { operation, amount, description } = req.body;
    let newTransaction = {
        userId: client._id,
        description: description,
        amount: amount,
        operation: operation,
        date: dayjs().format('DD/MM/YY')
    }

    try{
        db.collection('transactions').insertOne(newTransaction);
        res.sendStatus(201);

    }catch(err){
        res.send(err);
    };

};

export {transactions, add};