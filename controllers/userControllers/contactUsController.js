const ContactSchema = require('../../model/userModel/ContactUs');


//Handle  create contact us
async function handleSendContact(req, res) {
    try {
        const { name, email, phoneNo, description } = req.body; 
        if (!name || !email || !phoneNo) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const newContact = new ContactSchema({ name, email, phoneNo, description });
        await newContact.save();

        res.status(200).json({
            message: 'Contact us form submitted successfully',
            userContact: newContact
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//get all Users by sells department is not deleted
async function getAllUserContacts(req, res) {
    try {
        const contacts = await ContactSchema.find({ isDelete: false });
        res.status(200).json({
            message: 'All user contact us form data',
            contacts: contacts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//deleted by sell department
async function deleteUserById(req, res) {
    const userId = req.params.id;

    try {
        // Find the user by ID and set isDeleted to true
        const deletedUser = await ContactSchema.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            deletedUser: deletedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




module.exports = {
    handleSendContact,
    getAllUserContacts,
    deleteUserById
}