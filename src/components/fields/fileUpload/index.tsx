import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { GetProp, UploadFile, UploadProps, message } from "antd";
import { FieldProps } from "formik";
import { usePost, useHooks } from "hooks";
import { storage } from "services";

import NoImage from 'assets/images/product-not-found.jpg'

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface Props extends FieldProps<any, any> {
  label?: string;
  className?: string;
  errorMessage?: string | any;
  rootClassName?: string;
  limit: number;
  listType: any;
  successed: boolean;
  setSuccess: any;
  customDelete: boolean;
  onSuccess: () => void;
  hasSuccess: boolean;
}

const App = (props: Props) => {
  const { get } = useHooks();
  const { mutate } = usePost();
  const isDark = useState(storage.get("theme") == "light" ? false : true);
  const uploadRef = useRef<any>(null);

  const {
    form: { setFieldValue, values },
    field: { name, value },
    className,
    successed,
    setSuccess,
    label,
    limit = 1,
    listType,
    onSuccess = () => { },
    hasSuccess = false,
    customDelete = true,
  } = props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(get(values, name) ? [{
    uid: get(values, "_id",),
    name: get(values, "productTitle"),
    status: 'done',
    url: get(values, name,  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'),
  }] : []);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined style={isDark ? { color: "#9EA3B5" } : { color: "#000" }} />
      <div className="mt-[8px] dark:text-[#9EA3B5]">Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        ref={uploadRef}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={(file) => {
          setFieldValue(name, file)
          return false;
        }}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default App;
