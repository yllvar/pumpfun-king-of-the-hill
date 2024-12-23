import React, { useMemo } from 'react'
import Image from 'next/image'

interface TokenData {
  name: string
  symbol: string
  image_uri: string
  market_cap: number
  usd_market_cap: number
  king_of_the_hill_timestamp: number
}

export default function TokenHistory({ history }: { history?: TokenData[] }) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const memoizedTokens = useMemo(() => {
    if (!history || history.length === 0) {
      return null;
    }

    return history.map((token, index) => (
      <div key={`${token.name}-${token.king_of_the_hill_timestamp}-${index}`} className="bg-white rounded-lg shadow p-4 flex flex-col space-y-2">
        <div className="flex items-center space-x-3">
          <Image
            src={token.image_uri}
            alt={token.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="overflow-hidden">
            <h3 className="font-medium text-blue-600 truncate">{token.name}</h3>
            <p className="text-sm text-gray-500">{token.symbol}</p>
          </div>
        </div>
        <div className="text-sm">
          <p><span className="font-medium">Market Cap:</span> {token.market_cap.toFixed(2)} SOL</p>
          <p><span className="font-medium">USD Market Cap:</span> ${token.usd_market_cap.toFixed(2)}</p>
          <p><span className="font-medium">King Since:</span> {formatDate(token.king_of_the_hill_timestamp)}</p>
        </div>
      </div>
    ));
  }, [history]);

  if (!memoizedTokens) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {memoizedTokens}
    </div>
  )
}

