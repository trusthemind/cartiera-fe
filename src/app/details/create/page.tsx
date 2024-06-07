import { CreateDetailForm } from "@/src/components/forms/CreateDetailForm";
import s from "./style.module.scss";

const CreateDetailPage = () => {
  return (
      <div className={s.createDetailForm}>
        <CreateDetailForm />
      </div>
  );
};
export default CreateDetailPage;
