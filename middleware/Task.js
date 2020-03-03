var asyncTask = function(promise) 
{
    return promise.then(data => [null, data])
    .catch(err => [err]);
}

module.exports = asyncTask;