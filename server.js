const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./schema'); 

dotenv.config(); 

const app = express();
app.use(express.json()); 


app.post('/satya', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send({ msg: "User created successfully", data: newUser });
    } catch (error) {
        res.status(400).send({ msg: "Error creating user", error: error.message });
    }
});


app.get('/get', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ msg: "Error retrieving users", error: error.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
});
