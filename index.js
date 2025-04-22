const express = require("express");
const schoolRouter = require("./routes/schoolRoutes")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.use('/api', schoolRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})