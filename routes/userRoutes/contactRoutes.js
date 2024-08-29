const express = require('express');
const router = express.Router();
const ContactSchema = require('../../model/userModel/ContactUs')
const {handleSendContact,
    getAllUserContacts,
    deleteUserById}= require('../../controllers/userControllers/contactUsController')



router.post('/sendContact',handleSendContact);

router.get('/',getAllUserContacts)

router.post('/delete/:id',deleteUserById)
module.exports = router;