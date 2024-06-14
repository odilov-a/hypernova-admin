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
        method={data._id ? "put" : "post"} name="portfolio"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            type: "string",
            required: true,
            name: "projectNameUz",
            value: get(data, "projectNameUz"),
          },
          {
            type: "string",
            required: true,
            name: "projectNameRu",
            value: get(data, "projectNameRu"),
          },
          {
            type: "string",
            required: true,
            name: "projectNameEn",
            value: get(data, "projectNameEn"),
          },
          {
            type: "string",
            required: true,
            name: "clientUz",
            value: get(data, "clientUz"),
          },
          {
            type: "string",
            required: true,
            name: "clientRu",
            value: get(data, "clientRu"),
          },
          {
            type: "string",
            required: true,
            name: "clientEn",
            value: get(data, "clientEn"),
          },
          {
            name: "image",
            required: true,
            value: get(data, "images[0].small"),
          },
          {
            name: "type",
            value: get(data, "type"),
            onSubmitValue: val => val.value,
            type: get(data, "_id") ? "number" : "object",
          },
          {
            type: "string",
            name: "playMarket",
            value: get(data, "playMarket"),
          },
          {
            type: "string",
            name: "appStore",
            value: get(data, "appStore"),
          },
          {
            type: "string",
            name: "webSite",
            value: get(data, "webSite"),
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
        {({ isSubmitting, setFieldValue, errors, values }) => {
          console.log({errors}, {values});
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <div className="flex justify-between mt-5">
                <div className="w-[45%]">
                <Field
                  required
                  name="projectNameUz"
                  component={Fields.Input}
                  rootClassName="mb-[10px] w-[92%]"
                  label={t("Loyiha nomi (Uzbekcha)")}
                  placeholder={t("Loyiha nomi (Uzbekcha)")}
                />
                <Field
                  required
                  name="projectNameRu"
                  component={Fields.Input}
                  rootClassName="mb-[10px] w-[92%]"
                  label={t("Loyiha nomi (Ruscha)")}
                  placeholder={t("Loyiha nomi (Ruscha)")}
                />
                <Field
                  required
                  name="projectNameEn"
                  component={Fields.Input}
                  rootClassName="mb-[10px] w-[92%]"
                  label={t("Loyiha nomi (Inglizcha)")}
                  placeholder={t("Loyiha nomi (Inglizcha)")}
                />
                <label>{("Rasmni yuklang")}</label>
                <Field
                  name="image"
                  component={Fields.FileUpload}
                  setFieldValue={setFieldValue}
                  accept="image/png, image/jpeg, image/jpg"
                />
                </div>
                <div className="w-[45%]">
                  <Field
                    name="playMarket"
                    component={Fields.Input}
                    label={t("Play Market")}
                    placeholder={t("Play Market")}
                    rootClassName="mb-[10px] w-[92%]"
                  />
                  <Field
                    name="appStore"
                    label={t("App Store")}
                    component={Fields.Input}
                    placeholder={t("App Store")}
                    rootClassName="mb-[10px] w-[92%]"
                  />
                  <Field
                    name="webSite"
                    label={t("Web sayt")}
                    component={Fields.Input}
                    placeholder={t("Web sayt")}
                    rootClassName="mb-[10px] w-[92%]"
                  />
                <Field
                    component={Fields.Select}
                    placeholder={t("type")}
                    optionLabel="label"
                    optionValue="value"
                    label={"type"}
                    isSearchable
                    name="type"
                    options={[
                      { value: "1", label: t("Mobil ilova") },
                      { value: "2", label: t("Website") },
                      { value: "3", label: t("ERP System") },
                    ]}
                    onChange={(option: { [key: string]: any }) => {
                      setFieldValue("type", option.value);
                    }}
                    rootClassName="mb-[15px]"
                  />
                </div>
                <div className="w-[45%]">
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
              <Button title={t("Saqlash")} className="w-full mt-[10px]" htmlType="submit" size="large"/>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Portfolio;