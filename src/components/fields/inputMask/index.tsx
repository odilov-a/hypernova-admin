import InputMask from "react-input-mask";
import { Input } from "antd";
import { FieldProps } from "formik";
import { useState } from "react";

interface IProps extends FieldProps<any, any> {
  name: string;
  label?: string;
  className?: string;
  mask?: string;
  antdProps?: any;
  placeholder?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputMaskComponent = (props: IProps) => {
  const {
    field: { value, name },
    className,
    mask = "+999 (99) 999-99-99",
    placeholder = "Введите",
    antdProps,
    label = "",
    form: { setFieldValue, setFieldTouched, errors, touched },
    onChange = () => {},
    onBlur = () => {},
    errorMessage = "",
  } = props;
  const [error, setError] = useState(false);

  return (
    <div className={className}>
      {label ? <p className='text-red'>{label}</p> : null}
      <InputMask
        formatChars={{
          "9": "[0-9]",
          A: "[A-Z]",
        }}
        size='large'
        mask={mask}
        placeholder='dafdf'
        status={
          touched[name] && touched[name] && (errors[name] || error)
            ? "error"
            : ""
        }
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.value.replace(/_|_/g, "").length < mask.length) {
            setError(true);
          } else {
            setError(false);
          }
          setFieldTouched(name, true);
          onBlur(e);
        }}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e);
          setFieldValue(name, e.target.value, true);
        }}
      >
        {(inputProps: any) => <Input {...inputProps} />}
      </InputMask>

      {touched[name] && (errors[name] || error) && (
        <p>{errorMessage ? errorMessage : <>{errors[name]}</>}</p>
      )}
    </div>
  );
};

export default InputMaskComponent;
