import { Spin, Select, Tabs } from "antd";
import { Field, FieldProps } from "formik";
import { Fields, Button, AntTextarea } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Product = ({ showCreateModal, setSuccess, system }: any): JSX.Element => {
  const { t, get } = useHooks();
  const { TabPane } = Tabs;
  const { Option } = Select;
  const changePattern = (value: any, setFieldValue: any) => {
    setFieldValue("type", value);
    console.log("Pattern changed to:", value);
  };
  return (
    <div>
      <Container.Form
        url="/products"
        method="post"
        name="products"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "titleUz",
            type: "string",
            required: true,
          },
          {
            name: "titleRu",
            type: "string",
            required: true,
          },
          {
            name: "titleEng",
            type: "string",
            required: true,
          },
          {
            name: "descriptionUz",
            type: "string",
            required: true,
          },
          {
            name: "descriptionRu",
            type: "string",
            required: true,
          },
          {
            name: "descriptionEng",
            type: "string",
            required: true,
          },
          {
            name: "price",
            type: "number",
            required: true,
          },
          {
            name: "typeEng",
            type: "string",
            required: true,
          },
          {
            name: "typeRu",
            type: "string",
            required: true,
          },
          {
            name: "typeUz",
            type: "string",
            required: true,
          },
          {
            name: "image",
            required: true,
          },
          {
            name: "image02",
          },
          {
            name: "image03",
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["products"] });
          setSuccess((prev: any) => !prev);
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
              <Tabs defaultActiveKey="uz" className="w-full">
                <TabPane tab={t("Uzbek")} key="uz">
                  <Field name="typeUz">
                    {({ field, form }: FieldProps) => (
                      <Select
                        rootClassName="mb-[20px] w-full"
                        defaultValue="unripeUz"
                        size={"large"}
                        onChange={(value: any) => {
                          form.setFieldValue(field.name, value);
                          changePattern(value, form.setFieldValue);
                        }}
                      >
                        <Option value={"unripeUz"}>{t("xom")}</Option>
                        <Option value={"halfReadyUz"}>
                          {t("yarim tayyor")}
                        </Option>
                      </Select>
                    )}
                  </Field>
                  <Field
                    rootClassName="mb-[20px]"
                    component={Fields.Input}
                    name="titleUz"
                    type="text"
                    placeholder={t("titleUz")}
                    size="large"
                  />
                  <Field
                    rootClassName=" w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                    component={AntTextarea}
                    name="descriptionUz"
                    type="text"
                    placeholder={t("descriptionUz")}
                    rows={3}
                    size="large"
                  />
                </TabPane>
                <TabPane tab={t("Russian")} key="ru">
                  <Field name="typeRu">
                    {({ field, form }: FieldProps) => (
                      <Select
                        rootClassName="mb-[20px] w-full"
                        defaultValue="unripeRu"
                        size={"large"}
                        onChange={(value: any) => {
                          form.setFieldValue(field.name, value);
                          changePattern(value, form.setFieldValue);
                        }}
                      >
                        <Option value={"unripeRu"}>{t("xom")}</Option>
                        <Option value={"halfReadyRu"}>
                          {t("yarim tayyor")}
                        </Option>
                      </Select>
                    )}
                  </Field>
                  <Field
                    rootClassName="mb-[20px]"
                    component={Fields.Input}
                    name="titleRu"
                    type="text"
                    placeholder={t("titleRu")}
                    size="large"
                  />
                  <Field
                    rootClassName="w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                    component={AntTextarea}
                    name="descriptionRu"
                    type="text"
                    placeholder={t("descriptionRu")}
                    rows={3}
                    size="large"
                  />
                </TabPane>
                <TabPane tab={t("English")} key="en">
                  <Field name="typeEng">
                    {({ field, form }: FieldProps) => (
                      <Select
                        rootClassName="mb-[20px] w-full"
                        defaultValue="unripeEng"
                        size={"large"}
                        onChange={(value: any) => {
                          form.setFieldValue(field.name, value);
                          changePattern(value, form.setFieldValue);
                        }}
                      >
                        <Option value={"unripeEng"}>{t("xom")}</Option>
                        <Option value={"halfReadyEng"}>
                          {t("yarim tayyor")}
                        </Option>
                      </Select>
                    )}
                  </Field>
                  <Field
                    rootClassName="mb-[20px]"
                    component={Fields.Input}
                    name="titleEng"
                    type="text"
                    placeholder={t("titleEn")}
                    size="large"
                  />
                  <Field
                    rootClassName="w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                    component={AntTextarea}
                    name="descriptionEng"
                    type="text"
                    placeholder={t("descriptionEn")}
                    rows={3}
                    size="large"
                  />
                </TabPane>
                <TabPane tab={t("Info")} key="zh">
                  <div className="">
                    <div className="flex">
                      <Field
                        component={Fields.FileUpload}
                        setFieldValue={setFieldValue}
                        rootClassName="mb-[25px]"
                        name="image"
                        accept="image/png, image/jpeg, image/jpg"
                      />
                      <Field
                        component={Fields.FileUpload}
                        setFieldValue={setFieldValue}
                        rootClassName="mb-[25px]"
                        name="image02"
                        accept="image/png, image/jpeg, image/jpg"
                      />
                      <Field
                        component={Fields.FileUpload}
                        setFieldValue={setFieldValue}
                        rootClassName="mb-[25px]"
                        name="image03"
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                    <Field
                      rootClassName="mb-[20px]"
                      component={Fields.Input}
                      name="price"
                      type="number"
                      placeholder={t("price")}
                      size="large"
                    />
                    <div></div>
                  </div>
                  <Button
                    title={t("Saqlash")}
                    className="w-full mt-[20px]"
                    htmlType="submit"
                    size="large"
                  />
                </TabPane>
              </Tabs>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Product;