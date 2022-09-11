import joi from 'joi';

const transactionSchema = joi.object({
    operation: joi.string().required().valid('enter').valid('out'), 
    amount: joi.number().required(), 
    description: joi.string().min(5).required()
});

function verification( req, res, next ){
    const validation = transactionSchema.validate(req.body, {abortEarly:true});
    if(validation.error){
        res.sendStatus(422);
        return;
    };

    next();
};

export default verification;