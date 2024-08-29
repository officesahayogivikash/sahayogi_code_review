const User = require('../../model/userModel/User');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
 
// Register a new user
const registerUser = async (req, res) => {
    try {
        const { userType, role, name, email, password, organizationType, team, employeeType, orgAdmins, professionType,crm, ecom, payroll } = req.body;
 
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
 
        // Validate professionType based on userType
        if (userType === 'Business' && professionType) {
            return res.status(400).json({ message: 'professionType should be null for Business userType.' });
        }
 
        if (userType === 'Professional' && !professionType) {
            return res.status(400).json({ message: 'professionType is required for Professional userType.' });
        }
 
        // Generate a salt and hash the password
        const salt = genSaltSync(parseInt(process.env.saltRounds));
        const hashedPassword = hashSync(password, salt);
 
        // Create a new user
        if(!employeeType){
            const newUser = new User({
                userType, role, name, email, password: hashedPassword, organizationType, team, orgAdmins, professionType: userType === 'Professional' ? professionType : null,crm, ecom, payroll 
            });
            await newUser.save();
            res.status(201).json({
                message: "User registered successfully",
                user: newUser
            });
        }
        else{
            const newUser = new User({
                userType, role, name, email, password: hashedPassword, organizationType, team,employeeType, orgAdmins, professionType: userType === 'Professional' ? professionType : null,crm, ecom, payroll 
            });
            await newUser.save();
            res.status(201).json({
                message: "User registered successfully",
                user: newUser
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
 
// User login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('This is login page');
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });
 
        // Check if the password matches
        const isMatch = compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
 
        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
 
        res.status(200).json({ message: 'Login successful', token, role:  user.role });

 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
 
// Update user information
const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;  // Extracted from JWT token
        const updates = req.body;
        updates.updatedAt =  Date.now();

        const  user = await User.findById(userId);
        if(user.role === 'User') res.json(404).json({message: 'You have no control to update this user'});
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
 
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
 
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
 
// Delete (soft delete) a user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndUpdate(userId, { isDelete: true }, { new: true });
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
 
// Get user information by ID (no authorization required)
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const user = await User.findById(userId);
        
        if (!user) return res.status(404).json({ message: 'User not found' });
 
        res.status(200).json({ user });
 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
 
// Get all users (no authorization required)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
 
module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsers  
}; 
