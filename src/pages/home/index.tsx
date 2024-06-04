import { useState } from "react";
import { useHooks } from "hooks";
// import { useTranslation } from "react-i18next";

// Components
import { Modal } from "components";
import { Filter, ApplicationsList, HomeModal } from "./components";
import Container from "modules/container";

const lngs: any = {
  en: { nativeName: "English" },
  uz: { nativeName: "Uzbek" },
};

const Home = () => {
  // const { i18n } = useTranslation();
  // const { t } = useHooks();
  const [modalApplication, setModalApplication] = useState<{
    data: any;
    isOpen: boolean;
  }>({
    data: null,
    isOpen: false,
  });

  return (
    <section className="applications">
      "Hello"
      <Filter />
      <Container.All url="/api/portfolios" name="portfolio">
        {({ items, isLoading, meta }) => {
          return (
            <div>
              <h1>test</h1>
            </div>
          );
        }}
      </Container.All>
      <ApplicationsList setModalApplication={setModalApplication} />
      <Modal
        data={modalApplication}
        onCancel={() => {
          setModalApplication({ data: null, isOpen: false });
        }}
        childrenEl={HomeModal}
        title="Modal title"
      />
      {Object.keys(lngs).map((lng: any) => {
        return (
          <button
            type="button"
            key={lng}
            // onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        );
      })}
    </section>
  );
};

export default Home;
