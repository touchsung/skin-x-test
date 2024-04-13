import { useContext, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputValidation from "../../../components/input/InputValidation";
import AuthContext from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { handleLogIn, errorMsg, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().required("Please fill email input"),
    password: Yup.string().required("Please fill password input"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await handleLogIn(values);
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
        <h1 className="text-2xl font-bold mb-4">Login</h1>
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
          {errorMsg && <p className="text-red-500 text-sm my-2">{errorMsg}</p>}
          <button type="submit" className="btn-primary">
            Login
          </button>
          <button className="btn-secondary">
            <Link to="/register">Register</Link>
          </button>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
