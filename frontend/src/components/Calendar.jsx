function Calendar() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dates = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="bg-custom-blue p-10 rounded-2xl m-10">
      <div className="flex justify-between items-center mb-4">
        <button className="text-white">&lt;</button>
        <h2 className="text-white text-xl font-bold">April 2025</h2>
        <button className="text-white">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day} className="bg-gray-700 rounded-md text-center p-2 text-sm text-white">
            {day}
          </div>
        ))}
        {dates.map((date) => (
          <div key={date} className="bg-gray-700 rounded-md text-center p-2 text-sm text-white">
            {date}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
