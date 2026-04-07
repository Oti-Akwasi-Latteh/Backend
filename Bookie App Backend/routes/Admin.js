// routes/adminRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Admin = require('../models/Admin');

// ===============================
// ADMIN SIGNUP
// ===============================
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin
        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isAdmin: true
        });

        await newAdmin.save();

        res.status(201).json({
            message: 'Admin registered successfully',
            admin: {
                id: newAdmin._id,
                firstName: newAdmin.firstName,
                lastName: newAdmin.lastName,
                email: newAdmin.email,
                isAdmin: newAdmin.isAdmin
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ===============================
// ADMIN LOGIN
// ===============================
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.status(200).json({
            message: 'Login successful',
            admin: {
                id: admin._id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                isAdmin: admin.isAdmin
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;