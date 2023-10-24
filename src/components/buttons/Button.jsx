
export default function Button({type="primary",disabled,text='زر', action}) {
  const styles = {
    "primary" : "px-2 py-1  text-xs text-gray-white bg-primary-500 hover:bg-primary-600 disabled:bg-primary-200 sm:font-semibold sm:px-3 sm:py-1 sm:text-base",
    "secondary" : "px-2 py-1  text-xs text-primary-600 bg-primary-100 hover:bg-primary-200 disabled:bg-primary-100 disabled:text-primary-300 sm:font-semibold sm:px-3 sm:py-1 sm:text-base",
    "tertiary" : "px-2 py-1  text-xs text-primary-500 hover:bg-primary-100 disabled:bg-none disabled:text-primary-300 sm:font-semibold sm:px-3 sm:py-1 sm:text-base"
  }
  return (
    <button onClick={()=>action()} className={styles[type]}>
      {text}
    </button>    
  )
}
