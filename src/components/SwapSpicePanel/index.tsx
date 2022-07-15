import { useState } from "react"
import { useForm, SubmitHandler, FormProvider, } from "react-hook-form";

type FormData = {
    ethCountInput: number;
    spiceCountInput: number;
};


export default function SwapSpicePanel() {

    const { register, getValues, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit = handleSubmit(data => submitData());


    const [ethCount, setEthCount] = useState(0.3);
    const [spiceCount, setSpiceCount] = useState(1000000);
    const [msg, setMsg] = useState("Redeem");

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
        setMsg("Redeem");

        // console.log("GETTING VALUES");
        // console.log(getValues("ethCountInput"));
        // console.log(ethCount);

        // console.log(getValues("spiceCountInput"));
        // console.log(spiceCount);
        if (String(spiceCount).length > 8) {
            setMsg("Too Much Spice!")
        } 
        if(spiceCount == 0){
            setMsg("Must Redeem More Than 0 Spice")
        }
        else {
            console.log("Hit!");
        }



        //write();
    }

    // onChange={parseData} onSubmit={onSubmit}



    return (
        <form className="SwapSpicePanel" onSubmit={onSubmit} onChange={parseData}>
            <div>Swap</div>

            <input style={{ marginBottom: "1.5rem" }} disabled defaultValue={ethCount}  {...register("ethCountInput")} />
            <input style={{ marginBottom: "1.5rem" }} defaultValue={spiceCount} {...register("spiceCountInput")} />

            <div>Information Panel</div>
            <button type="submit">{msg}</button>
        </form>
    )
}