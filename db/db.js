import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

export default async function mongo(){
    let conn;

    try{

        conn= await mongoClient.db('projeto13');
        return conn;

    }catch(err){
        console.error(err);
        return err;
    };
};