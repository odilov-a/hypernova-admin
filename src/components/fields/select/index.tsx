import { Select } from "antd";
import { FieldProps } from "formik";
import { FC } from "react";
interface IAntSelect extends FieldProps<any, any> {
  options: any[];
  isClearable?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  label?: string;
  onChange?: Function;
  placeholder?: string;
  errorMessage?: string | any;
  rootClassName?: string;
  className?: string;
}

const AntSelect: FC<IAntSelect> = (props: IAntSelect) => {
  const {
    options,
    isClearable,
    isMulti = false,
    isDisabled,
    label,
    isSearchable,
    field: { name, value },
    placeholder = "Введите",
    errorMessage,
    rootClassName,
    className,
    onChange = () => {},
    form: { setFieldValue, setFieldTouched, errors, touched },
  } = props;

  return (
    <div className={rootClassName}>
      {label && (
        <p className='mb-1 text-base ant-label font-semibold'>{label}</p>
      )}
      <Select
        className={`
          ${className}
          w-full 
          font-medium 
          
          `}
        key={name}
        size='large'
        disabled={isDisabled}
        {...(isMulti ? { mode: "multiple" } : "")}
        status={touched[name] && errors[name] ? "error" : ""}
        value={value}
        allowClear={isClearable}
        showSearch={isSearchable}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        onBlur={() => {
          if (!value) {
            setFieldTouched(name, true);
          }
        }}
        placeholder={placeholder}
        onChange={(value, data) => {
          setFieldValue(name, data);
          onChange(value, data);
        }}
        options={options}
      />
      {touched[name] && errors[name] && (
        <small className='text-xs font-semibold text-red-500'>
          {errorMessage ? errorMessage : errors[name]}
        </small>
      )}
    </div>
  );
};

export default AntSelect;
