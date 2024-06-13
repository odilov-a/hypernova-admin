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
            required: true,
            name: "projectNameUz",
            value: get(data, "projectNameUz"),
          },
          {
            required: true,
            name: "projectNameRu",
            value: get(data, "projectNameRu"),
          },
          {
            required: true,
            name: "projectNameEn",
            value: get(data, "projectNameEn"),
          },
          {
            required: true,
            name: "clientUz",
            value: get(data, "clientUz"),
          },
          {
            required: true,
            name: "clientRu",
            value: get(data, "clientRu"),
          },
          {
            required: true,
            name: "clientEn",
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
              <div className="flex justify-between mt-5">
                <div className="w-[48%]">
                <Field
                  required
                  name="projectNameUz"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("Loyiha nomi (Uzbekcha)")}
                  placeholder={t("Loyiha nomi (Uzbekcha)")}
                />
                <Field
                  required
                  name="projectNameRu"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("Loyiha nomi (Ruscha)")}
                  placeholder={t("Loyiha nomi (Ruscha)")}
                />
                <Field
                  required
                  name="projectNameEn"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("Loyiha nomi (Inglizcha)")}
                  placeholder={t("Loyiha nomi (Inglizcha)")}
                />
                </div>
                <div className="w-[48%]">
                <Field
                  required
                  name="clientUz"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("Mijoz (Uzbekcha)")}
                  placeholder={t("Mijoz (Uzbekcha)")}
                />
                <Field
                  required
                  name="clientRu"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("Mijoz (Ruscha)")}
                  placeholder={t("Mijoz (Ruscha)")}
                />
                <Field
                  required
                  name="clientEn"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("Mijoz (Inglizcha)")}
                  placeholder={t("Mijoz (Inglizcha)")}
                />
                </div>
              </div>
              <label>{("Rasmni yuklang")}</label>
              <Field
                name="image"
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                accept="image/png, image/jpeg, image/jpg"
              />
              <Button title={t("Saqlash")} className="w-full mt-[10px]" htmlType="submit" size="large"/>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Portfolio;