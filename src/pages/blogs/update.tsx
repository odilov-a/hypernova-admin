import { Fields, AntTextarea } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin, Tabs } from "antd";
import { useHooks } from "hooks";

const Blog = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  const { TabPane } = Tabs;
  return (
    <div>
      <Container.Form
        url={`/blogs/${get(selectedCard, "_id")}`}
        method="put"
        name="blogs"
        configs={{
          headers: { 'Content-Type': 'multipart/form-data' },
        }}
        fields={[
          {
            name: "titleUz",
            type: "string",
            value: get(selectedCard, "titleUz"),
            required: true,
          },
          {
            name: "titleRu",
            type: "string",
            value: get(selectedCard, "titleRu"),
            required: true,
          },
          {
            name: "titleEng",
            type: "string",
            value: get(selectedCard, "titleEng"),
            required: true,
          },
          {
            name: "descriptionUz",
            type: "string",
            value: get(selectedCard, "descriptionUz"),
            required: true,
          },
          {
            name: "descriptionRu",
            type: "string",
            value: get(selectedCard, "descriptionRu"),
            required: true,
          },
          {
            name: "descriptionEng",
            type: "string",
            value: get(selectedCard, "descriptionEng"),
            required: true,
          },
          {
            name: "image",
            required: true,
            value: get(selectedCard, "image[0].small")
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["blogs"] });
          showEditModal(false)
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
                  <Field
                    rootClassName="mb-[30px]"
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
                  <Field
                    rootClassName="mb-[30px]"
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
                  <Field
                    rootClassName="mb-[30px]"
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
                  <div className="flex justify-center">
                    <div className="flex gap-[70px]">
                      <Field
                        component={Fields.FileUpload}
                        setFieldValue={setFieldValue}
                        rootClassName="mb-[30px]"
                        name="image"
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full h-auto py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
                    htmlType="submit"
                  >
                    {t("Saqlash")}
                  </Button>
                </TabPane>
              </Tabs>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Blog;