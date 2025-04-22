const db = require("../config/db")
const schoolSchema = require("../validator/validator")

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
}


exports.getSchools = async (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLong = parseFloat(req.query.longitude);


    if (isNaN(userLat) || isNaN(userLong)) {
        return res.status(400).json({
            message: "Incorrect latitude and longitude"
        })
    }

    try {
        
        const [schools] = await db.execute('SELECT * FROM school');
        const sortedSchools = schools.map((school) => {
            const dist = getDistanceFromLatLonInKm(userLat, userLong, school.latitude, school.longitude);
            return { ...school, dist };
        }).sort((a, b) => a.dist - b.dist);

        return res.status(200).json({
            data: sortedSchools
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
};


exports.addSchool = async (req, res) => {
    const validationResult = schoolSchema.safeParse(req.body)

    if (!validationResult.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResult.error.errors
        })
    }
    const { name, address, latitude, longitude } = validationResult.data;

    try {

        const [result] = await db.execute(
            'INSERT INTO school (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );

        return res.status(201).json({
            message: "School added successfully",
            schoolId: result.insertId
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};