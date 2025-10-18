import InputField from "../../components/common/InputField/InputField";
import CheckBox from "../../components/common/checkBox/CheckBox";
import Button from "../../components/common/button/Button";
import Divider from "../../components/common/divider/Divider";

function Login(){
    return <>
        <div className="container">
            <InputField placeholder="Email" type="email"/>
            <InputField placeholder="Password" type="password"/>
            <CheckBox text={"Remember me"}></CheckBox>
            <Button text="Login"></Button>
            <Divider text="Or login with"></Divider>
        </div>
    </>;
}

export default Login;