import FormInputError from "./FormInputError";

// eslint-disable-next-line react/prop-types
export default function SingleFormInputContainer({children,extraStyles,error}) {
  return (
    <div className={`mb-3 ${extraStyles || null}`}>
      {children}
      {error && <FormInputError>
        {error}
      </FormInputError>}
    </div>
  )
}
