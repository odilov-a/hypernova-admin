const HomeModal = ({ data }: { data: any }) => {
  return (
    <div>
      <h2 className='text-xl font-bold'>{data.id}</h2>
      <h3>
        {data.first_name} {data.last_name}
      </h3>
    </div>
  );
};

export default HomeModal;
