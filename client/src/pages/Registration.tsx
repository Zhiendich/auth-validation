import React from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useActions } from "../hooks/useActions";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useAppSelector } from "../hooks/useTypedSelector";

const Registration = () => {
  const initialValues = { login: "", password: "", fullName: "" };
  const error = useAppSelector((state) => state.authReducer.registerError);
  const success = useAppSelector((state) => state.authReducer.isSuccess);
  const { registrationUser } = useActions();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          registrationUser(values);
          setSubmitting(false);
        }}
        initialValues={initialValues}
        validate={(values) => {
          const errors = {} as {
            login: string;
            password: string;
            fullName: string;
          };
          if (values.login.trim() === "") {
            errors.login = "Required";
          }
          if (values.fullName.length < 3) {
            errors.fullName = "Имя должно содержать минимум 3 символа";
          }
          if (
            !/^(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{6,}$/i.test(
              values.password
            )
          ) {
            errors.password =
              "Слишком мало символов должно быть больше 6  или отсуствует спец символ";
          }
          return errors;
        }}
      >
        {({ isSubmitting, errors, values, handleChange }) => (
          <Form className="flex flex-col max-w-[300px] w-full">
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
              name="fullName"
              fieldType="text"
              placeholder="Имя"
              value={values.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
            <span className="text-[red]"> {errors.fullName}</span>
            <Input
              name="password"
              fieldType="password"
              placeholder="Пароль"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />
            <span className="text-[red]"> {errors.password}</span>
            {success && (
              <span className="text-[#7FFF00]">
                Пользователь успешно зарегестрирован
              </span>
            )}
            <span className="text-[red]"> {error}</span>
            <h2 className="my-3">
              Перейти на страничку{" "}
              <Link className="text-[blue] " to={"/login"}>
                авторизации
              </Link>
            </h2>
            <Button type="submit" text="Зарегистрироваться" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
