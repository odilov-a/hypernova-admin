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
              <Field
                component={Fields.Input}
                name="link"
                rootClassName="mb-[20px]"
                label={t("Link")}
                placeholder={t("Linkni kiriting")}
                required
              />
              <Field
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                label={t("Rasmni yuklang") + " (png, jpg, jpeg)"}
                rootClassName="mb-[10px]"
                name="image"
                accept="image/png, image/jpeg, image/jpg"
              />
              <Button
                title={t("Saqlash")}
                className="w-full mt-[10px]"
                htmlType="submit"
                size="large"
              />
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Client;