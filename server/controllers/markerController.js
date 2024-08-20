const Lens = require("../models/Lens");
const Marker = require("../models/Marker");

exports.createMarker = async (req, res, next) => {
    try {
        const { lensId, location, title, description, category, image, address } = req.body;
        if (!lensId || !title || !category) {
            return res.status(400).json({
                status: 'error',
                message: 'LensID, title, location and creator are required fields',
                data: null
            });
        }

        const newMarker = await Marker.create({
            title,
            description,
            location,
            category,
            image,
            address
        });

        const lens = await Lens.findById(lensId)

        if (!lens) {
            return res.status(404).json({
                status: 'error',
                message: 'Invalid lens id',
                data: null
            });
        }

        lens.markers.push(newMarker._id)

        await lens.save()

        res.status(201).json({
            status: 'success',
            data: newMarker
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


exports.getMarker = async (req, res, next) => {
    try {
        const { id } = req.params;

        const marker = await Marker.findById(id)

        if (!marker) {
            return res.status(404).json({
                status: 'error',
                message: 'Invalid lens id',
                data: null
            });
        }

        res.status(201).json({
            status: 'success',
            data: marker
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


exports.updateMarker = async (req, res, next) => {
    try {
        const markerId = req.params.id;
        const updatedMarkerDetails = req.body;

        const updatedMarker = await Marker.findByIdAndUpdate(markerId, updatedMarkerDetails, {
            new: true,
            runValidators: true
        });

        if (!updatedMarker) {
            return res.status(404).json({
                status: 'error',
                message: 'Marker not found',
                data: null
            });
        }

        res.status(200).json({
            status: 'success',
            message: "Marker updated successfully",
            data: updatedMarker
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            data: null
        });
    }
};

exports.deleteMarker = async (req, res, next) => {
    try {
        const { id } = req.params;

        const marker = await Marker.findByIdAndDelete(id)

        res.status(201).json({
            status: 'success',
            message: "Marker deleted successfully",
            data: null
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