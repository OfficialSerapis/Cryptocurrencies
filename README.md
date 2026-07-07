# Selenium & Electrum Cryptocurrency System

A dual-token cryptocurrency system featuring Selenium Coin (SLC) and Electrum Coin (ELC) with multi-token payment capabilities.

## Features

- ERC-20 compliant Selenium Coin (SLC) and Electrum Coin (ELC)
- Multi-token payment system
- MetaMask wallet integration
- Real-time balance tracking
- Secure token transfers
- Owner-only minting and burning
- Comprehensive monitoring and logging
- Rate limiting and security measures

## Project Structure

```
crypto-project/
├── backend/              # Express.js backend server
├── frontend/             # React frontend application
├── contracts/            # Smart contracts
├── tests/               # Integration and unit tests
└── utils/               # Utility modules
```

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- MetaMask browser extension
- Infura API key
- Ethereum wallet with testnet funds

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-project
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and update with your configuration:
```bash
cp .env.example .env
```

4. Update `.env` with your Infura key and wallet private key:
```
INFURA_KEY=your_infura_key
WALLET_PRIVATE_KEY=your_private_key
```

## Running the Project

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

4. Connect your MetaMask wallet to interact with the system

## Testing

Run the test suite:
```bash
npm test
```

## Security

- All API endpoints are protected with rate limiting
- CORS is configured for security
- Environment variables are used for sensitive data
- Input validation is implemented
- MetaMask integration ensures secure wallet access
- Owner-only functions for minting and burning

## Monitoring

The system includes:
- Performance monitoring
- Error tracking
- Transaction logging
- Health checks
- Alerting system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Project Structure

```
project/
├── contracts/              # Smart contracts
│   ├── SeleniumCoin.sol   # ERC-20 token contract
│   ├── ElectrumCoin.sol   # ERC-20 token contract
│   └── MultiTokenPayment.sol # Multi-token payment contract
├── scripts/               # Deployment scripts
│   └── deploy.js
├── src/                  # Frontend source code
│   ├── components/       # React components
│   │   ├── Wallet.tsx
│   │   ├── Transfer.tsx
│   │   └── Payment.tsx
│   └── App.tsx
├── backend/              # Backend server
│   └── server.js
├── tests/               # Test files
├── whitepaper/          # Project documentation
│   └── whitepaper.md
└── package.json
```

## Features

### Core Features
- ❌ ERC-20 compliant tokens
- ❌ Adjustable total supply
- ❌ Token minting/burning
- ❌ Secure ownership
- ❌ MetaMask integration
- ❌ Multi-token payments

### Security Features
- ❌ OpenZeppelin ERC-20 implementation
- ❌ Owner-only minting/burning
- ❌ Secure token transfers
- ❌ Input validation
- ❌ Error handling

### Frontend Features
- ❌ Wallet connection
- ❌ Token transfers
- ❌ Balance display
- ❌ Transaction history
- ❌ Multi-token payments

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- MetaMask browser extension
- Ethereum testnet account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/selenium-electrum.git
cd selenium-electrum
```

2. Install dependencies:
```bash
npm install
```

3. Compile contracts:
```bash
npx hardhat compile
```

4. Deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network <network>
```

5. Start the backend server:
```bash
cd backend
npm install
npm start
```

6. Start the frontend:
```bash
cd src
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Infura Project ID
INFURA_KEY=your_infura_key

# Wallet private key
WALLET_PRIVATE_KEY=your_private_key

# Contract addresses (after deployment)
SELENIUM_CONTRACT=0x...
ELECTRUM_CONTRACT=0x...
MULTITOKEN_CONTRACT=0x...

# Backend configuration
PORT=4000
```

## Security

### Smart Contracts
- Uses OpenZeppelin's audited ERC-20 implementation
- Implements Ownable pattern for owner-only functions
- Includes input validation and error handling
- Follows best practices for gas optimization

### Frontend
- MetaMask connection validation
- Token transfer validation
- Input sanitization
- Error handling and user feedback

### Backend
- Rate limiting
- Request validation
- Error handling
- Security headers
- CORS configuration

## Testing

### Smart Contracts
```bash
npx hardhat test
```

### Frontend
```bash
cd src
cross-env NODE_ENV=test npm test
```

### Backend
```bash
cd backend
npm test
```

## Deployment

### Smart Contracts
```bash
npx hardhat run scripts/deploy.js --network <network>
```

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd src
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
