import { color, size, spacing, typography} from "../theme/ThemeVariables";
import toast, { type ToastOptions } from "react-hot-toast";

const baseStyle : ToastOptions = {
    style:{
        borderRadius : size.sizeRadiusSm,
        padding : `${spacing.spacingSm} ${spacing.spacingMd}`,
        fontSize : typography.fontSizeMd,
        fontWeight : typography.fontWeightNormal,

        background : color.colorLevel1Bg,
        color : color.colorText,
    }
};

export const showToast = {
    success(message : string){
        toast.success(message, {
            ...baseStyle,
            iconTheme: {
                primary : color.colorSuccess,
                secondary : color.colorSuccessLight,
            }
        });
    },
    error(message : string){
        toast.error(message, {
            ...baseStyle,
            iconTheme: {
                primary : color.colorError,
                secondary : color.colorErrorLight,
            }
        });
    },
    warning(message : string){
        toast.error(message, {
            ...baseStyle,
            iconTheme: {
                primary : color.colorWarning,
                secondary : color.colorWarningLight,
            }
        });
    },
    info(message : string){
        toast.success(message, {
            ...baseStyle,
            iconTheme: {
                primary : color.colorInfo,
                secondary : color.colorInfoLight,
            }
        });
    },
}