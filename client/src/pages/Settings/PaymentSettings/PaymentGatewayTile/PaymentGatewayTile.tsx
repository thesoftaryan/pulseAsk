import PaymentGatewayTileStyle from "./PaymentGatewayTile.module.css";

import SuccessIcon from "../../../../assets/icons/general/success.svg?react";


interface PaymentGatewayTileProps{
    Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    connectionStatus: boolean;
}

export const PaymentGatewayTile:React.FC<PaymentGatewayTileProps> = ({Icon, connectionStatus})=>{
    return (
        <div className={PaymentGatewayTileStyle["container"]}>
            <Icon className={PaymentGatewayTileStyle["left-icon"]}/>
            <div className={PaymentGatewayTileStyle["connection-status"]}>{connectionStatus? "Connected":"Not Connected"}</div>
            {
                connectionStatus &&
                <SuccessIcon className={PaymentGatewayTileStyle["right-icon"]}/>
            }   
        </div>
    );
}