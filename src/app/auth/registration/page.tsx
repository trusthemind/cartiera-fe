import { RegistrationForm } from "@/src/components/forms/RegistrationForm";
import s from "./style.module.scss";
import { FormTitle } from "@/src/components/forms/FormTitle";

const RegistrationPage = () => {
  return (
    <main>
      <div className={s.registrationForm}>
        <FormTitle text="Registration" />
        <RegistrationForm />
      </div>
    </main>
  );
};

export default RegistrationPage;
