import React, { useState } from 'react';
import "./styles/styles.css"
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import Home from './pages/Home';


const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})


function App() {
  const [walletAndSpice, setWalletAndSpice] = useState(true);
  const [dolkorothFlag, setDolkorothFlag] = useState(false);
  const [duneFlag,  setDuneFlag] = useState(true);
  const [tashkaFlag, setTashkaFlag] = useState(false);
  const [redemptionFlag, setRedemptionFlag] = useState(false);


  return (
    <WagmiConfig client={client}>
      <div className='App'>
      <Home walletAndSpice={walletAndSpice}
      dolkorothFlag={dolkorothFlag}
      duneFlag={duneFlag}
      tashkaFlag={tashkaFlag}
      redemptionFlag={redemptionFlag} />
      </div>
    </WagmiConfig>

  );
}

export default App;
