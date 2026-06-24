import { RoundedButton } from "../../../components/common/RoundedButton/RoundedButton";
import PaymentModalStyle from "./PaymentModal.module.css";
import { usePaymentModalHandler } from "./PaymentModel.handler";

interface PaymentModalProps{
    setOpenPaymentModal : React.Dispatch<React.SetStateAction<boolean>>,
    receiver: string;
}

export const PaymentModal:React.FC<PaymentModalProps> = ({setOpenPaymentModal, receiver})=>{

    const {sending, sendPayment} = usePaymentModalHandler(setOpenPaymentModal);

    return (
        <div className={PaymentModalStyle["container"]}>
            <div className={PaymentModalStyle["heading"]}>
                Tip this user
            </div>
            <div className={PaymentModalStyle["tip-container"]}>
                <RoundedButton disabled={sending} onClick={()=>{sendPayment(50, receiver)}} level2={true} text="50"/>
                <RoundedButton disabled={sending} onClick={()=>{sendPayment(100, receiver)}} level2={true} text="100"/>
                <RoundedButton disabled={sending} onClick={()=>{sendPayment(150, receiver)}} level2={true} text="150"/>
                <RoundedButton disabled={sending} onClick={()=>{sendPayment(200, receiver)}} level2={true} text="200"/>
            </div>
        </div>
    );
}