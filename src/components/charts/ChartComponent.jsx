export default function ChartComponent({ children, title, extraStyle }) {
  return (
    <div className={`flex flex-col gap-2 my-3 bg-gray-white p-2 ${extraStyle}`}>
      <h2 className="text-md font-semibold text-gray-900 border-b-[2px] border-gray-200 pb-2">
        {title}
      </h2>
      <div className="chart">{children}</div>
    </div>
  );
}
