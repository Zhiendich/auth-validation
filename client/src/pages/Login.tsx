import React from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useActions } from "../hooks/useActions";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useAppSelector } from "../hooks/useTypedSelector";

const Login = () => {
  const initialValues = { login: "admin", password: "@qwerty" };
  const error = useAppSelector((state) => state.authReducer.isError);
  const { loginUser } = useActions();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          loginUser(values);
          setSubmitting(false);
        }}
        initialValues={initialValues}
        validate={(values) => {
          const errors = {} as { login: string; password: string };
          if (values.login.trim() === "") {
            errors.login = "Required";
          }
          if (
            !/^(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{6,}$/i.test(
              values.password
            )
          ) {
            errors.password =
              "Слишком мало символов должно быть больше 6 или отсуствует спец символ";
          }
          return errors;
        }}
      >
        {({ isSubmitting, errors, values, handleChange }) => (
          <Form className="flex flex-col max-w-[300px] w-full text-center">
            <Input
              name="login"
              fieldType="text"
              placeholder="Логин"
              value={values.login}
              onChange={handleChange}
              error={errors.login}
            />
            <span className="text-[red]"> {errors.login}</span>
            <Input
              name="password"
              fieldType="password"
              placeholder="Пароль"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />
            <span className="text-[red]"> {errors.password}</span>
            <h2 className="my-3">
              Нет аккаунта ?{" "}
              <Link className="text-[blue] " to={"/registration"}>
                зарегистрироваться
              </Link>
            </h2>
            {error && <span className="text-[red] mb-3">{error}</span>}
            <Button type="submit" text="Авторизоваться" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
