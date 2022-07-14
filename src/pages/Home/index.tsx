
import Dolkoroth from '../../components/Dolkoroth';
import HomeComponent from '../../components/HomeComponent';

type Props = {
  walletAndSpice: boolean;
  dolkorothFlag: boolean
}


export default function Home({walletAndSpice, dolkorothFlag}: Props){

  function pagePicker() {
    if (walletAndSpice && dolkorothFlag) {
      return (<Dolkoroth />)
    }
    // else if (props.walletAndSpice && props.duneFlag) {
    //   return (<VideoPage flag={"dune"} vid={DuneBibleVideo} />)
    // }
    // else if (props.walletAndSpice && props.tashkaFlag) {
    //   return (<VideoPage flag={"tashka"} vid={TashkaVid} />)
    // }
    // else if (props.walletAndSpice && props.redemptionFlag) {
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