function decorateHtmlRespons(page_title){
    return function (req, res, next){
            res.locals.title = page_title;
            res.locals.fildname = {};
            res.locals.error = {};
            res.locals.data = {};
            res.locals.comonMessage = " ";
            res.locals.user = false,
            next();
    }
};

module.exports = decorateHtmlRespons;