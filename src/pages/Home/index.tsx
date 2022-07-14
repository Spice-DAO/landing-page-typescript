
import Dolkoroth from '../../components/Dolkoroth';
import HomeComponent from '../../components/HomeComponent';
import VideoComponent from "../../components/VideoComponent";

type Props = {
  walletAndSpice: boolean;
  dolkorothFlag: boolean;
  duneFlag: boolean;
  tashkaFlag: boolean;
  redemptionFlag: boolean;
}


export default function Home({walletAndSpice, dolkorothFlag, duneFlag, tashkaFlag, redemptionFlag}: Props){

  function pagePicker() {
    if (walletAndSpice && dolkorothFlag) {
      return (<Dolkoroth />)
    }
    else if (walletAndSpice && duneFlag) {
      return (<VideoComponent tashkaFlag={tashkaFlag}
        duneFlag={duneFlag} />)
    }
    else if (walletAndSpice && tashkaFlag) {
      return (<VideoComponent 
        duneFlag={duneFlag}
         tashkaFlag={tashkaFlag} />)
    }
    // else if (walletAndSpice && redemptionFlag) {
    //   return (<Redemptions />)
    // }
    else {
      return (<HomeComponent />)
    }
  }


    return (
      pagePicker()
    )
}