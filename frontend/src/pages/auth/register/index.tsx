import { useContext, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputValidation from "../../../components/input/InputValidation";
import AuthContext from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { handleRegister, errorMsg, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please fill email input"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Please fill password input"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await handleRegister(values);
      if (result) {
        navigate("/");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen">
      <section className="bg-white shadow-md rounded-lg overflow-hidden p-4 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <InputValidation
            id="email"
            name="Email"
            type="email"
            placeholder="Enter your email"
            field={formik.getFieldProps("email")}
            form={formik}
          />
          <InputValidation
            id="password"
            name="Password"
            type="password"
            placeholder="Enter your password"
            field={formik.getFieldProps("password")}
            form={formik}
          />
          {errorMsg && (
            <div className="text-red-500 text-sm my-2">{errorMsg}</div>
          )}
          <button type="submit" className="btn-primary">
            Register
          </button>

          <button className="btn-secondary">
            <Link to="/login">Login</Link>
          </button>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
