import { ChangeEvent, useState } from "react";
import { FieldProps } from "formik";
import { User } from 'assets/images/icons'
import TextArea from "antd/es/input/TextArea";

interface IProps extends FieldProps<any, any> {
  placeholder?: string;
  name: string;
  size?: "large" | "small";
  label: string;
  className?: string;
  rootClassName?: string;
  isLoginPage?: boolean;
  rows?: number;
  type?: "file" | "password" | "text";
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MyInput = (props: IProps) => {
  const {
    field: { value, name },
    placeholder = "Basic Input",
    label,
    form: { setFieldValue, setFieldTouched, touched, errors },
    size = "large",
    className = "",
    rootClassName = "",
    isLoginPage = false,
    type = "text",
    rows=5,
    onChange = () => {},
  } = props;

  const [obtValue, setObtValue] = useState<string>('')
  return (
    <div className={rootClassName + " input relative"}>
      {label ? <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px]">{label}</p> : null}
      <TextArea
        size={size}
        placeholder={placeholder}
        name={name}
        rows={rows}
        status={!obtValue.length && !!touched[name] ? "error" : ""}
        value={value}
        onChange={(e: any) => {
          setFieldValue(name, e.target.value);
          onChange(e);
          setObtValue(e.target.value)
        }}
        onBlur={(e) => {
          setFieldTouched(name, !!e.target.value);
        }}
        className={className}
      />
      <p>
        {errors[name] && touched[name] ? (
          <span>{errors[name]?.toString() ?? "Error"}</span>
        ) : null}
      </p>
      {isLoginPage && (
        <div className="absolute right-[16px] top-[15px]">
          <User/>
        </div>
      )}
    </div>
  );
};

export default MyInput;
