import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'

function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  )
}

export default App
