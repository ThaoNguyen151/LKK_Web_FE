import { useEffect, useState } from 'react'
import { Home, Awards, News, Library, Activities } from '@pages'
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

  if (route === ROUTES.NEWS || route.startsWith(`${ROUTES.NEWS}/`)) {
    return <News route={route} />
  }

  if (route === ROUTES.LIBRARY) {
    return <Library />
  }

  if (route === ROUTES.AWARDS || route.startsWith(`${ROUTES.AWARDS}/`)) {
    return <Awards route={route} />
  }

  if (
    route === ROUTES.ACTIVITIES ||
    route.startsWith(`${ROUTES.ACTIVITIES}/`)
  ) {
    return <Activities route={route} />
  }

  return <Home />
}

export default App
