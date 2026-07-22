import { useEffect, useState } from 'react'
import { Home, About, Contact, Awards } from '@pages'
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

  if (route === ROUTES.ABOUT) {
    return <About />
  }

  if (route === ROUTES.CONTACT) {
    return <Contact />
  }

  if (route === ROUTES.AWARDS || route.startsWith(`${ROUTES.AWARDS}/`)) {
    return <Awards route={route} />
  }

  return <Home />
}

export default App
