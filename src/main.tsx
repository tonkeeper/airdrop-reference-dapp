import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TonConnectUIProvider manifestUrl="https://not-burn.tonkeeper.com/manifest.json">
            <TonConnectButton className="tonconnectButton" />
            <App />
        </TonConnectUIProvider>
    </StrictMode>
);
