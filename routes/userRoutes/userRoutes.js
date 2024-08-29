const express = require('express');
const {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers
} = require('../../controllers/userControllers/userController');
const validateUser = require('../../middleware/userMiddleware/validateUser');
const loginValidation = require('../../middleware/userMiddleware/loginValidation');
const authenticateToken = require('../../middleware/userMiddleware/authenticateJWT');

const router = express.Router();

// Route to register a new user
router.post("/register", validateUser, registerUser);
// Route to login a user
router.post("/login", loginValidation, loginUser);

// Route to update a user's information (requires authentication)
router.patch("/update/:id", authenticateToken, updateUser);

// Route to soft delete a user (requires authentication)
router.delete("/delete/:id", authenticateToken, deleteUser);

// Route to get a user by ID (no authentication required)
router.get("/:id", getUserById);

// Route to get all users (no authentication required)
router.get("/", getAllUsers);

module.exports = router;
