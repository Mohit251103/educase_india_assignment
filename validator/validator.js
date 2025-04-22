const { z } = require("zod");

const schoolSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    latitude: z.number().refine(val => Math.abs(val) <= 90, {
        message: "Latitude must be between -90 and 90"
    }),
    longitude: z.number().refine(val => Math.abs(val) <= 180, {
        message: "Longitude must be between -180 and 180"
    }),
})

module.exports = schoolSchema;