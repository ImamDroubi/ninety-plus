import { useEffect } from "react";

export default function LabelWithIcon({
  icon,
  label = "",
  description = "",
  style = "primary",
}) {
  const primaryStyle = "text-primary-500";
  const secondaryStyle = " text-secondary-500";
  const errorStyle = " text-error-500";
  const successStyle = " text-success-500";
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
    <div
      className={`py-3 px-2 max-w-[15rem] flex gap-3 text-gray-900 text-lg w-full bg-${style}-100  `}
    >
      <div
        className={`icon py-2 px-3 aspect-square  bg-gray-50 ${chooseStyle(
          style
        )}`}
      >
        {icon}
      </div>
      <div className="info">
        <h4 className="amount font-semibold">{label}</h4>
        <p className="description text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
}
