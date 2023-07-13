const express = require('express')
const User = require('../models/User.model');
const Calendar = require('../models/Calendar.model');
const isLoggedIn = require('../middleware/isLoggedIn');
const isUser = require('../middleware/isUser');
const createCalendar = require('../utils/create-calendar');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router()

// this route is only accessible for normal users
// here theyr're gonna pick a calendar owner to
// book a service
router.get('/list', isLoggedIn, isUser, async (req, res, next) => {
    // we take all the users  that are admins
    // if were using stores or another we lost them here
    // basically we list the owners of the calendars
    let users = await User.find({role: 'Admin'}, { password: 0 } )
    res.render('owners/list', { users })
})

router.get('/:userId/detail', isLoggedIn, isUser, async (req, res, next) => {
    // seleccionamos al owner del calendario para tener su id
    const { userId } = req.params;

    // recolectamos la informacion del calendario (que horarios estan disponibles y cuales ocupados)
    const calendarData = await Calendar.findOne({ userId })      
    .populate('userId')
    .populate({
         path: 'days',
         populate: { 
            path: 'appointments', 
            model: 'Appointment'
        }
    })

    console.log('calendarData:', calendarData)
    const calendar = createCalendar(calendarData)
    res.render('owners/detail',  { rows: calendar.rows, calendarId: calendarData && calendarData._id  })
});

router.get('/:adminId/calendar', isLoggedIn, isAdmin, async (req, res, next) => {
    const { adminId } = req.params;

    const calendarData = await Calendar.findOne({ userId: adminId })      
    .populate('userId')
    .populate({
         path: 'days'
    })

    console.log('calendarData:', calendarData)
    const calendar = createCalendar(calendarData);
    res.render('admin/calendar',  { rows: calendar.rows });
});

router.post('/:adminId/calendar', isLoggedIn, isAdmin, async (req, res, next) => {
    const { adminId } = req.params;

    // The updated hours would be in req.body
    const updatedHours = req.body;

    // Here, you would need to implement the logic to update the available hours
    // in the admin's calendar

    // After the update, you can redirect to the calendar view
    res.redirect(`/admin/${adminId}/calendar`);
});



module.exports = router;