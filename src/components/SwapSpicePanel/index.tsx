import { useState } from "react"
import { useForm, SubmitHandler, FormProvider, } from "react-hook-form";
import { useContractWrite, useAccount, useWaitForTransaction } from 'wagmi'
import ERC20 from "../assets/ABI/ERC20ABI.json";
import ethIcon from "../assets/images/eth.svg";


type FormData = {
    ethCountInput: number;
    spiceCountInput: number;
};


export default function SwapSpicePanel() {

    const { register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit = handleSubmit(data => submitData());

    const { address, isConnected } = useAccount();
    const fetchEthPrice = fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd').then((response) => response.json())
    .then((data) => setEthPrice(data.ethereum.usd));

    const [ethCount, setEthCount] = useState(0.3);
    const [spiceCount, setSpiceCount] = useState(1000000);
    const [msg, setMsg] = useState("Approve");
    const [approved, setApproved] = useState(false);
    const [approvalHash, setApprovalHash] = useState("");
    const [redeemHash, setRedeemHash] = useState("");
    const [ethPrice, setEthPrice] = useState(0);


    function getEthPrice(eth: any){
        return(eth);
    }


    //Just use the token Address and call it's approve function and pass in the args
    //Standard ERC-20 ABI
    //Args: Spender, Amount

    // const approveTxn = useContractWrite({
    //     addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    //     contractInterface: ERC20,
    //     functionName: 'approve',
    //     args: [address, spiceCount],
    //     onSettled(data, error) {
    //       if(data !== undefined){
    //       setApprovalHash(data?.hash);
    //     }
    //       if(error !== undefined){
    //         setMsg("ERROR Try again!");
    //       }
    //       console.log('Settled', { data, error })
    //     },
    //   })


    //   const approvalWait = useWaitForTransaction({
    //     hash: approvalHash,
    //   })


    //Contract Address and ABI
    //Args: Amount (Just grab from the other txn)

    // const redeemTxn = useContractWrite({
    //     addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    //     contractInterface: wagmigotchiABI,
    //     functionName: 'redeem',
    //     args:[spiceCount],
    //     onSettled(data, error) {
    //       console.log('Settled', { data, error })
    //     },
    //   })


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
        setMsg("Approve");

        // console.log("GETTING VALUES");
        // console.log(getValues("ethCountInput"));
        // console.log(ethCount);

        // console.log(getValues("spiceCountInput"));
        // console.log(spiceCount);
        if (String(spiceCount).length > 8) {
            setMsg("Too Much Spice!")
        }
        if (spiceCount == 0) {
            setMsg("Must Redeem More Than 0 Spice")
        }
        else {

            setMsg("Sending Transaction")
            console.log("Hit!");
        }



        //write();
    }

    // onChange={parseData} onSubmit={onSubmit}



    return (
        <form className="SwapSpicePanel" onSubmit={onSubmit} onChange={parseData}>
            <div style={{ fontWeight: "600" }}>Swap</div>

            <div className="InputBlock" >
                <input disabled defaultValue={ethCount}  {...register("ethCountInput")} />
                <div className="CurrencyBlob">
                    <img style={{ width: "1.5rem" }} src={ethIcon} />
                    <div>ETH</div>
                </div>

            </div>
            <div className="InputBlock">
                <input style={{ backgroundColor: "transparent" }} defaultValue={spiceCount} disabled={approved} {...register("spiceCountInput")} />
                <div className="CurrencyBlob">
                    <img style={{ width: "1.5rem" }} src={ethIcon} />
                    <div>SPICE</div>
                </div>
            </div>
            <div className="InfoBlock">
                <div>1 ETH = 3333333 SPICE</div>
                <div>{ethPrice}</div>
            </div>
            <button className="SwapSpiceButton" type="submit">{msg}</button>
        </form>
    )
}