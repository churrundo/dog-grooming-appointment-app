document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'dayGrid' ],
        events: '/path/to/your/events', // This should be replaced with the actual endpoint that will return your events.
    });

    calendar.render();
});