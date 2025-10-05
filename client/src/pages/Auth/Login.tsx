import InputField from "../../components/common/InputField/InputField";

function Login(){
    return <>
        <InputField placeholder="Email" type="email"/>
        <InputField placeholder="Password" type="password"/>
    </>;
}

export default Login;
