import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { useHooks } from "hooks";
import { Button } from "antd";

const User = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  return (
    <div>
      <Container.Form
        url="users/update-user"
        method="put"
        name="users/update-user"
        fields={[
          {
            name: "username",
            type: "string",
            value: get(selectedCard, "username"),
            required: true,
          },
          {
            name: "password",
            type: "string",
            value: get(selectedCard, "password"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["users/update-user"] });
          showEditModal(false)
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <div className="">
                <Field
                  rootClassName="mb-[20px] w-full"
                  component={Fields.Input}
                  name="username"
                  type="text"
                  placeholder={t("username")}
                  size="large"
                />
                <Field
                  rootClassName="mb-[20px] w-full"
                  component={Fields.Input}
                  name="password"
                  type="password"
                  placeholder={t("password")}
                  size="large"
                />
              <Button
                  className="w-full h-auto py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
                  htmlType="submit"
                >
                  {t("Saqlash")}
                </Button>
            </div>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default User;
