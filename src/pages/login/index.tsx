import { Container } from "modules";
import { Fields, Button } from "components";
import { FastField } from "formik";
import { useHooks } from "hooks";
import useStore from "store";

const Login = () => {
  const { get, t } = useHooks();
  const { signIn } = useStore((state) => state);
  return (
    <section className="h-[100vh] px-[6%] py-[12%] login-wrapper">
      <Container.Form
        className="xl:max-w-[650px] lg:max-w-[450px] md:max-w-[400px] md:flex md:justify-center"
        url="users/login"
        method="post"
        fields={[
          {
            name: "username",
            type: "string",
            required: true,
          },
          {
            name: "password",
            type: "string",
          },
        ]}
        onSuccess={(response) => {
          signIn({
            token: get(response, "data.token"),
            data: {
              username: get(response, "data.username"),
              role: "admin",
            },
          });
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isLoading, setFieldTouched }) => {
          return (
            <div>
              <div>
                <h1 className="text-center text-[#000000DE] text-[32px] font-[600] mb-[8px]">
                  {("Welcome to")}{" "}
                  <span className="text-[#3367F6]">{t("Admin Dashboard")}</span>
                </h1>
                <p className="text-center text-[20px] text-[#9EA3B5] mb-[48px]">
                  {("Please enter your admin credentials to log in.")}
                </p>
                <div></div>
                <FastField
                  component={Fields.Input}
                  placeholder={t("Username")}
                  name="username"
                  setFieldTouched={setFieldTouched}
                  rootClassName="mb-7"
                  isLoginPage={true}
                />
                <FastField
                  name="password"
                  component={Fields.Password}
                  errorMessage="Password"
                  placeholder={t("Password")}
                  type="password"
                  rootClassName="mb-7"
                />
                <Button
                  title={isLoading ? "Please wait a second" : "Log in"}
                  isLoading={isLoading}
                  size="large"
                  htmlType="submit"
                  className="w-full h-auto"
                />
              </div>
            </div>
          );
        }}
      </Container.Form>
    </section>
  );
};

export default Login;