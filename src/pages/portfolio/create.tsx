import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Portfolio = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `portfolio/${get(data, "_id")}` : "portfolio"}
        method={data._id ? "put" : "post"}
        name="portfolio"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "projectNameUz",
            required: true,
            value: get(data, "projectNameUz"),
          },
          {
            name: "projectNameRu",
            required: true,
            value: get(data, "projectNameRu"),
          },
          {
            name: "projectNameEn",
            required: true,
            value: get(data, "projectNameEn"),
          },
          {
            name: "clientUz",
            required: true,
            value: get(data, "clientUz"),
          },
          {
            name: "clientRu",
            required: true,
            value: get(data, "clientRu"),
          },
          {
            name: "clientEn",
            required: true,
            value: get(data, "clientEn"),
          },
          {
            name: "image",
            required: true,
            value: get(data, "images[0].small"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["portfolio"] });
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
              <div className="flex justify-between">
                <div className="w-[48%]">
                <Field
                  component={Fields.Input}
                  name="projectNameUz"
                  rootClassName="mb-[20px]"
                  label={t("Loyiha nomi (Uzbekcha)")}
                  placeholder={t("Loyiha nomi (Uzbekcha)")}
                  required
                />
                <Field
                  component={Fields.Input}
                  name="projectNameRu"
                  rootClassName="mb-[20px]"
                  label={t("Loyiha nomi (Ruscha)")}
                  placeholder={t("Loyiha nomi (Ruscha)")}
                  required
                />
                <Field
                  component={Fields.Input}
                  name="projectNameEn"
                  rootClassName="mb-[20px]"
                  label={t("Loyiha nomi (Inglizcha)")}
                  placeholder={t("Loyiha nomi (Inglizcha)")}
                  required
                />
                </div>
                <div className="w-[48%]">
                <Field
                  component={Fields.Input}
                  name="clientUz"
                  rootClassName="mb-[20px]"
                  label={t("Mijoz (Uzbekcha)")}
                  placeholder={t("Mijoz (Uzbekcha)")}
                  required
                />
                <Field
                  component={Fields.Input}
                  name="clientRu"
                  rootClassName="mb-[20px]"
                  label={t("Mijoz (Ruscha)")}
                  placeholder={t("Mijoz (Ruscha)")}
                  required
                />
                <Field
                  component={Fields.Input}
                  name="clientEn"
                  rootClassName="mb-[20px]"
                  label={t("Mijoz (Inglizcha)")}
                  placeholder={t("Mijoz (Inglizcha)")}
                  required
                />
                </div>
              </div>
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
                className="w-full mt-[20px]"
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

export default Portfolio;