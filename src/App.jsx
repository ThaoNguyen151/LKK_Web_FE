import { useEffect, useState } from 'react'
import { Home, About, Contact } from '@pages'
import { ROUTES } from '@utils'

function useHashRoute() {
  const getRoute = () => window.location.hash.slice(1) || ROUTES.HOME

  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute())
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

function App() {
  const route = useHashRoute()

  switch (route) {
    case ROUTES.ABOUT:
      return <About />
    case ROUTES.CONTACT:
      return <Contact />
    default:
      return <Home />
  }
}

export default App
