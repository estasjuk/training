const HttpError = require('../helpers/HttpError');

const validateSearchParams = schema => { 
    const func = (req, _, next) => { 
        const {error} = schema.validate(req.query);
        if (error) {
            throw new HttpError(400, error.message);
        }
        next();
    }
    return func;
}

module.exports = validateSearchParams;