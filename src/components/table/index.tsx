import React, { useCallback, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { PaginationProps, TableColumnsType } from 'antd';
import { TMeta } from 'services/types';
import { useHooks } from 'hooks';

interface IProps {
    items: any[]
    columns: TableColumnsType<any>,
    hasPagination?: boolean
    meta?: TMeta
    isLoading?: boolean
}

const TableComponent = (props: IProps) => {
  const {columns, items, hasPagination = true, meta, isLoading} = props
  const {get, query, navigate, qs} = useHooks()
  const [current, setCurrent] = useState<number>(1);
  const onChange = useCallback(
    (pagination: PaginationProps) => {
      navigate({
        search: qs.stringify({
          ...query,
          page: pagination.current,
          limit: pagination.pageSize,
        }),
      });
    },
    [navigate, query]
  );
  
  return (
        <Table
          columns={columns} 
          dataSource={items} 
          rowKey={'id'} 
          pagination={
            hasPagination
              ? meta
                ? {
                    disabled: isLoading,
                    position: ["bottomRight"],
                    current: +get(query, "page", 1),
                    total: +get(meta, "totalCount", 0),
                    pageSize: +get(query, "limit", get(meta, "perPage")),
                  }
                : {
                    position: ["bottomRight"],
                    current: current,
                    total: items.length,
                    pageSize: 10,
                  }
              : false
          }
          onChange={(page: any) => {
            if(meta) {
              onChange(page)
            } else {
              setCurrent(page.current)
            }
          }} 
          loading={isLoading}
        />
      )
};

export default TableComponent;
