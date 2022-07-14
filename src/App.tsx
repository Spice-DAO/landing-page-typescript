import React from 'react';
import "./styles/styles.css"
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import Home from './pages/Home';


const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})


function App() {
  return (
    <WagmiConfig client={client}>
      <div className='App'>
      <Home />
      </div>
    </WagmiConfig>

  );
}

export default App;
