const loginValidation = (req, res, next) => {
    console.log('this is loginValidation code')
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    next();
};

module.exports = loginValidation;
