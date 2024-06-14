import React, { useState } from 'react';
import Select from 'react-select';
import { useHooks } from 'hooks';

const AsyncSelect: React.FC = (props: any) => {

  const {
    onChange = () => { },
    isSearchable = true,
    disableOptions = [],
    isClearable = true,
    isDisabled = false,
    placeholder = 'Выберите...',
    optionLabel,
    optionValue,
    rootClassName,
    label,
    options,
    size = 'large',
    errorMessage,
    isMulti,
    field: { name },
    form: { errors, setFieldValue, setFieldTouched, touched, values, },
    className,
  } = props

  const { get } = useHooks()

  return (
    <div className={rootClassName + ' input relative'}>
      {label ? <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px]">{label}</p> : null}
      <Select
        value={options.find((option:any) => option.value === values[name])}
        getOptionLabel={option => option[optionLabel]}
        getOptionValue={option => option[optionValue]}
        key={name}
        options={options}
        placeholder={placeholder}
        className={className}
        onChange={option => {
          setFieldValue(name, option)
        }}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
      />
    </div>
  );
};

export default AsyncSelect;