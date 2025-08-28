import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaFacebook, FaGoogle, FaLock } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { useToastContext } from "../Toast/ToastProvider";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../redux/auth/authSlice";

const formVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const LoginForm = ({ switchForm }) => {
  const { showToast } = useToastContext();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Невалиден имейл")
      .required("Имейла е задължителен"),
    password: Yup.string()
      .min(6, "Минимум 6 символа")
      .required("Паролата е задължителена"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
      };
      await dispatch(loginUser(payload)).unwrap();
      showToast("✅ Успешен вход!");
      resetForm();
    } catch (err) {
      const message = err || "Грешка при вход.";
      showToast(`❌ ${message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      key="login"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full "
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting, errors, submitCount }) => (
          <Form className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
              Вход
            </h2>

            <div className="flex flex-col">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <Field
                  name="email"
                  type="email"
                  placeholder="Имейл"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-400 mr-2" />
                <Field
                  name="password"
                  type="password"
                  placeholder="Парола"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition disabled:opacity-60"
            >
              {isSubmitting ? "Влизане..." : "Вход"}
            </button>

            {submitCount > 0 && Object.keys(errors).length > 0 && (
              <div className=" space-y-2 bg-red-50 border border-red-200 rounded p-3">
                {Object.entries(errors).map(([key, msg]) => (
                  <div
                    key={key}
                    className="flex items-center gap-1 text-sm text-red-700"
                  >
                    <MdOutlineError className="mt-0.5" />
                    <span>{msg}</span>
                  </div>
                ))}
              </div>
            )}
            <div className=" mt-2 flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between">
              <p className="text-sm text-gray-600 text-center">
                Забравена парола?{" "}
                <span className="text-cyan-600 cursor-pointer hover:underline">
                  Промени
                </span>
              </p>
              <p className="text-sm text-gray-600 text-center">
                Нямате акаунт?{" "}
                <span
                  className="text-cyan-600 cursor-pointer hover:underline"
                  onClick={() => switchForm(false)}
                >
                  Регистрация
                </span>
              </p>
            </div>

            <h2 className="text-center text-gray-600">ИЛИ</h2>
            <div className="flex flex-col sm:flex-row gap-2 mt-1">
              <button className="w-full rounded-lg flex items-center gap-2 bg-[#EA4335] p-2 justify-center text-white hover:bg-red-600 duration-500 transition">
                <FaGoogle />
                Влез с Google
              </button>
              <button className="w-full rounded-lg flex items-center gap-2 bg-[#1877F2] p-2 justify-center text-white hover:bg-blue-600 duration-500 transition">
                <FaFacebook />
                Влез с Facebook
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default LoginForm;
