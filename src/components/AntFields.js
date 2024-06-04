import {Form, Input, TimePicker, Select, Radio, TreeSelect, InputNumber} from "antd";

const FormItem = Form.Item;
const {Option} = Select;

const CreateAntField = AntComponent => ({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
  type,
  style,
  onChange,
  placeholder,
  containerClass="",
  onBlurHandler= () => {},
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const touchedError = hasError && touched;
  const onInputChange = ({target: {value}}) => form.setFieldValue(field.name, value);
  const onChangeInner = value => form.setFieldValue(field.name, value);
  const onBlur = (e) => {
    form.setFieldTouched(field.name, true);
    onBlurHandler(e)
  };
  return (
    <div className={`field-container ${containerClass}`}>
      {label && <div className="ant-label mr-6 mb-4">{label}</div>}
      <FormItem
        label={false}
        hasFeedback={(hasFeedback && submitted) || (hasFeedback && touched) ? true : false}
        help={touchedError ? hasError : false}
        validateStatus={touchedError ? "error" : "success"}
        {...{style}}>
        <AntComponent
          {...field}
          {...props}
          {...{type, defaultValue: field.value}}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange ? onChange : type ? onInputChange : onChangeInner}>
          {selectOptions &&
          selectOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.name ? option.name : option.label}
            </Option>
          ))}
        </AntComponent>
      </FormItem>
    </div>
  );
};

export const AntSelect = CreateAntField(Select);
export const AntInput = CreateAntField(Input);
export const AntInputNumber = CreateAntField(InputNumber);
export const AntTextarea = CreateAntField(Input.TextArea);
export const AntRadio = CreateAntField(Radio);
export const AntTreeSelect = CreateAntField(TreeSelect);
export const AntPassword = CreateAntField(Input.Password);
export const AntTimePicker = CreateAntField(TimePicker);