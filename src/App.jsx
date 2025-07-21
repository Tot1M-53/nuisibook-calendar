import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr'
import { useState } from 'react'
import './App.css'

function App() {
  const [events, setEvents] = useState([
    { title: 'Intervention Client A', date: '2025-07-22', color: '#4CAF50' },
    { title: 'Intervention Client B', date: '2025-07-25', color: '#2196F3' },
  ])
  
  const [showEventForm, setShowEventForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [newEvent, setNewEvent] = useState({ title: '', date: '' })

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr)
    setNewEvent({ title: '', date: arg.dateStr })
    setShowEventForm(true)
  }

  const handleEventAdd = () => {
    if (newEvent.title.trim() !== '') {
      setEvents([...events, { ...newEvent, color: '#4CAF50' }])
      setShowEventForm(false)
      setNewEvent({ title: '', date: '' })
    }
  }

  const handleEventDrop = (info) => {
    const updatedEvents = events.map(event => {
      if (event.title === info.event.title && event.date === info.oldEvent.startStr) {
        return { ...event, date: info.event.startStr }
      }
      return event
    })
    setEvents(updatedEvents)
  }

  return (
    <div className="calendar-container">
      <header>
        <h1>Nuisibook Calendar</h1>
      </header>
      
      <main>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          locales={[frLocale]}
          locale="fr"
          events={events}
          dateClick={handleDateClick}
          editable={true}
          selectable={true}
          height="auto"
          eventDrop={handleEventDrop}
          eventColor="#4CAF50"
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          buttonText={{
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine",
            day: "Jour"
          }}
          allDayText="Toute la journée"
        />

        {showEventForm && (
          <div className="event-form">
            <h3>Nouvelle intervention pour le {selectedDate}</h3>
            <input
              type="text"
              placeholder="Nom de l'intervention"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <div className="form-buttons">
              <button onClick={handleEventAdd}>Ajouter</button>
              <button onClick={() => setShowEventForm(false)}>Annuler</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
