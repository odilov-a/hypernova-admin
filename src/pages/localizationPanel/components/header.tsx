import { Fields } from "components";
import { FastField, Form, Formik } from "formik";
import { useHooks } from "hooks";

const Header = ({setSearchWord}:any) => {
  const { t } = useHooks();

  return (
    <div>
      <h1>{t("Header")}</h1>
      <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
        {() => {
          return (
            <Form>
              <FastField
                component={Fields.Input}
                placeholder={t('Search')}
                name='search'
                onChange={(e:any) => setSearchWord(e.target.value)}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Header;