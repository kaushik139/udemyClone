//finding item by id
async function getItemById(model, itemName, req, res, next) {
    try {
        const item = await model.findById(req.params.id);
        if (item === null) {
            return res.status(404).json({ message: `${itemName} not Found!` });
        }
        res[itemName] = item;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

//checking for already existing emails, used in signup
async function checkEmail(model, req, res, next) {
    try {
        const item = await model.findOne({ email: req.body.email });
        if (item !== null) {
            return res.status(422).json({ message: "E-mail already exists!" })
        }
        else {
            next()
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}




module.exports = {
    checkEmail,
    getItemById
}