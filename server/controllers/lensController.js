const Lens = require("../models/Lens");

exports.createLens = async (req, res, next) => {
    try {
        const { name, description, location, tags, creator } = req.body;
        console.log(req.body)
        if (!name || !location || !creator) {
            return res.status(400).json({
                status: 'error',
                message: 'Name, location, and creator are required fields',
                data: null
            });
        }

        const newLens = await Lens.create({
            name,
            description,
            location,
            tags,
            creator
        });

        res.status(201).json({
            status: 'success',
            data: {
                lens: newLens
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            data: null
        });
    }
};