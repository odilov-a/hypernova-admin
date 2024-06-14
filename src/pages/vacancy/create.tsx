import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Vacancy = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `vacancies/${get(data, "_id")}` : "vacancies"}
        method={data._id ? "put" : "post"} name="vacancies"
        fields={[
          {
            name: "title",
            required: true,
            value: get(data, "title"),
          },
          {
            required: true,
            name: "descriptionUz",
            value: get(data, "descriptionUz"),
          },
          {
            required: true,
            name: "descriptionRu",
            value: get(data, "descriptionRu"),
          },
          {
            required: true,
            name: "descriptionEn",
            value: get(data, "descriptionEn"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["vacancies"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <div className="mt-3">
              <Field
                required
                name="title"
                label={t("Sarlavha")}
                rootClassName="mb-[10px]"
                component={Fields.Input}
                placeholder={t("Sarlavha")}
              />
              <Field
                required
                rows={3}
                name="descriptionUz"
                rootClassName="mb-[10px]"
                component={Fields.Textarea}
                label={t("Ma'lumot (Uzbekcha)")}
                placeholder={t("Ma'lumot (Uzbekcha)")}
              />
              <Field
                required
                rows={3}
                name="descriptionRu"
                rootClassName="mb-[10px]"
                component={Fields.Textarea}
                label={t("Ma'lumot (Ruscha)")}
                placeholder={t("Ma'lumot (Ruscha)")}
              />
              <Field
                required
                rows={3}
                name="descriptionEn"
                rootClassName="mb-[10px]"
                component={Fields.Textarea}
                label={t("Ma'lumot (Inglizcha)")}
                placeholder={t("Ma'lumot (Inglizcha)")}
              />
              <Button title={t("Saqlash")} className="w-full mt-[15px]" htmlType="submit" size="large"/>
              </div>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Vacancy;