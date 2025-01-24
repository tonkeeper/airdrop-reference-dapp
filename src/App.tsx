import { useCallback, useEffect, useMemo, useState } from 'react';

import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { TonApiClient } from '@ton-api/client';
import { Address } from '@ton/core';

import './App.css';
import { List } from './components/List/List';
import { Loader } from './components/Loader/Loader';
import { showConfetti } from './utils/confetti';
import { JettonInfo } from '@ton-api/client';
import { fromNano } from './utils/decimals';
import { UserClaim } from './types/airdrop';

function useQuery() {
    return useMemo(() => new URLSearchParams(window.location.search), []);
}

function App() {
    const query = useQuery();
    const [isClaimStatusLoading, setClaimStatusLoading] = useState(true);
    const [userClaim, setUserClaim] = useState<UserClaim | null>(null);
    
    const [jettonAddress, setJettonAddress] = useState<string | null>(null);
    const [jettonInfo, setJettonInfo] = useState<JettonInfo | null>(null);
    const [isClaiming, setIsClaiming] = useState(false);

    const [tonConnectUI] = useTonConnectUI();

    const claimId = query.get('claimId') ?? import.meta.env.VITE_CLAIM_UUID;
    const testnet = query.get('testnet') ?? import.meta.env.VITE_TESTNET;

    const ta = useMemo(() => new TonApiClient({
        baseUrl: testnet ? 'https://testnet.tonapi.io' : 'https://tonapi.io',
    }), [testnet]);

    const connectedAddress = useTonAddress();

    useEffect(() => {
        setTimeout(() =>
            tonConnectUI.connectionRestored.then((connected) => {
                if (!connected) { tonConnectUI.openModal() }
            }),
            400
        );
    }, [tonConnectUI]);

    useEffect(() => {
        if (!jettonAddress) { return; }

        ta.jettons
            .getJettonInfo(Address.parse(jettonAddress))
            .then(setJettonInfo);
    }, [jettonAddress, ta]);

    useEffect(() => {
        if (connectedAddress) {
            fetch(
                `https://${testnet ? 'testnet-airdrop' : 'mainnet-airdrop'}.tonapi.io/v1/airdrop/claim/${connectedAddress}?id=${claimId}`
            )
                .then((response) => response.json())
                .then((userClaim: UserClaim) => {
                    setClaimStatusLoading(false);
                    setUserClaim(userClaim);
                    setJettonAddress(userClaim.jetton);
                })
                .catch(() => {
                    setClaimStatusLoading(false);
                    setUserClaim(null);
                    setJettonAddress(null);
                });
        } else {
            setClaimStatusLoading(false);
            setUserClaim(null);
        }
    }, [connectedAddress, claimId, testnet]);

    const handleSendMessage = useCallback(() => {
        if (!userClaim) {
            return;
        }

        tonConnectUI
            .sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 300, // 5 minutes
                messages: [
                    {
                        address: userClaim.claim_message.address,
                        amount: userClaim.claim_message.amount,
                        payload: userClaim.claim_message.payload,
                        stateInit: userClaim.claim_message.state_init,
                    },
                ],
            })
            .then(() => {
                setIsClaiming(true);
                showConfetti();
            });
    }, [tonConnectUI, userClaim]);

    if (!claimId) {
        return (
            <div className="placeholder">
                <div className="body1 secondary">
                    Claim ID is not provided.
                </div>
            </div>
        );
    }

    if (isClaimStatusLoading) {
        return (
            <div className="placeholder">
                <Loader />
            </div>
        );
    }

    if (!connectedAddress) {
        return (
            <div className="placeholder">
                <div className="body1 secondary">
                    Please connect your wallet to claim the token.
                </div>
            </div>
        );
    }

    if (!userClaim?.jetton_amount) {
        return (
            <div className="placeholder">
                <div className="body1 secondary">
                    You have no tokens available for claim.
                </div>
            </div>
        );
    }

    return (
        <div className={'mw60'}>
            <div className={'padding-top'} />
            {jettonInfo && (
                <img
                    alt={jettonInfo.metadata.name}
                    className="jetton-logo"
                    src={jettonInfo.preview}
                />
            )}
            <div className="desc-container mb32">
                <h2>Claim your token</h2>
            </div>
            <List>
                <List.Item title={'Amount'}>
                    {fromNano(
                        userClaim.jetton_amount,
                        jettonInfo?.metadata.decimals ?? 9
                    )}{' '}
                    {jettonInfo?.metadata.symbol}
                </List.Item>
                <List.Item title={'To be paid'}>
                    ~{fromNano(userClaim.claim_message.amount)} TON
                </List.Item>
            </List>
            <div className="end-page">
                <div className="mw60">
                    <button
                        disabled={isClaiming}
                        className="button primary"
                        onClick={handleSendMessage}
                    >
                        <div className="label1">Claim!</div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
