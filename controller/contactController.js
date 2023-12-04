const Contact = require("../models/contactModel")
const asyncHandler = require("express-async-handler")

const getContacts =  (async(req, res) => {
    const contacts =  await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})

const getContact = asyncHandler(async (req, res) => {
    res.status(200).json(findContact(req.param('id')))
})

const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone } = req.body
    if(!name || !email || !phone ){
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const newContact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(newContact)
})

const updateContact = asyncHandler(async(req, res) => {
    const id = req.param('id');
    const contact =await findContact(id)
    if(!contact){
        res.status(403)
        throw new Error("Not authorized to update this user")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User doenst have permission to update other users")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        req.body,
    {new: true}
    )
    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {
    const id = req.param('id');
    const contact = await findContact(id)
    if(!contact){
        res.status(403)
        throw new Error("Not authorized to delete this user")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User doenst have permission to delete other users")
    }

    await Contact.findByIdAndRemove(id)
    res.status(200).json({"message": `Delete a contact ${req.param('id')}`})
})

const findContact = async (id) => {
    const contact =  await Contact.findById(id)
    if(!contact){
        res.status(404)
        throw new Error("No contact found")
    }
    return contact
}

module.exports = { createContact, getContacts, getContact, deleteContact, updateContact}
