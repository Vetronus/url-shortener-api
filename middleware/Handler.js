var log = function(log)
{
    // Simple logger
    if(global.DEBUG)
        console.log(log);
}

var handleRes = function(req, res, next)
{
    //middleware to send back response
    //logs all the information | req.log
    //collects all the data from req.rd (resData)
    let newResData  = {};
    
    if(req.rd) newResData.obj = req.rd;
    if(req.log) log(req.log);
    
    // console.log(req.rd);
    return res.json(newResData);
}


var handleError = function(err, req, res, next)
{
    let newE = {}
    if(res.statusCode === 200) 
    {
        res.status(502);
        newE.obj = "An error occured while accesing the database.";
    }
    else newE.obj = err.message;
    console.log("==========");
    console.log("| #error | "+err.message);
    console.log("==========");
    console.log(err.stack);
    console.log("==============================");

    return res.json(newE);
}



module.exports.log = log;
module.exports.handleRes = handleRes;
module.exports.handleError = handleError;