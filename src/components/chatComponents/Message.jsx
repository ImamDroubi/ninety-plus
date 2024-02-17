export default function Message({ message }) {
  const clientMessageStyle = "bg-primary-500 text-gray-white";
  const serverMessageStyle = "bg-gray-100 text-gray-900";
  const messageBaseStyle = "max-w-[70%] p-2 my-1 break-words";
  return (
    <>
      <div
        className={`w-full flex ${
          message.owner === "client" ? "justify-start" : "justify-end"
        }`}
      >
        <p
          className={`${messageBaseStyle} ${
            message.owner === "client" ? clientMessageStyle : serverMessageStyle
          }`}
        >
          {message.text}
        </p>
      </div>
    </>
  );
}
