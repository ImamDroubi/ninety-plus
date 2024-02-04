import SingleFormInputContainer from "./SingleFormInputContainer";

export default function DoubleFormInputContainer({ children }) {
  return <div className="flex gap-2">
    {children}
  </div>;
}
