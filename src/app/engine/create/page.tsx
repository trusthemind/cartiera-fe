import { EngineForm } from "@/src/components/forms/EngineForm";
import { FC } from "react";
import s from "./style.module.scss";
import { FormTitle } from "@/src/components/forms/FormTitle";

const EngineCreatePage: FC = () => {
  return (
    <main>
      <div className={s.engineForm}>
        <FormTitle text="New Engine" backStep={"/"} />
        <EngineForm />
      </div>
    </main>
  );
};
export default EngineCreatePage;
