

async function controller(req, res) {
    console.log(';;');
    console.log(req.params.id);

    if (res.courses.status === 'requested') {
        res.status(202).json('Already Requested!')
    }
    else {
        try {
            res.courses.status = 'requested';
            res.courses.save();
            res.status(200).json('Requested to Publish')
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = { controller }