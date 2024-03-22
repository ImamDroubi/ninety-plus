import SingleFormInputContainer from "./SingleFormInputContainer";

export default function DoubleFormInputContainer({ children ,extraStyles }) {
  return <div className={`${extraStyles} flex gap-2`}>
    {children}
  </div>;
}
