import Divider from "../../../components/common/Divider/Divider";
import PaymentSettingsStyle from "./PaymentSettings.module.css";

import PaypalIcon from "../../../assets/icons/general/paypal.svg?react";
import StripeIcon from "../../../assets/icons/general/stripe.svg?react";
import { PaymentGatewayTile } from "./PaymentGatewayTile/PaymentGatewayTile";
import { PreferenceTile } from "../PreferenceTile/PreferenceTile";
import { useState } from "react";

export const PaymentSettings = ()=>{
    const [paymentActive, setPaymentActive] = useState(false);
    return (
        <div className={PaymentSettingsStyle["container"]}>
            <Divider text="Set your payment details"/>
            <div className={PaymentSettingsStyle["preferences"]}>
                <PreferenceTile text="Enable Users to send you payments" active={paymentActive} setActive={setPaymentActive}/>
            </div>
            <div className={PaymentSettingsStyle["label"]}>
                Connect to
            </div>
            <div className={PaymentSettingsStyle["payment-gateways"]}>
                <PaymentGatewayTile Icon={PaypalIcon} connectionStatus={false}/>
                <PaymentGatewayTile Icon={StripeIcon} connectionStatus={true}/>
            </div>
            <div className={PaymentSettingsStyle["disclaimer"]}>
                *  PulseAsk takes 5% commission on every tip you received in order to run it’s platform
            </div>
        </div>
    );
}