import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Client = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `clients/${get(data, "_id")}` : "clients"}
        method={data._id ? "put" : "post"}
        name="clients"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "link",
            required: true,
            value: get(data, "link"),
          },
          {
            name: "image",
            required: true,
            value: get(data, "images[0].small"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["clients"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <div className="mt-5">
                <Field
                  required
                  name="link"
                  label={t("Link")}
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  placeholder={t("Linkni kiriting")}
                />
                <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                  {t("photo")}
                </p>
                <Field
                  name="image"
                  component={Fields.FileUpload}
                  setFieldValue={setFieldValue}
                  accept="image/png, image/jpeg, image/jpg"
                />
                <Button
                  title={t("Saqlash")}
                  className="w-full mt-[10px]"
                  htmlType="submit"
                  size="large"
                />
              </div>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Client;
