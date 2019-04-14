
const express = require('express');
const router = express.Router();
var moment = require('moment');
const Joi = require('joi');

const Certificate = require('../../models/Certificate.js')
const certificateValidator = require('../../validations/CertificateValidations.js')

//Certificate CRUDS

//creat certificate 
router.post('/', async (req, res) => {
    try {
        const isValidated = certificateValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const certificate = await Certificate.create(req.body)
        res.send({ msg: 'Certificate is created ', data: certificate });
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }

})

//get Show all Certificates
//1
router.get('/', async (req, res) => {
    try {
        const certificates = await Certificate.find();
        if (!certificates) return res.status(404).send({ error: 'certificates do not exist' })
        res.json({ msg: 'You get the certificate', data: certificates })
    }
    catch (error) {
        res.status(404).send('Not found')
    }
});

//(id  => CertificateId)
//get certificate by id using mongo
//1
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const certificateFind = await Certificate.findById(id);
        if (!certificateFind) return res.status(404).send({ error: 'certificate does not exist' })
        res.json({ msg: 'You get the certificate', data: certificateFind })
    }
    catch (error) {
        res.sendStatus(404)
    }
});

//update certificate using mongo
//(certificate_id => certificateId)
//1
router.put('/:id', async (req, res) => {
    try {
        const certificateId = req.params.id
        const isValidated = certificateValidator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const updatedCertificate = await Certificate.findOneAndUpdate({ '_id': certificateId }, req.body)
        const cousreAfterUpdate = await Certificate.findById(certificateId)
        res.json({ data: cousreAfterUpdate});
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }
});

//(id  => educational_organizationId  ,certificate_id => certificateId)
//delete certificate using mongo
//1
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedformCertificates = await Certificate.findOneAndRemove({ '_id': id })
        res.send(deletedformCertificates)
        if (!deletedformCertificates) return res.send('Not found')
        res.json({ data: deletedformCertificates })
    }
    catch (error) {
        res.sendStatus(404).send('Not found');
    }

});

// End of Certificate CRUDS




module.exports = router;