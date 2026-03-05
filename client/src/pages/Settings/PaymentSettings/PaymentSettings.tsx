import Divider from "../../../components/common/Divider/Divider";
import PaymentSettingsStyle from "./PaymentSettings.module.css";

import PaypalIcon from "../../../assets/icons/general/paypal.svg?react";
import StripeIcon from "../../../assets/icons/general/stripe.svg?react";
import { PaymentGatewayTile } from "./PaymentGatewayTile/PaymentGatewayTile";

export const PaymentSettings = ()=>{
    return (
        <div className={PaymentSettingsStyle["container"]}>
            <Divider text="Set your payment details"/>
            <div className={PaymentSettingsStyle["payment-details-container"]}>
                <div className={PaymentSettingsStyle["label"]}></div>
                <div className={PaymentSettingsStyle["payment-gateways"]}>
                    <PaymentGatewayTile Icon={PaypalIcon} connectionStatus={false}/>
                    <PaymentGatewayTile Icon={StripeIcon} connectionStatus={true}/>

                </div>
            </div>
            <div className={PaymentSettingsStyle["disclaimer"]}>
                *  PulseAsk takes 5% commission on every tip you received in order to run it’s platform
            </div>
        </div>
    );
}