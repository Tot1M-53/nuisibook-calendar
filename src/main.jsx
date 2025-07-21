import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Importation des styles FullCalendar
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/react'

import './index.css'
import App from './App.jsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
})

console.log('[main] Démarrage de l\'application')

try {
  const rootElement = document.getElementById('root')
  console.log('[main] Élément root trouvé:', rootElement)
  
  const root = createRoot(rootElement)
  console.log('[main] Root React créé')

  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  )
  console.log('[main] Rendu initial terminé')
} catch (error) {
  console.error('[main] Erreur lors du montage de l\'application:', error)
}
