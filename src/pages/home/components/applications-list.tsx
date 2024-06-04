import { Table } from "components";
import { useHooks } from "hooks";
import { Container } from "modules";

interface IProps {
  setModalApplication: React.Dispatch<
    React.SetStateAction<{
      data: any;
      isOpen: boolean;
    }>
  >;
}

const ApplicationsList = (props: IProps) => {
  const { setModalApplication } = props;
  const { get, query, dateConverter } = useHooks();

  return (
    <div>
      "Test-uchun"
      <Container.All
        params={{
          limit: +get(query, "limit", 10),
          page: +get(query, "page", 1),
          sort: "-id",
          // filter: {
          //   first_name: "Shavkat",
          //   kurs_id: get(query, "kurs_id.value", null),
          //   date: get(query, "date")
          //     ? dateConverter(
          //         Number(get(query, "date")),
          //         "string",
          //         "YYYY-MM-DD"
          //       )
          //     : null,
          // },
          include: "kurs",
        }}
        url='/test/'
        name='applications'
      >
        {({ isLoading, items, meta }) => {
          return (
            <div>
              <Table
                items={items}
                columns={[
                  {
                    title: "ID",
                    dataIndex: "id",
                    className: "class",
                    render: (value) => <>{value}</>,
                  },
                  {
                    title: "Ism-familiya",
                    dataIndex: "id",
                    className: "modal-opener",
                    render: (_, data) => {
                      return (
                        <div
                          className='text-blue-700 underline cursor-pointer'
                          onClick={() => {
                            setModalApplication({ data: data, isOpen: true });
                          }}
                        >
                          {get(data, "first_name")} {get(data, "last_name")}
                        </div>
                      );
                    },
                  },
                  {
                    title: "Telefon raqami",
                    dataIndex: "phone_number",
                    className: "class",
                    render: (value) => <>{value}</>,
                  },
                ]}
                isLoading={isLoading}
                meta={meta}
              />
            </div>
          );
        }}
      </Container.All>
    </div>
  );
};

export default ApplicationsList;
