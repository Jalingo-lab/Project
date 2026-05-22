const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/register', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            otherName,
            idNumber,
            dob,
            stateOfOrigin
        } = req.body;

        if (!firstName || !lastName || !idNumber || !dob || !stateOfOrigin) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }

        const existingStudent = await Student.findOne({ idNumber });

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: 'Student ID already exists'
            });
        }

        const newStudent = new Student({
            firstName,
            lastName,
            otherName,
            idNumber,
            dob,
            stateOfOrigin
        });

        await newStudent.save();

        res.status(201).json({
            success: true,
            message: 'Student registered successfully',
            student: newStudent
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            total: students.length,
            students
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});

module.exports = router;
