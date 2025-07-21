import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr'
import { useState } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Dialog, TextField, Button, IconButton, Slider, Box } from '@mui/material'
import { Close as CloseIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material'
import './App.css'

const renderEventContent = (eventInfo) => {
  return (
    <div className="event-content">
      <div className="event-time">
        {format(new Date(eventInfo.event.start), 'HH:mm', { locale: fr })}
      </div>
      <div className="event-title">{eventInfo.event.title}</div>
    </div>
  )
}

function App() {
  const [events, setEvents] = useState([
    { 
      title: 'Intervention Client A', 
      start: '2025-07-22T09:00:00', 
      end: '2025-07-22T12:00:00',
      color: '#4CAF50',
      backgroundColor: '#E8F5E9'
    },
    { 
      title: 'Intervention Client B', 
      start: '2025-07-25T14:00:00',
      end: '2025-07-25T17:00:00',
      color: '#2196F3',
      backgroundColor: '#E3F2FD'
    },
  ])
  
  const [showEventForm, setShowEventForm] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    duration: 3 // durée par défaut en heures
  })

  const handleDateSelect = (selectInfo) => {
    setSelectedInfo(selectInfo)
    const startDate = new Date(selectInfo.start)
    const endDate = new Date(selectInfo.end)
    
    setNewEvent({
      title: '',
      start: format(startDate, "yyyy-MM-dd'T'HH:mm:ss"),
      end: format(endDate, "yyyy-MM-dd'T'HH:mm:ss"),
      duration: 3
    })
    setShowEventForm(true)
  }

  const handleEventAdd = () => {
    if (newEvent.title.trim() !== '') {
      const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800']
      const colorIndex = events.length % colors.length
      const mainColor = colors[colorIndex]
      const lightColors = ['#E8F5E9', '#E3F2FD', '#F3E5F5', '#FFF3E0']
      
      setEvents([...events, { 
        ...newEvent,
        color: mainColor,
        backgroundColor: lightColors[colorIndex]
      }])
      setShowEventForm(false)
      setNewEvent({
        title: '',
        start: '',
        end: '',
        duration: 3
      })
    }
  }

  const handleEventDrop = (info) => {
    const updatedEvents = events.map(event => {
      if (event.title === info.event.title && 
          event.start === info.oldEvent.startStr) {
        return {
          ...event,
          start: info.event.startStr,
          end: info.event.endStr
        }
      }
      return event
    })
    setEvents(updatedEvents)
  }

  const handleDurationChange = (_, newValue) => {
    const startDate = new Date(newEvent.start)
    const endDate = new Date(startDate)
    endDate.setHours(startDate.getHours() + newValue)
    
    setNewEvent({
      ...newEvent,
      end: format(endDate, "yyyy-MM-dd'T'HH:mm:ss"),
      duration: newValue
    })
  }
  
  const formatEventTime = (date) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: fr })
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
          select={handleDateSelect}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          height="auto"
          eventDrop={handleEventDrop}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          buttonText={{
            today: "Aujourd'hui",
            month: "Mois",
            week: "Semaine",
            day: "Jour"
          }}
          allDayText="Toute la journée"
          eventContent={renderEventContent}
          titleFormat={{
            month: 'long',
            year: 'numeric',
          }}
          dayHeaderFormat={{
            weekday: 'long'
          }}
        />

        <Dialog 
          open={showEventForm} 
          onClose={() => setShowEventForm(false)}
          maxWidth="sm"
          fullWidth
        >
          <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <h2 style={{ margin: 0 }}>Nouvelle intervention</h2>
              <IconButton onClick={() => setShowEventForm(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              label="Titre de l'intervention"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              margin="normal"
            />

            <Box mt={3}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <AccessTimeIcon />
                <span>Horaires</span>
              </Box>
              <Box mb={2}>
                <div>Début : {formatEventTime(newEvent.start)}</div>
                <div>Fin : {formatEventTime(newEvent.end)}</div>
              </Box>
            </Box>

            <Box mt={3}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <AccessTimeIcon />
                <span>Durée (heures)</span>
              </Box>
              <Slider
                value={newEvent.duration}
                onChange={handleDurationChange}
                min={1}
                max={8}
                step={0.5}
                marks
                valueLabelDisplay="auto"
              />
            </Box>

            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                onClick={() => setShowEventForm(false)}
              >
                Annuler
              </Button>
              <Button
                variant="contained"
                onClick={handleEventAdd}
                disabled={!newEvent.title.trim()}
              >
                Ajouter l'intervention
              </Button>
            </Box>
          </Box>
        </Dialog>
      </main>
    </div>
  )
}

export default App
