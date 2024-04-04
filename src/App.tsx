import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date())
    }

    const intervalId = setInterval(updateClock, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const [sunrise, setSunrise] = useState({ hours: 7, minutes: 20 })
  const [sunset, setSunset] = useState({ hours: 18, minutes: 0 })
  const [showMenu, setShowMenu] = useState(false)

  const backgroundColor =
    (time.getHours() > sunrise.hours ||
      (time.getHours() === sunrise.hours &&
        time.getMinutes() >= sunrise.minutes)) &&
    (time.getHours() < sunset.hours ||
      (time.getHours() === sunset.hours && time.getMinutes() < sunset.minutes))
      ? '#EF6C00'
      : '#0000FF'

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor
  }, [backgroundColor])

  const formattedTime = `${time.getHours()}:${time
    .getMinutes()
    .toString()
    .padStart(2, '0')}`

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      setShowMenu(false)
      document.documentElement.requestFullscreen().catch(e => console.log(e))
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }

  return (
    <div
      className='clock-container'
      onClick={() => !showMenu && setShowMenu(!showMenu)}
    >
      {showMenu ? (
        <div className='menu'>
          <h1 className='clock'>{formattedTime}</h1>
          <button onClick={toggleFullscreen}>Toggle Fullscreen</button>
          <button onClick={() => setShowMenu(false)}>Close</button>

          <div className='menu'>
            <label>
              Sunrise:
              <input
                type='time'
                value={`${sunrise.hours
                  .toString()
                  .padStart(2, '0')}:${sunrise.minutes
                  .toString()
                  .padStart(2, '0')}`}
                onChange={e => {
                  const [hours, minutes] = e.target.value.split(':')
                  setSunrise({ hours: Number(hours), minutes: Number(minutes) })
                }}
              />
            </label>
            <label>
              Sunset:
              <input
                type='time'
                value={`${sunset.hours
                  .toString()
                  .padStart(2, '0')}:${sunset.minutes
                  .toString()
                  .padStart(2, '0')}`}
                onChange={e => {
                  const [hours, minutes] = e.target.value.split(':')
                  setSunset({ hours: Number(hours), minutes: Number(minutes) })
                }}
              />
            </label>
          </div>
        </div>
      ) : (
        <h1 className='clock'>{formattedTime}</h1>
      )}
    </div>
  )
}

export default App
