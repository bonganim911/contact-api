const route = require('express')
const router = route.Router()
const { getContacts,
    getContact,
    deleteContact,
    updateContact,
    createContact} = require("../controller/contactController")
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route('/').get(getContacts).post(createContact)
router.route('/:id').put(updateContact).delete(deleteContact).get(getContact)

module.exports = router
