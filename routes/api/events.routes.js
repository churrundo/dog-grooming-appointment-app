const express = require('express');
const router = express.Router();

const Appointment = require('../../models/Appointment.model');
//GET
router.get('/', async (req, res, next) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        next(error);
    }
});
//POST
router.post('/', async (req, res, next) => {
    try {
        const newAppointment = await Appointment.create(req.body);
        res.json(newAppointment);
    } catch (error) {
        next(error);
    }
});
//PUT
router.put('/:id', async (req, res, next) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAppointment);
    } catch (error) {
        next(error);
    }
});
//DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndRemove(req.params.id);
        res.json(deletedAppointment);
    } catch (error) {
        next(error);
    }
});

module.exports = router;