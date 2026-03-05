import { useEffect, useState } from 'react'

function App() {
  const [msg, setMsg] = useState('Checking Backend...')

  useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then(res => res.json())
      .then(data => setMsg(data.content))
      .catch(() => setMsg('Backend Offline - Run "node index.js"'))
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#efb810' }}>T.I.P. OJT PROJECT</h1>
      <div style={{ border: '2px solid black', padding: '20px', display: 'inline-block' }}>
        <h2>{msg}</h2>
      </div>
    </div>
  )
}
export default App