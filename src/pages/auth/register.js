import { Helmet } from "react-helmet"
import RegisterForm from "../../components/auth/registerForm";

const RegisterPage = () => {
    return (
      <>
        <Helmet>
          <title>Register || CourseConnect</title>
        </Helmet>

        <RegisterForm />
      </>
    );
};

export default RegisterPage;