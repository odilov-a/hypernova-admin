import { Spin } from "antd";
import { Field } from "formik";
import { useHooks } from "hooks";
import { Container } from "modules";
import { Fields, Button } from "components";
import { PlusCircleOutlined } from "@ant-design/icons";

const Team = ({ showCreateModal, createModal, showCreatePosition }: any): JSX.Element => {
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
                required
                name="name"
                component={Fields.Input}
                rootClassName="mb-[10px]"
                label={t("Ism va familiyani kiriting")}
                placeholder={t("Ism va familiyani kiriting")}
              />
              <Field
                required
                name="levelUz"
                component={Fields.Input}
                rootClassName="mb-[10px]"
                label={t("Daraja (Uzbekcha)")}
                placeholder={t("Daraja (Uzbekcha)")}
              />
              <Field
                required
                name="levelRu"
                component={Fields.Input}
                rootClassName="mb-[10px]"
                label={t("Daraja (Ruscha)")}
                placeholder={t("Daraja (Ruscha)")}
              />
              <Field
                required
                name="levelEn"
                component={Fields.Input}
                rootClassName="mb-[10px]"
                label={t("Daraja (Inglizcha)")}
                placeholder={t("Daraja (Inglizcha)")}
              />
              </div>
              <div className="w-[48%]">
              <Field
                required
                rows={4}
                name="tools"
                rootClassName="mb-[10px]"
                component={Fields.Textarea}
                label={t("Qo'llanilgan texnologiyalar")}
                placeholder={t("Qo'llanilgan texnologiyalar")}
              />
              <div className="flex justify-between">
                <Field
                  component={Fields.AntAsyncSelect}
                  placeholder={t("position")}
                  optionLabel="name"
                  optionValue="_id"
                  name="position"
                  url="/position"
                  onChange={(option: { [key: string]: any }) => {
                    setFieldValue("position", option);
                  }}
                  params={{ limit: 10 }}
                  rootClassName="w-full"
                  className="w-full mb-[10px]"
                />
                <div
                  className="ml-[20px] flex justify-center items-center w-[40px] h-[40px] cursor-pointer bg-[#3367F6] rounded-[5px]"
                  onClick={() => showCreatePosition(true)}
                >
                  <PlusCircleOutlined style={{ color: "#fff" }} />
                </div>
              </div>
              <label>{("Rasmni yuklang")}</label>
              <Field
                name="image"  
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                accept="image/png, image/jpeg, image/jpg"
              />
              <Button title={t("Saqlash")} className="w-full mt-[12px]" htmlType="submit" size="large" />
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