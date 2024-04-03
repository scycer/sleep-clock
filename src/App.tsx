import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [time, setTime] = useState(new Date())
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date())
    }

    const intervalId = setInterval(updateClock, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const [sunrise, setSunrise] = useState(6)
  const [sunset, setSunset] = useState(18)

  const backgroundColor =
    time.getHours() >= sunrise && time.getHours() < sunset
      ? '#FFA500'
      : '#0000FF'

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor
  }, [backgroundColor])

  const formattedTime = `${time.getHours()}:${time.getMinutes()}`

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.log(e))
      setIsFullscreen(true)
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className='clock-container' onClick={toggleFullscreen}>
      <h1 className='clock'>{formattedTime}</h1>
    </div>
  )
}

export default App
