export default function MoneyAmountBlock({
  icon,
  amount = 0,
  desctiption = "",
  style = "primary",
}) {
  const primaryStyle = "bg-primary-100 text-primary-500";
  const secondaryStyle = "bg-secondary-100 text-secondary-500";
  const errorStyle = "bg-error-100 text-error-500";
  const successStyle = "bg-success-100 text-success-500";
  const chooseStyle = (style) => {
    switch (style) {
      case "primary":
        return primaryStyle;
      case "secondary":
        return secondaryStyle;
      case "error":
        return errorStyle;
      case "success":
        return successStyle;
    }
  };

  return (
    <div className="py-3 px-2 w-[12rem] flex gap-3 text-gray-900 text-lg bg-gray-white">
      <div className={`icon py-2 px-3 aspect-square ${chooseStyle(style)}`}>
        {icon}
      </div>
      <div className="info">
        <h4 className="amount font-bold">${amount}</h4>
        <p className="description text-gray-700 text-base">{desctiption}</p>
      </div>
    </div>
  );
}
