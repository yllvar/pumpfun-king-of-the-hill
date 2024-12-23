# Pumpfun King of the Hill Display
<img width="1154" alt="Screenshot 2024-12-23 at 16 27 51" src="https://github.com/user-attachments/assets/78d04075-087f-4574-9ed6-bb6dd4cb558c" />

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Component Documentation](#component-documentation)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Styling Guide](#styling-guide)
- [Performance Considerations](#performance-considerations)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## Overview
The Pumpfun King of the Hill Display is a React-based web application that provides real-time visualization of the current "King of the Hill" token and its historical data. This interactive dashboard allows users to track token ownership changes, view detailed statistics, and analyze historical patterns in an intuitive interface.

## Features
- Real-time token status display
- Historical token ownership tracking
- Interactive data visualization
- Responsive design for all device sizes
- Performance-optimized rendering
- Automated data refresh
- Token ownership transition animations

## Technology Stack
- React 18
- TypeScript
- Tailwind CSS
- ShadcN UI Components
- Recharts for data visualization
- React Query for API state management

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/pumpfun-king-of-the-hill.git
cd pumpfun-king-of-the-hill
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your API credentials and configuration.

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Component Documentation

### Home Component
The main container component that manages the application state and layout.

```typescript
interface HomeProps {
  refreshInterval?: number;
  initialData?: TokenData;
}
```

Key responsibilities:
- Global state management
- Data fetching coordination
- Layout composition
- Error boundary implementation

### TokenDisplay Component
Renders the current token holder's information and status.

```typescript
interface TokenDisplayProps {
  token: TokenData;
  onTokenUpdate: (newToken: TokenData) => void;
  isLoading?: boolean;
}
```

Features:
- Real-time token status updates
- Animated transitions
- Responsive layout
- Error state handling

### TokenHistory Component
Displays historical token ownership data and transitions.

```typescript
interface TokenHistoryProps {
  history: TokenHistoryEntry[];
  onHistoryItemClick: (entry: TokenHistoryEntry) => void;
}
```

Capabilities:
- Sortable history entries
- Filterable by date range
- Interactive timeline visualization
- Detailed entry expansion

## State Management
The application uses a combination of local state and React Query for efficient state management:

```typescript
// Example of main state hook
const useTokenState = () => {
  const [currentToken, setCurrentToken] = useState<TokenData | null>(null);
  const [history, setHistory] = useState<TokenHistoryEntry[]>([]);

  const { data, isLoading, error } = useQuery('tokenData', fetchTokenData, {
    refetchInterval: 5000,
    onSuccess: (data) => {
      setCurrentToken(data.current);
      setHistory(data.history);
    },
  });

  return { currentToken, history, isLoading, error };
};
```

## API Integration

### Endpoints
- `GET /api/token/current` - Fetch current token status
- `GET /api/token/history` - Fetch token history
- `POST /api/token/update` - Update token status

### Error Handling
The application implements comprehensive error handling:
- Network errors
- API response validation
- Rate limiting
- Authentication failures

## Styling Guide
The project uses Tailwind CSS with custom configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'pumpfun-primary': '#4A90E2',
        'pumpfun-secondary': '#F5A623',
        'pumpfun-background': '#F8F9FA',
      },
      animation: {
        'token-transition': 'slideIn 0.3s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
```

## Performance Considerations

### Optimization Techniques
1. Memoization of expensive calculations:
```typescript
const memoizedData = useMemo(() => processData(rawData), [rawData]);
```

2. Virtualized lists for long history displays:
```typescript
import { VirtualizedList } from 'react-virtualized';
```

3. Lazy loading of components:
```typescript
const TokenAnalytics = lazy(() => import('./components/TokenAnalytics'));
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

Please ensure your PR adheres to:
- Consistent code style
- Test coverage requirements
- Documentation standards

## Troubleshooting

### Common Issues
1. Token data not updating
   - Check API connection
   - Verify WebSocket connection
   - Confirm refresh interval settings

2. Performance issues
   - Check browser console for warnings
   - Verify network request patterns
   - Monitor memory usage

3. Styling inconsistencies
   - Clear browser cache
   - Rebuild Tailwind styles
   - Check media query breakpoints

### Debug Mode
Enable debug mode by setting:
```javascript
localStorage.setItem('debug', 'pumpfun:*');
```

For additional support, please open an issue on the GitHub repository.
