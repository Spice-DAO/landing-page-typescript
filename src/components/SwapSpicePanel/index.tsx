import { useState } from "react"
import { useForm, SubmitHandler, FormProvider, } from "react-hook-form";
import { useContractWrite, usePrepareContractWrite, useAccount, useWaitForTransaction } from 'wagmi'
import { formatEther, getAddress, parseEther } from "ethers/lib/utils";
import ERC20 from "../assets/ABI/ERC20ABI.json";
import RedemptionABI from "../assets/ABI/RedemptionABI.json";
import ethIcon from "../assets/images/eth.svg";
import infoCircle from "../assets/images/info-circle.svg";


type FormData = {
    ethCountInput: number;
    spiceCountInput: number;
};


export default function SwapSpicePanel() {

    const { register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit = handleSubmit(data => submitData());

    const redeemerAddress = getAddress("0xecfCD61226C8e0B3Fd4E2Cb42021B260aC985DC2");

    const { address, isConnected } = useAccount();
    const fetchEthPrice = fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd').then((response) => response.json())
        .then((data) => setEthPrice(Number.parseFloat(data.ethereum.usd).toFixed(2)));

    const [ethCount, setEthCount] = useState(0.3);
    const [spiceCount, setSpiceCount] = useState(1000000);
    const spiceToWei = parseEther(String(spiceCount));
    const [msg, setMsg] = useState("Approve");
    const [approved, setApproved] = useState(false);
    const [burned, setBurned] = useState(false);
    const [approvalHash, setApprovalHash] = useState("");
    const [redeemHash, setRedeemHash] = useState("");
    const [ethPrice, setEthPrice] = useState("");





    //Just use the token Address and call it's approve function and pass in the args
    //Standard ERC-20 ABI
    //Args: Spender, Amount

    const approveTxn = usePrepareContractWrite({
        addressOrName: '0xFB4a659be55D0A6BC2DD71FcB3cC643F91bE1A35',
        chainId: 42,
        contractInterface: ERC20,
        functionName: 'approve',
        args: [redeemerAddress, spiceToWei],
        onSettled(data, error) {
            console.log('Settled', { data, error })
            setApproved(true);
            console.log("Approved");
        },
    })


    const burnTxn = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: getAddress('0xecfCD61226C8e0B3Fd4E2Cb42021B260aC985DC2'),
        contractInterface: RedemptionABI,
        functionName: 'burn',
        args: [spiceToWei],
        onSettled(data, error) {
            console.log('Settled', { data, error })
            setBurned(true);
            console.log("Burned!")
          },
      })


      const redeemTxn = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: getAddress('0xecfCD61226C8e0B3Fd4E2Cb42021B260aC985DC2'),
        contractInterface: RedemptionABI,
        functionName: 'redeem',
        onSettled(data, error) {
            console.log('Settled', { data, error })
            
            //setBurned(true);
            //console.log("Burned!")
          },
      })

      

    // const burnTxn = usePrepareContractWrite({
    //     addressOrName: getAddress('0xae2A85329eeAd962F1D879aB0CD0337deb11C008'),
    //     chainId: 42,
    //     contractInterface: RedemptionABI,
    //     functionName: 'burn',
    //     args: [spiceToWei],
    //     onSettled(data, error) {
    //         console.log('Settled', { data, error })
    //     },
    //     //args: [spiceToWei],
    // })


    // const redeemTxn = usePrepareContractWrite({
    //     addressOrName: getAddress('0x2Fe7A4aa02DE955204aCF21FaD4Ad1567Cf1C47C'),
    //     chainId: 42,
    //     contractInterface: RedemptionABI,
    //     functionName: 'redeem',
    //     onSettled(data, error) {
    //         console.log('Settled', { data, error })
    //     },
    //     //args: [spiceToWei],
    // })



    const approve = useContractWrite(approveTxn.config);
    //const redeem = useContractWrite(redeemTxn.config);
    //const burn = useContractWrite(burnTxn.config);

    //   const redeemTxn = useContractWrite({
    //     addressOrName: getAddress('0x6589d99053AD7511431ed7C8506335b353331Ebc'),
    //     chainId: 42,
    //     contractInterface: RedemptionABI,
    //     functionName: 'redeem',
    //     args: [spiceToWei],
    //     onSettled(data, error) {
    //       if(data !== undefined){
    //         console.log(spiceToWei);
    //       //setApprovalHash(data?.hash);
    //     }
    //       if(error !== undefined){
    //         setMsg("ERROR Try again!");
    //       }
    //       console.log(Number(spiceToWei));

    //       console.log('Settled', { data, error });
    //       setMsg("Redeem")

    //     },
    //   })




    //Contract Address and ABI
    //Args: Amount (Just grab from the other txn)

    // const redeemTxn = useContractWrite({import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

    //   const redeemWait = useWaitForTransaction({
    //     hash: redeemHash,
    //   })


    function parseData() {
        var newEthCount;

        if (isNaN(Number(getValues("spiceCountInput"))) ||
            !Number.isInteger(Number(getValues("spiceCountInput"))) ||
            (String(getValues("spiceCountInput"))[getValues.length] === ".")) {
            setValue("spiceCountInput", spiceCount);
        }

        newEthCount = getValues("spiceCountInput") * 0.0000003;
        setValue("ethCountInput", newEthCount);

        if (newEthCount !== undefined) {
            setEthCount(newEthCount);
        }
        setValue("ethCountInput", Number(String(getValues("ethCountInput")).trim()));
        setValue("spiceCountInput", Number(String(getValues("spiceCountInput")).trim()));
        setEthCount(getValues("ethCountInput"));
        setSpiceCount(getValues("spiceCountInput"));
    }

    function submitData() {

        if (!approved) {
            if (String(spiceCount).length > 8) {
                setMsg("Too Much Spice!")
            }
            if (spiceCount == 0) {
                setMsg("Must Redeem More Than 0 Spice")
            }
            else {
                setMsg("Sending Transaction")
                approve.write?.();
            }

        } else if (approved) {
            setMsg("Burn");
            if (String(spiceCount).length > 8) {
                setMsg("Too Much Spice!")
            }
            if (spiceCount == 0) {
                setMsg("Must Burn More Than 0 Spice")
            }
            else {
                setMsg("Sending Transaction")
                burnTxn.write?.();

            }
        } else if (approved && burned) {
            setMsg("Redeem");
            if (String(spiceCount).length > 8) {
                setMsg("Too Much Spice!")
            }
            if (spiceCount == 0) {
                setMsg("Must Redeem More Than 0 Spice")
            }
            else {
                setMsg("Sending Transaction")
                redeemTxn.write?.();

            }
        } else {
            setMsg("ERROR!");
        }

        //write();
    }


    return (
        <form className="SwapSpicePanel" onSubmit={onSubmit} onChange={parseData}>
            <div style={{ fontWeight: "600" }}>Swap</div>


            <div className="InputBlock">
                <input className="SwapInput" defaultValue={spiceCount} {...register("spiceCountInput")} />
                <div className="CurrencyBlob">
                    <img style={{ width: "1.5rem", marginRight: "0.5rem" }} src={ethIcon} />
                    <div>SPICE</div>
                </div>
            </div>
            <div className="InputBlock" style={{ flexDirection: "column", paddingBottom: "0.5rem" }}>
                <div className="InputRow">
                    <input className="SwapInput" disabled defaultValue={ethCount}  {...register("ethCountInput")} />
                    <div className="CurrencyBlob">
                        <img style={{ width: "1.5rem", marginRight: "0.5rem" }} src={ethIcon} />
                        <div>ETH</div>
                    </div>
                </div>

                <div className="TinyCurrency">${Number.parseFloat(String(ethCount * Number(ethPrice))).toFixed(2)}</div>

            </div>
            <div className="InfoBlock">
                <div style={{ fontSize: "smaller", display: "flex", alignItems: "center" }}>
                    <img style={{ width: ".9rem", marginRight: "0.3rem" }} src={infoCircle} />
                    <span style={{ fontWeight: "500", marginRight: "0.3rem" }}>1 ETH = 3333333 SPICE</span>
                    (${ethPrice})
                </div>
            </div>
            {/* <button className="SwapSpiceButton" type="submit">{msg}</button> */}
            <button onClick={() => approve.write?.()}>Approve</button>
            <button onClick={() => burnTxn.write?.()}>Burn</button>
            <button onClick={() => redeemTxn.write?.()}>Redeem</button>
        </form>
    )
}