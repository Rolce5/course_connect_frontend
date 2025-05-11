import { Helmet } from "react-helmet"
import LoginForm from "../../components/auth/loginForm"

const LoginPage = () => {
    return (
        <>
        <Helmet>
            <title>Login || CourseConnect</title>
        </Helmet>

        <LoginForm />
        </>
    );
};

export default LoginPage;