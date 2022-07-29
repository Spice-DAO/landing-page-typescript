import React, { useState } from 'react';
import "./styles/styles.css"
import { WagmiConfig, createClient, configureChains, defaultChains } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import Home from './pages/Home';



const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})


function App() {
  const [connected, setConnected] = useState(false);
  const [spiceFound, setSpiceFound] = useState(false);
  const [dolkorothFlag, setDolkorothFlag] = useState(false);
  const [duneFlag,  setDuneFlag] = useState(false);
  const [tashkaFlag, setTashkaFlag] = useState(false);
  const [redemptionFlag, setRedemptionFlag] = useState(false);


  return (
    <WagmiConfig client={client}>
      <div className='App'>
      <Home 
      connected={connected}
      spiceFound={spiceFound}
      dolkorothFlag={dolkorothFlag}
      duneFlag={duneFlag}
      tashkaFlag={tashkaFlag}
      redemptionFlag={redemptionFlag}
      setConnected={setConnected}
      setSpiceFound={setSpiceFound}
      setDolkorothFlag={setDolkorothFlag}
      setDuneFlag={setDuneFlag}
      setTashkaFlag={setTashkaFlag}
      setRedemptionFlag={setRedemptionFlag} />
      </div>
    </WagmiConfig>

  );
}

export default App;
