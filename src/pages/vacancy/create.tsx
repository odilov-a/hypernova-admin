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
        method={data._id ? "put" : "post"}
        name="vacancies"
        fields={[
          {
            name: "title",
            required: true,
            value: get(data, "title"),
          },
          {
            name: "descriptionUz",
            required: true,
            value: get(data, "descriptionUz"),
          },
          {
            name: "descriptionRu",
            required: true,
            value: get(data, "descriptionRu"),
          },
          {
            name: "descriptionEn",
            required: true,
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
              <div className="">
              <Field
                component={Fields.Input}
                name="title"
                rootClassName="mb-[15px]"
                label={t("Sarlavha")}
                placeholder={t("Sarlavha")}
                required
              />
              <Field
                component={Fields.Textarea}
                name="descriptionUz"
                rows={3}
                rootClassName="mb-[15px]"
                label={t("Ma'lumot (Uzbekcha)")}
                placeholder={t("Ma'lumot (Uzbekcha)")}
                required
              />
              <Field
                component={Fields.Textarea}
                name="descriptionRu"
                rows={3}
                rootClassName="mb-[15px]"
                label={t("Ma'lumot (Ruscha)")}
                placeholder={t("Ma'lumot (Ruscha)")}
                required
              />
              <Field
                component={Fields.Textarea}
                name="descriptionEn"
                rows={3}
                rootClassName="mb-[15px]"
                label={t("Ma'lumot (Inglizcha)")}
                placeholder={t("Ma'lumot (Inglizcha)")}
                required
              />
              <Button
                title={t("Saqlash")}
                className="w-full mt-[15px]"
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

export default Vacancy;