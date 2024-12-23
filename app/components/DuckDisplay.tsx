import { useState, useEffect } from 'react'
import Image from 'next/image'
import TokenHistory from './TokenHistory'

interface DuckData {
  mint: string
  name: string
  symbol: string
  description: string
  image_uri: string
  video_uri: string | null
  metadata_uri: string
  twitter: string
  telegram: string
  bonding_curve: string
  associated_bonding_curve: string
  creator: string
  created_timestamp: number
  raydium_pool: string | null
  complete: boolean
  virtual_sol_reserves: number
  virtual_token_reserves: number
  total_supply: number
  website: string
  show_name: boolean
  king_of_the_hill_timestamp: number
  market_cap: number
  reply_count: number
  nsfw: boolean
  market_id: string | null
  inverted: boolean | null
  is_currently_live: boolean
  username: string | null
  profile_image: string | null
  usd_market_cap: number
}

export default function DuckDisplay({ data, history }: { data: DuckData; history: DuckData[] }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 500)
    return () => clearTimeout(timer)
  }, [data])

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full transition-all duration-500 ${animate ? 'scale-105' : 'scale-100'}`}>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <div className="sticky top-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">{data.name}</h1>
            <span className="text-xl font-semibold text-yellow-500 block mb-4">{data.symbol}</span>
            <Image
              src={data.image_uri}
              alt={data.name}
              width={300}
              height={300}
              className="rounded-lg shadow-md w-full h-auto"
            />
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Current King Stats</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium">Market Cap:</span>
                  <span className="text-green-600">{data.market_cap.toFixed(2)} SOL</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">USD Market Cap:</span>
                  <span className="text-green-600">${data.usd_market_cap.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Total Supply:</span>
                  <span>{data.total_supply.toLocaleString()}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Reply Count:</span>
                  <span>{data.reply_count}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Description</h2>
            <p className="text-gray-700">{data.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Token Details</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Mint:</span> {data.mint}</li>
                <li><span className="font-medium">Creator:</span> {data.creator}</li>
                <li><span className="font-medium">Created:</span> {formatDate(data.created_timestamp)}</li>
                <li><span className="font-medium">King of the Hill Since:</span> {formatDate(data.king_of_the_hill_timestamp)}</li>
                <li><span className="font-medium">Complete:</span> {data.complete ? 'Yes' : 'No'}</li>
                <li><span className="font-medium">NSFW:</span> {data.nsfw ? 'Yes' : 'No'}</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Links</h3>
              <ul className="space-y-2">
                <li><a href={data.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Website</a></li>
                <li><a href={data.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter</a></li>
                <li><a href={data.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Telegram</a></li>
                <li><a href={data.metadata_uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Metadata</a></li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Technical Details</h3>
            <ul className="space-y-2">
              <li><span className="font-medium">Bonding Curve:</span> {data.bonding_curve}</li>
              <li><span className="font-medium">Associated Bonding Curve:</span> {data.associated_bonding_curve}</li>
              <li><span className="font-medium">Virtual SOL Reserves:</span> {data.virtual_sol_reserves.toLocaleString()} SOL</li>
              <li><span className="font-medium">Virtual Token Reserves:</span> {data.virtual_token_reserves.toLocaleString()}</li>
              <li><span className="font-medium">Raydium Pool:</span> {data.raydium_pool || 'N/A'}</li>
              <li><span className="font-medium">Market ID:</span> {data.market_id || 'N/A'}</li>
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">Previous Kings of The Hill</h2>
            <TokenHistory history={history.slice(1, 6)} />
          </div>
        </div>
      </div>
    </div>
  )
}

