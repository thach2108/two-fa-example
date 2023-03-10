import Button from "components/Button";
import Input from "components/Input";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "store";
import TwoFAStore from "store/TwoFAStore";
import { ANIMATION_TIME } from "utils/consts";
import { object, string } from "yup";

const validator = object({
  name: string().required("Required"),
});

function CreateForm() {
  const { twoFAs, add2FA } = useMainStore();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validator,
    onSubmit: (values) => {
      if (!formik.isValid) return;
      add2FA(
        new TwoFAStore(
          twoFAs.length,
          values.name,
          ANIMATION_TIME,
          ANIMATION_TIME
        )
      );
      navigate("/");
    },
  });

  return (
    <div className="py-5 px-2">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between">
          <Input
            name="name"
            placeholder="input name"
            value={formik.values.name}
            error={formik.errors.name}
            onChange={formik.handleChange}
          />
          <Button dataTestid={`submit-btn`} type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
