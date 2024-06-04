import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Team = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `team/${get(data, "_id")}` : "team"}
        method={data._id ? "put" : "post"}
        name="team"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "name",
            required: true,
            value: get(data, "name"),
          },
          {
            name: "position",
            required: true,
            value: get(data, "position"),
          },
          {
            name: "levelUz",
            required: true,
            value: get(data, "levelUz"),
          },
          {
            name: "levelRu",
            required: true,
            value: get(data, "levelRu"),
          },
          {
            name: "levelEn",
            required: true,
            value: get(data, "levelEn"),
          },
          {
            name: "tools",
            required: true,
            value: get(data, "tools"),
          },
          {
            name: "image",
            required: true,
            value: get(data, "images[0].small"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["team"] });
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
                name="name"
                rootClassName="mb-[20px]"
                label={t("Ism va familiyani kiriting")}
                placeholder={t("Ism va familiyani kiriting")}
                required
              />
              <Field
                component={Fields.Input}
                name="levelUz"
                rootClassName="mb-[20px]"
                label={t("Daraja (Uzbekcha)")}
                placeholder={t("Daraja (Uzbekcha)")}
                required
              />
              <Field
                component={Fields.Input}
                name="levelRu"
                rootClassName="mb-[20px]"
                label={t("Daraja (Ruscha)")}
                placeholder={t("Daraja (Ruscha)")}
                required
              />
              <Field
                component={Fields.Input}
                name="levelEn"
                rootClassName="mb-[20px]"
                label={t("Daraja (Inglizcha)")}
                placeholder={t("Daraja (Inglizcha)")}
                required
              />
              </div>
              <div className="w-[48%]">
              <Field
                component={Fields.Textarea}
                name="tools"
                rows={3}
                rootClassName="mb-[20px]"
                label={t("Qo'llanilgan texnologiyalar")}
                placeholder={t("Qo'llanilgan texnologiyalar")}
                required
              />
              <Field
                component={Fields.AntAsyncSelect}
                name="position"
                rootClassName="mb-[20px]"
                label={t("Lavozimni kiriting")}
                placeholder={t("Lavozimni kiriting")}
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
                className="w-full mt-[20px]"
                htmlType="submit"
                size="large"
              />
              </div>
              </div>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Team;