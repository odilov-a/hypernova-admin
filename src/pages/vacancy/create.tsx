import React, { useState } from "react";
import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Vacancy = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  const [langTab, setLangTab] = useState("Uz");
  const langs = [
    { title: t("O'zbekcha"), value: "Uz" },
    { title: t("Русский"), value: "Ru" },
    { title: t("English"), value: "En" },
  ];
  let data = createModal.data && createModal.data;

  const handleTabClick = (value: string) => {
    setLangTab(value);
  };

  return (
    <div>
      <Container.Form
        url={data._id ? `vacancies/${get(data, "_id")}` : "vacancies"}
        method={data._id ? "put" : "post"}
        name="vacancies"
        fields={[
          {
            required: true,
            type: "string",
            name: "titleUz",
            value: get(data, "titleUz"),
          },
          {
            required: true,
            type: "string",
            name: "titleRu",
            value: get(data, "titleRu"),
          },
          {
            type: "string",
            required: true,
            name: "titleEn",
            value: get(data, "titleEn"),
          },
          {
            type: "string",
            required: true,
            name: "descriptionUz",
            value: get(data, "descriptionUz"),
          },
          {
            type: "string",
            required: true,
            name: "descriptionRu",
            value: get(data, "descriptionRu"),
          },
          {
            type: "string",
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
        {({ isSubmitting }) => (
          <Spin spinning={isSubmitting} tip="Verifying">
            <div className="lang-tabs">
              {langs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  className={
                    langTab === tab.value ? "selected-tab lang-tab" : "lang-tab"
                  }
                  onClick={() => handleTabClick(tab.value)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="mt-3">
              {langTab !== "info" && (
                <div>
                  <Field
                    required
                    name={`title${langTab}`}
                    rootClassName="mb-[10px]"
                    component={Fields.Input}
                    label={t(`title${langTab}`)}
                    placeholder={t(`title${langTab}`)}
                  />
                  <Field
                    required
                    rootClassName="mb-[10px]"
                    component={Fields.Textarea}
                    name={`description${langTab}`}
                    label={t(`description${langTab}`)}
                    placeholder={t(`description${langTab}`)}
                  />
                  {langTab === "En" && (
                    <Button
                      title={t("Saqlash")}
                      className="w-full mt-[15px]"
                      htmlType="submit"
                      size="large"
                    />
                  )}
                </div>
              )}
            </div>
          </Spin>
        )}
      </Container.Form>
    </div>
  );
};

export default Vacancy;