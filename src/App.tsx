import { useEffect, useState } from 'react'
import './App.css'

function App () {
  // State to hold the current time
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // Function to update the current time
    const updateClock = () => {
      setTime(new Date())
    }

    // Update the clock every second
    const intervalId = setInterval(updateClock, 1000)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  // Determine the background color based on the current hour
  const backgroundColor =
    time.getHours() >= 6 && time.getHours() < 18 ? '#FFA500' : '#0000FF'

  // Apply the background color to the body element
  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor
  }, [backgroundColor])

  // Format the time to a 24-hour HH:MM:SS string
  const formattedTime = time.toLocaleTimeString('en-US', { hour12: false })

  return (
    <div className='clock-container'>
      <h1>{formattedTime}</h1>
    </div>
  )
}

export default App
