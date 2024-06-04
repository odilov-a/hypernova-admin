import { Button, Space } from "antd";
import { Fields } from "components";
import { Formik, Form, FastField } from "formik";
import { useHooks } from "hooks";
import dayjs from "dayjs";

const Filter = () => {
  const { qs, navigate, get, query } = useHooks();

  return (
    <div className='mb-5'>
      <Formik
        initialValues={{
          kurs_id: get(query, "kurs_id"),
          date: get(query, "date") ? dayjs.unix(+get(query, "date", 0)) : null,
        }}
        onSubmit={(data) => {
          const queryObj: any = {
            ...data,
            date: dayjs(get(data, "date")).unix(),
          };
          if (!get(data, "date")) {
            delete queryObj.date;
          }
          navigate({ search: qs.stringify(queryObj) });
        }}
      >
        {() => {
          return (
            <Form>
              <Space wrap>
                <FastField
                  className='w-[360px]'
                  name='kurs_id'
                  component={Fields.Select}
                  placeholder="Kurslar bo'yicha filtr"
                  options={[
                    {
                      label: "Dasturlash",
                      value: 1,
                    },
                    {
                      label: "SMM",
                      value: 2,
                    },
                  ]}
                  optionValue='value'
                  isClearable={true}
                />
                <FastField name='date' component={Fields.DatePicker} />
                <Button htmlType='submit' size='large'>
                  Submit
                </Button>
              </Space>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Filter;
