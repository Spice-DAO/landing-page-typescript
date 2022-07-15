
import { useState, useEffect } from 'react';
import logo from '../../components/assets/images/logo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faDiscord, faMedium } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

type Props = {
  setSpiceFound: React.Dispatch<React.SetStateAction<boolean>>;
  setDolkorothFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setDuneFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setTashkaFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setRedemptionFlag: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function HomeComponent({ setSpiceFound, setDolkorothFlag, setDuneFlag, setRedemptionFlag, setTashkaFlag }: Props) {

  const [spiceError, setSpiceError] = useState(false);

  const [duneReg, setDuneReg] = useState("Dune Bible")
  const [duneMsg, setDuneMsg] = useState(duneReg);

  const [dolkorothReg, setDolkorothReg] = useState("Dolkoroth")
  const [dolkorothMsg, setDolkorothMsg] = useState(dolkorothReg);

  const [tashkaReg, setTashkaReg] = useState("Tashka")
  const [tashkaMsg, setTashkaMsg] = useState(tashkaReg);

  const [redemptionReg, setRedemptionReg] = useState("Redemptions")
  const [redemptionMsg, setRedemptionMsg] = useState(redemptionReg);

  const { address, isConnected } = useAccount()

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  const balance = useBalance({
    addressOrName: address,
    token: '0x9b6dB7597a74602a5A806E33408e7E2DAFa58193',
    onSettled(data, error) {
      if (data?.formatted === "0.0") {
        setSpiceError(true);
      }
      if (data?.formatted !== "0.0") {
        setSpiceError(false);
      }
    },
  })

  function getAltMsg(action: string) {
    if (isConnected && spiceError) {
      return ("No Spice Found!")
    }
    else if (isConnected) {
      return (action)
    }
    else {
      return ("Connect Wallet")
    }
  }

  function handleFlag(flagFunction: any) {
    if (!spiceError) {
      flagFunction(true);
    } else {
      flagFunction(false);
    }
  }



  return (
    <div className='HomeComponent'>
      <img className='HomeComponent__logo' src={logo} alt="Spice DAO logo" />


      <div className='HomeComponent__links'>


        {isConnected ? (
          <a
            onMouseEnter={() => setDuneMsg(getAltMsg("View"))}
            onMouseLeave={() => setDuneMsg(duneReg)}
            onClick={() => handleFlag(setDuneFlag)}
          >{duneMsg}</a>
        ) : (<a
          onMouseEnter={() => setDuneMsg(getAltMsg("View"))}
          onMouseLeave={() => setDuneMsg(duneReg)}
          onClick={() => connect()}
        >{duneMsg}</a>
        )}

        {isConnected ? (
          <a
            onMouseEnter={() => setDolkorothMsg(getAltMsg("Read"))}
            onMouseLeave={() => setDolkorothMsg(dolkorothReg)}
            onClick={() => handleFlag(setDolkorothFlag)}
          >{dolkorothMsg}</a>
        ) : (<a
          onMouseEnter={() => setDolkorothMsg(getAltMsg("Read"))}
          onMouseLeave={() => setDolkorothMsg(dolkorothReg)}
          onClick={() => connect()}
        >{dolkorothMsg}</a>
        )}


        {isConnected ? (
          <a
            onMouseEnter={() => setTashkaMsg(getAltMsg("Watch"))}
            onMouseLeave={() => setTashkaMsg(tashkaReg)}
            onClick={() => handleFlag(setTashkaFlag)}
          >{tashkaMsg}</a>
        ) : (<a
          onMouseEnter={() => setTashkaMsg(getAltMsg("Watch"))}
          onMouseLeave={() => setTashkaMsg(tashkaReg)}
          onClick={() => connect()}
        >{tashkaMsg}</a>
        )}


      </div>

      <div className='HomeComponent__links'>
        <a href="https://forum.spicedao.xyz/">Forum</a>
        <a href="https://snapshot.org/#/dunedao.eth">Governance</a>

        {isConnected ? (
          <a
            onMouseEnter={() => setRedemptionMsg(getAltMsg("Redeem"))}
            onMouseLeave={() => setRedemptionMsg(redemptionReg)}
            onClick={() => handleFlag(setRedemptionFlag)}
          >{redemptionMsg}</a>
        ) : (<a
          onMouseEnter={() => setRedemptionMsg(getAltMsg("Redeem"))}
          onMouseLeave={() => setRedemptionMsg(redemptionReg)}
          onClick={() => connect()}
        >{redemptionMsg}</a>
        )}
      </div>


      <div className="HomeComponent__text">
        <p> <b>Spice DAO </b> is a Web3 production studio publishing sci-fi animation and NFTs from established writers and artists.
        </p>
        <p>The DAO was founded by 800+ pop culture enthusiasts that crowdfunded $12M to win the auction of the Dune Bible at Christie’s Paris in November 2021 for $3M.
        </p>
        <p>We are currently producing an original animated limited series to be distributed by a streaming service and are opening an NFT studio that provides white glove service to high profile creators to develop strategy and concepts; design and build technology products; and advise on marketing campaigns to onboard the next million users to Web3.
        </p>
        <p>The DAO has been featured in The Guardian, The New Yorker, Financial Times, Business Insider, Wired Magazine and more mainstream news outlets. We have a combined following of 10K+ on social media.
        </p>
      </div>
      <div className="HomeComponent__social_icons">
        <a href="https://twitter.com/TheSpiceDao"> {<FontAwesomeIcon icon={faTwitter} />} </a>
        <a href="http://discord.gg/SPICEDAO">{<FontAwesomeIcon icon={faDiscord} />}</a>
        <a href="https://medium.com/@SpiceDao">{<FontAwesomeIcon icon={faMedium} />}</a>
        <a href="mailto:team@spicedao.xyz">{<FontAwesomeIcon icon={faEnvelope} />}</a>
      </div>
    </div>
  )
}