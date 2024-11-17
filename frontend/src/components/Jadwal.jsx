const Jadwal = () => {
  return (
    <div className=" w-96 flex justify-evenly flex-col gap-7 ">
      <p className="ml-2 font-medium text-xl ">JADWAL PEMATERI</p>
      <div className="grid grid-cols-8  items-center">
        <div className="h-16 w-16 bg-purple-400 rounded-lg col-span-2 "></div>
        <div className=" col-span-5  flex flex-col gap-3 ml-[-1rem]">
          <p className="font-medium">Storytelling dalam pemasaran</p>
          <p className="font-extralight text-small">09.00 - 11.00 With maijam</p>
        </div>
        <div className="col-span-1 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
      {/* --------------------------------------------------------------------------------------------------------------------------------- */}
      <div className="grid grid-cols-8  items-center">
        <div className="h-16 w-16 bg-red-300 rounded-lg col-span-2 "></div>
        <div className=" col-span-5  flex flex-col gap-3 ml-[-1rem]">
          <p className="font-medium">Pemrograman Frontend Modern</p>
          <p className="font-extralight text-small">12.00 - 14.00 With mr.firman</p>
        </div>
        <div className="col-span-1 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
      {/* --------------------------------------------------------------------------------------------------------------------------------- */}
      <div className="grid grid-cols-8  items-center">
        <div className="h-16 w-16 bg-yellow-300 rounded-lg col-span-2 "></div>
        <div className=" col-span-5  flex flex-col gap-3 ml-[-1rem]">
          <p className="font-medium">Pengembangan API</p>
          <p className="font-extralight text-small">14.30 - 15.30 With maijam</p>
        </div>
        <div className="col-span-1 ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
      {/* --------------------------------------------------------------------------------------------------------------------------------- */}
    </div>
  );
};

export default Jadwal;
