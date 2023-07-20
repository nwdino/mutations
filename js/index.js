const Calendar = tui.Calendar;
let calendar = null;

let DateTime = luxon.DateTime;

let key = 'AIzaSyDS-E--dicylauPwY5xWawXtPwuUfJlJG0';

function monthName() {
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const currentDate = new Date();
	return monthNames[currentDate.getMonth()];
}

async function fetchGoogleCalendarEvents() {
	const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/136045b1e4988850112ff9f4f3b87b877ca84def5b43a72980927e0614c58509@group.calendar.google.com/events?key=' + key);
	const data = await response.json();
	return data.items;
}

function convertToTuiEvent(googleEvent) {
	const end = googleEvent.end.dateTime || googleEvent.end.date;
	let exclEnd = DateTime.fromISO(end).minus({ seconds: 1 });

	return {
		id: googleEvent.id,
		calendarId: googleEvent.calendarId,
		title: googleEvent.summary,
		start: googleEvent.start.dateTime || googleEvent.start.date,
		end: exclEnd.toJSDate(),
		backgroundColor: getColor(googleEvent.summary),
	};
}

async function createTuiCalendarEvents() {
	const googleEvents = await fetchGoogleCalendarEvents();
	const tuiEvents = googleEvents.map(convertToTuiEvent);
	calendar.createEvents(tuiEvents);
}

function createCalendar() {
	const container = document.getElementById('calendar');
	const options = {
		usageStatistics: false,
		isReadOnly: true,
		defaultView: 'month',
		month: {
			startDayOfWeek: 1,
			visibleEventCount: 6,
		},
		eventFilter: (event) => {
			return isMutation(event.title);
		},
		theme: {
			common: {
				backgroundColor: 'rgb(30, 30, 30)',
				border: '1px solid #404040',
				dayName: { color: 'rgb(255, 255, 255)' },
				holiday: { color: 'rgb(255, 255, 255)' },
				saturday: { color: 'rgb(255, 255, 255)' },
				today: { color: 'rgb(255, 255, 255)' },
			},
			month: {
				dayExceptThisMonth: { color: 'rgb(196, 196, 196)' },
				holidayExceptThisMonth: { color: 'rgb(196, 196, 196)' },
				dayName: {
				  borderLeft: 'none',
				  backgroundColor: 'inherit',
				},
				today: { color: 'blue' },
				weekend: { backgroundColor: 'rgb(10, 10, 10)' },
				moreView: {
					border: '1px solid #404040',
					boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
					backgroundColor: 'rgb(60, 60, 60)',
					width: 320,
					height: 240,
				},
				moreViewTitle: { backgroundColor: 'rgb(231, 231, 231)' },
			},
		},
	};
	calendar = new Calendar(container, options);
	createTuiCalendarEvents();
}

$(function() {
	document.getElementById("month-name").innerHTML = monthName();
    createCalendar();
});
