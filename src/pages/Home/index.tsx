import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Dolkoroth from '../../components/Dolkoroth';
import HomeComponent from '../../components/HomeComponent';
import VideoComponent from "../../components/VideoComponent";
import Redemptions from "../../components/Redemptions";



type Props = {
  connected: boolean;
  spiceFound: boolean;
  dolkorothFlag: boolean;
  duneFlag: boolean;
  tashkaFlag: boolean;
  redemptionFlag: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setSpiceFound: React.Dispatch<React.SetStateAction<boolean>>;
  setDolkorothFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setDuneFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setTashkaFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setRedemptionFlag: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Home({ connected, spiceFound, dolkorothFlag, duneFlag, tashkaFlag, redemptionFlag, setSpiceFound, setDolkorothFlag, setDuneFlag, setRedemptionFlag, setTashkaFlag }: Props) {

  function pagePicker() {
    if (dolkorothFlag) {
      return (<Dolkoroth />)
    }
    else if (duneFlag) {
      return (<VideoComponent tashkaFlag={tashkaFlag}
        duneFlag={duneFlag} />)
    }
    else if (tashkaFlag) {
      return (<VideoComponent
        duneFlag={duneFlag}
        tashkaFlag={tashkaFlag} />)
    }
    else if (redemptionFlag) {
      return (<Redemptions />)
    }
    else {
      return (<HomeComponent
      setSpiceFound={setSpiceFound}
      setDolkorothFlag={setDolkorothFlag}
      setDuneFlag={setDuneFlag}
      setTashkaFlag={setTashkaFlag}
      setRedemptionFlag={setRedemptionFlag}/>)
    }
  }


  return (
    pagePicker()
  )
}