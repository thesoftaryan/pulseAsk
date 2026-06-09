import Divider from "../../../components/common/Divider/Divider";
import PaymentSettingsStyle from "./PaymentSettings.module.css";

// import PaypalIcon from "../../../assets/icons/general/paypal.svg?react";
// import StripeIcon from "../../../assets/icons/general/stripe.svg?react";
// import { PaymentGatewayTile } from "./PaymentGatewayTile/PaymentGatewayTile";
import { PreferenceTile } from "../PreferenceTile/PreferenceTile";
import { useState } from "react";
import { useAppSelector } from "../../../hooks/store.hook";
import { usePaymentSettingsHandler } from "./PaymentSettings.handler";
import type { PaymentPreferencesInterface } from "../../../types/ApiResponse/user.type";

export const PaymentSettings = ()=>{
    const user = useAppSelector(state=>state.auth.user);
    const initObj = {enablePayment:false};
    const [paymentPreferences, setPaymentPreferences] = useState<PaymentPreferencesInterface>(user?.paymentPreferences??initObj);
    
    const [updating, setUpdating] = useState(false);

    const {updatePaymentProfile} = usePaymentSettingsHandler(setPaymentPreferences);

    const handlePaymentSettingsChange = async ()=>{
        // setPaymentActive(!paymentActive)
        setUpdating(true);
        await updatePaymentProfile(!paymentPreferences.enablePayment);
        setUpdating(false);
    }

    return (
        <div className={PaymentSettingsStyle["container"]}>
            <Divider text="Set your payment details"/>
            <div className={PaymentSettingsStyle["preferences"]}>
                <PreferenceTile onClick={updating?undefined:handlePaymentSettingsChange} text="Enable Users to send you payments" active={paymentPreferences.enablePayment}/>
            </div>
            {/* <div className={PaymentSettingsStyle["label"]}>
                Connect to
            </div>
            <div className={PaymentSettingsStyle["payment-gateways"]}>
                <PaymentGatewayTile Icon={PaypalIcon} connectionStatus={false}/>
                <PaymentGatewayTile Icon={StripeIcon} connectionStatus={true}/>
            </div> */}
            <div className={PaymentSettingsStyle["disclaimer"]}>
                *  PulseAsk takes 5% commission on every tip you received in order to run it’s platform
            </div>
        </div>
    );
}