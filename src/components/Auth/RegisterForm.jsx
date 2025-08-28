import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useToastContext } from "../Toast/ToastProvider";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../redux/auth/authSlice";

const formVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const RegisterForm = ({ switchForm, userType, setUserType }) => {
  const { showToast } = useToastContext();
  const dispatch = useDispatch();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Минимум 2 символа")
      .required("Задължително"),
    lastName: Yup.string().min(2, "Минимум 2 символа").required("Задължително"),
    email: Yup.string().email("Невалиден имейл").required("Задължително"),
    password: Yup.string().min(6, "Минимум 6 символа").required("Задължително"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Паролите не съвпадат")
      .required("Задължително"),
    companyName:
      userType === "company"
        ? Yup.string().min(2, "Минимум 2 символа").required("Задължително")
        : Yup.string().notRequired(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        companyName: values.companyName || undefined,
      };
      await dispatch(registerUser(payload)).unwrap();
      showToast("✅ Регистрацията е успешна!");
      resetForm();
    } catch (err) {
        console.log(err);
        
      const message =
        err || "Възникна грешка при регистрацията.";
      showToast(`❌ ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      key="register"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
              Регистрация
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaUser className="text-gray-400 mr-2" />
                  <Field
                    name="firstName"
                    type="text"
                    placeholder="Име"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaUser className="text-gray-400 mr-2" />
                  <Field
                    name="lastName"
                    type="text"
                    placeholder="Фамилия"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="flex flex-col col-span-2">
                <div className="flex items-center border rounded-lg px-3 py-2 col-span-2">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="Имейл"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="flex flex-col col-span-2">
                <div className="flex items-center border rounded-lg px-3 py-2 col-span-2">
                  <FaLock className="text-gray-400 mr-2" />
                  <Field
                    name="password"
                    type="password"
                    placeholder="Парола"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="flex flex-col col-span-2">
                <div className="flex items-center border rounded-lg px-3 py-2">
                  <FaLock className="text-gray-400 mr-2" />
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Потвърдете паролата"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => setUserType("person")}
                className={`flex-1 py-2 rounded-lg border ${
                  userType === "person"
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Частно лице
              </button>
              <button
                type="button"
                onClick={() => setUserType("company")}
                className={`flex-1 py-2 rounded-lg border ${
                  userType === "company"
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Фирма
              </button>
            </div>

            {userType === "company" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center border rounded-lg px-3 py-2"
              >
                <FaUser className="text-gray-400 mr-2" />
                <Field
                  name="companyName"
                  type="text"
                  placeholder="Име на фирма"
                  className="w-full outline-none bg-transparent"
                />
              </motion.div>
            )}
            {userType === "company" && (
              <ErrorMessage
                name="companyName"
                component="div"
                className="text-sm text-red-500"
              />
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition disabled:opacity-60"
            >
              {isSubmitting ? "Регистрация..." : "Регистрация"}
            </button>

            <p className="text-sm text-gray-600 text-center mt-2">
              Вече имате акаунт?{" "}
              <span
                className="text-cyan-600 cursor-pointer hover:underline"
                onClick={() => switchForm(true)}
              >
                Вход
              </span>
            </p>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default RegisterForm;
