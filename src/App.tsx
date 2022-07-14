import React, { useState } from 'react';
import "./styles/styles.css"
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import Home from './pages/Home';
import Dolkoroth from './components/Dolkoroth';


const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})


function App() {
  const [walletAndSpice, setWalletAndSpice] = useState(false);
  const [dolkorothFlag, setDolkorothFlag] = useState(false);
  const [duneFlag,  setDuneFlag] = useState(false);
  const [tashkaFlag, setTashkaFlag] = useState(false);
  const [redemptionFlag, setRedemptionFlag] = useState(false);


  return (
    <WagmiConfig client={client}>
      <div className='App'>
      <Home walletAndSpice={walletAndSpice}
      dolkorothFlag={dolkorothFlag} />
      </div>
    </WagmiConfig>

  );
}

export default App;
