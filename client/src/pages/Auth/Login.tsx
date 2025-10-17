import InputField from "../../components/common/InputField/InputField";
import CheckBox from "../../components/common/checkBox/CheckBox";

function Login(){
    return <>
        <div className="container">
            <InputField placeholder="Email" type="email"/>
            <InputField placeholder="Password" type="password"/>
            <CheckBox></CheckBox>
        </div>
    </>;
}

export default Login;
