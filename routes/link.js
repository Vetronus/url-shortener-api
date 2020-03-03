'use strict'
const express = require("express");
const router = express.Router();
const Link = require(__dirname + "/../models/Link");
const task = require(__dirname + "/../middleware/Task");

async function createNewLink(req, res, next)
{
    let url = req.body.url;
    if(!(url.includes("https://") || url.includes("http://")))
        url = "http://" + url;

    console.log(url);
    let newLink = new Link({url: url});

     const [err, link] = await task(newLink.save());
     if(err) return next(err);
     
     req.rd = link;
     return next();
}

async function redirect(req, res, next)
{
    let id = req.params.id;
    const [err, link] = await task(Link.findOne({id: id}));
    if(err) return next(err);
    else if(!link) res.redirect('https://aroxbit.com/');
    else res.status(301).redirect(link.url);
    return;
}


async function showAllLinks(req, res, next)
{
    const [err, links] = await task(Link.find({}));
    if(err) return next(err);
    req.rd = links;
    next();
}


function deleteAllLinks(req, res, next)
{
    Link.deleteMany({}, function(err, result)
    {
        if(err) next(err);
        req.rd = "Deleted " + result.n + " objects.";
        next();
    })
}

function ping(req, res, next)
{
    req.rd = "Hello!";
    next();
}


router.post("/", createNewLink);
router.get("/ping/it", ping);
router.get("/:id", redirect);
router.get("/", showAllLinks);
router.delete("/", deleteAllLinks);


module.exports = router;