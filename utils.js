const e = require("express");

function paginatedResults(model, modelLength) {
    return async (req,res,next)=>{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex =  (page - 1) * limit;
        const endIndex = page * limit;
        
        const results = {};
        if(endIndex < await model.countDocuments().exec()){
            results.next = {
                page: page + 1,
                limit: limit
            };
        }
        if(startIndex > 0){
            results.prev = {
                page: page - 1,
                limit: limit
            };
        }
        try {
            results.result = await model.find().limit(limit).skip(startIndex).exec();
            res.paginatedResults = results;
            next();
        } catch (error) {
            res.status(500).json({message: e.message});
        }
    }
}

module.exports = {
    paginatedResults: paginatedResults
}
