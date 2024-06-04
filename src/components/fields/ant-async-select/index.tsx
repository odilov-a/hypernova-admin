import { FC, useEffect, useState } from 'react'
import { Select } from 'antd'
import { FieldProps } from 'formik'
import { useInView } from 'react-intersection-observer'
import cx from 'classnames'

import { useHooks } from 'hooks'
import useGetInfiniteScroll from 'hooks/useScrollGet'
import { TParams } from 'services/types'
import { storage } from 'services'

interface IAntSelect extends FieldProps<any, any> {
  label?: string
  placeholder?: string
  errorMessage?: string | any
  rootClassName?: string
  url: string
  params: TParams
  optionLabel?: any
  disableOptions?: any
  optionValue?: any
  filterParams: any
  dataKey: any
  onChange?: (value: any) => any
  extraOptions: any
  isSearchable?: boolean
  isClearable?: boolean
  isDisabled?: boolean
  isMulti?: boolean
  size?: 'small' | 'middle' | 'large'
  message?: string
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  className?: string
}

const AntSelect: FC<IAntSelect> = (props: IAntSelect) => {
  const {
    url,
    params,
    filterParams,
    dataKey = 'data',
    onChange = () => { },
    extraOptions = [],
    isSearchable = true,
    disableOptions = [],
    isClearable = true,
    isDisabled = false,
    placeholder = 'Выберите...',
    optionLabel,
    optionValue,
    rootClassName,
    label,
    size = 'large',
    errorMessage,
    isMulti,
    placement = 'bottomLeft',
    field: { name },
    form: { errors, setFieldValue, setFieldTouched, touched, values },
    className,
  } = props
  const { get, t, isArray, queryClient } = useHooks()
  const { data, hasNextPage, fetchNextPage, isLoading, refetch } = useGetInfiniteScroll({
    url: url,
    name: name,
    params: params,
    queryOptions: {
      enabled: false,
    },
  })
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])
  const items: any[] | undefined = get(data, 'pages', [])
    ?.map(item => get(item, dataKey))
    .flat(1)
  const newData = items.map(item => {
    return {
      ...item,
      label: typeof get(item, optionLabel) === 'function' ? optionLabel(item) : get(item, optionLabel),
      value: get(item, optionValue),
    }
  })
  const [value, setValue] = useState<number | null>(null)

  const classNames = cx('simple-select-field relative', (!!value || value === 0) && 'simple-select-field--active', className)

  //@ts-ignore
  const language = storage.get("i18nextLng")?.charAt(0).toUpperCase() + storage.get("i18nextLng").slice(1) || "Uz"
  
  return (
    <div
      className={`${rootClassName}  [&_.ant-select-selector]:rounded [&_.ant-select-selection-placeholder]:text-[14px] [&_.ant-select-selection-placeholder]:text-bold`}
    >
      {label && <p className="mb-1 text-base ant-label font-bold">{label}</p>}

      <div className={classNames}>
        <Select
          key={name}
          onDropdownVisibleChange={open => {
            if (open && !data) {
              refetch()
            }
          }}
          defaultValue={get(get(values, name), optionLabel)}
          disabled={isDisabled}
          className="w-full placeholder-[#9EA3B5]"
          size={size}
          options={newData}
          placeholder={placeholder}
          onChange={value => {
            onChange(value)
            setValue(value)
          }}

        />
        {touched[name] && errors[name] && <small className="text-xs font-semibold text-red-500">{errorMessage ? errorMessage : errors[name]}</small>}
        {/* <span className="floating-placeholder floating-placeholder--simple-select">{placeholder}</span> */}
      </div>
    </div>
  )
}

export default AntSelect