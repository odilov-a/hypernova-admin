import { useHooks } from "hooks";

const More = ({ showMoreModal, moreModal }: any) => {
  const data = moreModal?.data
  const { t } = useHooks()
  return (
    <>
      <div className="flex items-center mb-[10px]"><p className="mr-[20px]"><b>{t("Sarlavha")}:</b></p><p>{data.title}</p></div>
      <div className="flex items-center mb-[10px]"><p className="mr-[20px]"><b>{t("To'liq ma'lumot")}:</b></p><p>{data.description}</p></div>
    </>
  )
}

export default More;