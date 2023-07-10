const express = require('express');
const router = express.Router();
const Calendar = require('../models/Calendar.model');
const Day = require('../models/Day.model');

router.get("/calendar", (req, res, next) => {
    const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    const data = {
      rows: []
    };
  
    for (let i = 0; i < 24; i++) {
      let cols = []
      for (let j = 0; j < 7; j++) {
        cols.push({
          day: weekDays[j],
          hour: i
        })
      }
      data.rows.push({
        hour: i,
        cols
      })      
    }
  
    res.render("partials/calendar", { rows: data.rows });
  });

router.post('/create', async (req, res, next) => {
    const dayHours = Array(24).fill(1).map((_, i) => i);

    for (const day of Object.keys(req.body)) {
        await Day.create({
            date: new Date(), //
            name: day,
            openTimeBlocks: req.body[day]
        });    
    }
    console.log('req.body: ', req.body);
    res.redirect('/')
})

module.exports = router;
