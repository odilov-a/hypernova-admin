import React, { useState } from 'react';
import Select from 'react-select';
import { useHooks } from 'hooks';
import useGetInfiniteScroll from 'hooks/useScrollGet'


interface DataItem {
  id: number;
  name: string;
}

const AsyncSelect: React.FC = (props: any) => {

  const {
    url,
    params,
    filterParams,
    dataKey = 'data',
    onChange = () => { },
    extraOptions = [],
    loadOptions,
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
    form,
    form: { errors, setFieldValue, setFieldTouched, touched, values, },
    className,
  } = props

  const { get } = useHooks()

  const [fetchedData, setFetchedData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const { data, hasNextPage, fetchNextPage, isLoading, refetch,  } = useGetInfiniteScroll({
    url: url,
    name: name,
    params: params,
    queryOptions: {
      enabled: false,
    },
  })

  const items: any[] | undefined = get(data, 'pages', [])?.map(item => get(item, dataKey)).flat(1)

  const newData = items.map(item => {
    return {
      ...item,
      label: typeof get(item, optionLabel) === 'function' ? optionLabel(item) : get(item, optionLabel),
      value: get(item, optionValue),
    }
  })

  return (
    <div className={rootClassName + ' input relative'}>
      {label ? <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#E6ECFE] dark:bg-[#454d70] rounded-[6px] inline-block mb-[12px]">{label}</p> : null}
      <Select
        onMenuOpen={() => {
          refetch()
        }}
        value={get(values, name)}
        getOptionLabel={option => option[optionLabel]}
        getOptionValue={option => option[optionValue]}
        key={name}
        //@ts-ignore
        options={newData}
        isLoading={loading}
        placeholder={placeholder}
        className={className}
        onMenuScrollToBottom={() => {
          {
            hasNextPage && (fetchNextPage())
          }
        }}
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