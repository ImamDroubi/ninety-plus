import FormInputError from "./FormInputError";

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
