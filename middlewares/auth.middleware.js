import joi from 'joi';
import mongo from '../db/db.js';

async function hasUser(req,res,next){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    try{
        let db = await mongo();

        if (!token ){
            res.sendStatus(401);
            return;
        };
        const session = await db.collection('sessions').findOne({ token });
        if (!session){
            res.sendStatus(401);
            return;
        };
    
        const user = await db.collection('clients').findOne({ _id:session.userId });
    
        if(!user){
            res.sendStatus(401);
            return;
        };

        res.locals.user = user;
        next();
    }catch(err){
        return res.sendStatus(500);
    }

}

export default hasUser;