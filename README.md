# Airdrop Reference DApp

[![Demo](https://img.shields.io/badge/Demo-View%20Site-blue)](https://tonkeeper.github.io/airdrop-reference-dapp/)

## Description

**Airdrop Reference DApp** is a decentralized application (DApp) that demonstrates the token airdrop process using the service described in the [TonConsole Airdrop Documentation](https://docs.tonconsole.com/tonconsole/jettons/airdrop).

This application allows users to connect their wallets, check the airdrop status, and claim tokens through interaction with the TON blockchain.

## Demo

You can test the application in demo mode by visiting the [demo link](https://tonkeeper.github.io/airdrop-reference-dapp/).

## Getting Started

### Prerequisites

Before you begin, ensure you have the following tools installed on your computer:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tonkeeper/airdrop-reference-dapp.git
   cd airdrop-reference-dapp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root of the project and add the following variables:

```env
VITE_TONAPI_ENDPOINT=https://tonapi.io
VITE_AIRDROP_UUID=your-claim-uuid
```

- `VITE_TONAPI_ENDPOINT`: Base URL for TonAPI. Defaults to `https://tonapi.io` if not specified.
- `VITE_AIRDROP_UUID`: Unique identifier for the airdrop. Obtain this from your airdrop service.

### Running the Application

To start the application in development mode, run:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Building for Production

To build the application for production, execute:

```bash
npm run build
```

The build output will be located in the `dist` directory.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Additional Links

- [TonConsole Airdrop Documentation](https://docs.tonconsole.com/tonconsole/jettons/airdrop)
- [TonAPI Client](https://github.com/tonkeeper/tonapi-client)
- [TonConnect UI React](https://github.com/tonkeeper/tonconnect-ui-react)

---

*This project is a reference implementation for the service described in the [TonConsole Airdrop Documentation](https://docs.tonconsole.com/tonconsole/jettons/airdrop).*
