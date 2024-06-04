import { useState } from "react";
import { Input } from "antd";
import { FieldProps } from "formik";

interface IProps extends FieldProps<any, any> {
  placeholder?: string;
  name: string;
  size?: "large" | "small";
  label: string;
  className?: string;
  rootClassName?: string;
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
  } = props;

  const [obtValue, setObtValue] = useState<string>('')

  return (
    <div className={rootClassName + " input"}>
      {label ? <p className='input__label'>{label}</p> : null}
      <Input.Password
        size={size}
        placeholder={placeholder}
        name={name}
        // status={!!touched[name] ? "error" : ""}
        status={!obtValue.length ? "error" : ""}
        value={value}
        onChange={(e) => {
          setFieldValue(name, e.target.value);
          setObtValue(e.target.value)
        }}
        onBlur={(e) => {
          setFieldTouched(name, true);
        }}
        className={className + "py-[10px] px-[15px] border-2 rounded-[12px]"}
      />
      <p>
        {errors[name] && touched[name] ? (
          <span>{errors[name]?.toString() ?? "Error"}</span>
        ) : null}
      </p>
    </div>
  );
};

export default MyInput;
