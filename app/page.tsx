'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import DuckDisplay from './components/DuckDisplay'

export default function Home() {
  const [duckData, setDuckData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [tokenHistory, setTokenHistory] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('https://pump-fun-king-of-the-hill.p.rapidapi.com/coins/king-of-the-hill', {
        headers: {
          'x-rapidapi-key': 'b03f8cf0f6msh88ec4fa4922b998p16feefjsnc0c2de7849bf',
          'x-rapidapi-host': 'pump-fun-king-of-the-hill.p.rapidapi.com'
        },
        params: {
          includeNsfw: 'true'
        }
      })
      setDuckData(response.data)
      setTokenHistory(prevHistory => {
        const newHistory = [response.data, ...prevHistory]
        return newHistory.slice(0, 10) // Keep only the last 10 tokens
      })
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      {isLoading ? (
        <div className="text-2xl font-bold text-blue-500">Loading...</div>
      ) : (
        duckData && <DuckDisplay data={duckData} history={tokenHistory} />
      )}
    </div>
  )
}

