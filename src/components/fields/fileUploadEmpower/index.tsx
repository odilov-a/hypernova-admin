import { PlusOutlined, RollbackOutlined } from "@ant-design/icons";
import { Modal, Spin, Upload, message } from "antd";
import { FieldProps } from "formik";
import { useHooks, usePost } from "hooks";
import { useEffect, useState } from "react";

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

  const {
    form: { setFieldValue, setFieldTouched, touched, errors },
    field: { name, value },
    className,
    successed,
    setSuccess,
    label,
    limit = 1,
    listType,
    onSuccess = () => {},
    hasSuccess = false,
    customDelete = true,
  } = props;
  const [previewOpen, setPreviewOpen] = useState({
    modal: false,
    title: "",
    url: "",
  });

  useEffect(() => {
    if (hasSuccess) {
      onSuccess();
    }
  }, [value]);

  const newData = value;
  // value?.length > 0 &&
  // value.map((item: any) => {
  //   const url = get(item, 'thumbnails.normal.src')

  //   return {
  //     ...item,
  //     uid: get(item, 'id'),
  //     name: get(item, 'title'),
  //     url,
  //   }
  // })
  const [fileList, setFileList] = useState(newData || []);
  useEffect(() => {
    setFileList(newData || []);
  }, [value]);

  const { mutate, isLoading } = usePost();

  const handlePreview = async (file: any) => {
    setPreviewOpen({
      url: file.url || file.preview,
      modal: true,
      title: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  const deleteData = (file: number) => {
    if (customDelete) {
      const filterData = fileList.filter(
        (item: any, key: number) => item.id !== file
      );
      setFileList(filterData);
      setFieldValue(name, filterData?.length > 0 ? filterData : "");
    } else {
      mutate(
        {
          url: `https://empower.uz/hypernova`,
          data: null,
          method: "delete",
        },
        {
          onSuccess: () => {
            const filterData = fileList.filter(
              (item: object) => get(item, "id") !== file
            );
            setFileList(filterData);
            setFieldValue(name, filterData?.length > 0 ? filterData : "");
          },
        }
      );
    }
  };

  const onDrop = (file: any) => {
    let formData = new FormData();
    formData.append(`file`, file);
    mutate(
      {
        url: `https://empower.uz/upload/hypernova`,
        method: "post",
        data: formData,
      },
      {
        onSuccess: (data) => {
          // const newData = Object.values(get(data, 'data')).map((item: any) => {
          //   const url = get(item, 'fileUrl')
          //   return {
          //     ...item,
          //     url,
          //   }
          // })
          const newData = get(data, "data.fileUrl");

          setFieldValue(name, newData);
          message.success({
            type: "success",
            content: "Успешно добавлено",
            duration: 2,
          });
        },
        onError: (error) => {
          message.error({
            type: "error",
            content: "Что-то пошло не так",
            duration: 2,
          });
        },
      }
    );
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        className="ant-label"
        style={{
          marginTop: 8,
        }}
      >
        Загрузить
      </div>
    </div>
  );

  const resetButton = (
    <div className="ant-upload-wrapper css-dev-only-do-not-override-1m62vyb ant-upload-picture-card-wrapper">
      <div className="ant-upload-list ant-upload-list-picture-card">
        <div
          className="ant-upload ant-upload-select"
          onClick={() => setSuccess(false)}
        >
          <RollbackOutlined className="mt-6"/>
          <div
            className="ant-label"
            style={{
              marginTop: 8,
            }}
          >
            Загрузить ещё
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${className} `}>
      {label && <div className="ant-label font-bold">{label}</div>}
      {!successed && (
        <Upload
          // key={fileList.length}
          name={name}
          disabled={isLoading}
          customRequest={(options) => {}}
          className={ touched[name] && errors[name] ? 'ant-upload-select__error' : ''}
          // className={
          //   fileList.length
          //     ? ""
          //     : touched[name] && errors[name]
          //     ? "ant-upload-select__error"
          //     : ""
          // }
          maxCount={1}
          listType={listType ? listType : "picture-card"}
          // fileList={fileList}
          onPreview={handlePreview}
          // @ts-ignore
          data={(file: any) => {
            onDrop(file);
          }}
          onBlur={() => setFieldTouched(name, true)}
          onRemove={(value) => {
            deleteData(get(value, "id", 0));
          }}
        >
          {isLoading ? <Spin /> : fileList.length ? null : uploadButton}
          {/* {isLoading ? <Spin/> : uploadButton} */}
        </Upload>
      )}
      {successed && resetButton}
      {fileList.length ? null : touched[name] && errors[name] && <small className="async-select__error">asd</small>}

      <Modal
        open={previewOpen.modal}
        title={previewOpen.title}
        footer={null}
        onCancel={() => {
          setPreviewOpen({ modal: false, title: "", url: "" });
        }}
      >
        {previewOpen?.url?.includes("mp4") ? (
          <>
            <video width="100%" height="240" controls>
              <source src={previewOpen?.url} type="video/mp4" />
              <source src={previewOpen?.url} type="video/ogg" />
            </video>
          </>
        ) : (
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewOpen.url}
          />
        )}
      </Modal>
    </div>
  );
};
export default App;