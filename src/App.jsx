import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react'

function App() {
  const [events, setEvents] = useState([
    { title: 'Intervention Client A', date: '2025-07-22' },
    { title: 'Intervention Client B', date: '2025-07-25' },
  ])

  const handleDateClick = (arg) => {
    alert(`Nouvelle intervention le ${arg.dateStr}`)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Nuisibook Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        editable={true}
        selectable={true}
        height="auto"
      />
    </div>
  )
}

export default App
