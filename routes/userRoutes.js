const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    socialLogin, // Changed from googleLogin to socialLogin
    createAdmin,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Profile routes
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

// Root routes (Register and Admin Get Users)
router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);

// Authentication routes
router.post('/login', authUser);

/**
 * Universal route for Social Login (Google & GitHub)
 * This replaces the old /google route
 */
router.post('/social-login', socialLogin);

// Admin creation route
router.post('/admin', protect, admin, createAdmin);

// User Management routes by ID
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

module.exports = router;