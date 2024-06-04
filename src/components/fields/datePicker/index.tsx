import { DatePicker } from "antd";
import { FieldProps } from "formik";
import dayjs, { Dayjs } from "dayjs";

interface IProps extends FieldProps {
  rootClassName?: string;
  format?: string;
  size?: "large" | "middle" | "small";
  placeholder: string;
  onChange?: (arg0: Dayjs | null, arg2?: number) => void;
  disabled?: boolean;
}

const index = (props: IProps) => {
  const {
    field: { name, value },
    form: { setFieldValue, setFieldTouched, errors, touched },
    rootClassName = "",
    format = "YYYY-MM-DD",
    size = "large",
    placeholder,
    onChange = () => {},
    disabled = false,
  } = props;

  return (
    <div className={rootClassName}>
      <DatePicker
        format={format}
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={(date: dayjs.Dayjs | null, dateString) => {
          setFieldValue(name, date);
          onChange(date, dayjs(date).unix());
        }}
        onBlur={() => {
          setFieldTouched(name, true);
        }}
        disabled={disabled}
      />
    </div>
  );
};

export default index;
