import { FormTitle } from "@/src/components/forms/FormTitle";
import { LoginForm } from "@/src/components/forms/LoginForm";
import s from "./style.module.scss"

const LoginPage = () => {
  return (
    <main>
      <div className={s.loginForm}>
        <FormTitle text="Sign in" />
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
