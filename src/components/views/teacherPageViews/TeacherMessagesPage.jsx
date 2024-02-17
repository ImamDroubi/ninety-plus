import SearchInput from "../../other/SearchInput";
import ConversationBody from "../../chatComponents/ConversationBody";
import ConversationPreview from "../../chatComponents/ConversationPreview";
import { useState } from "react";

export default function TeacherMessagesPage() {
  const [searchText, setSearchText] = useState();

  return (
    <section className="my-2 flex justify-between gap-1 w-[90%] m-auto ">
      <div className="nav-section w-full md:w-1/3 border-[1px] bg-gray-white border-gray-100 md:h-[35rem] overflow-auto">
        <div className="nav-header p-3">
          <h2 className="mb-3 text-lg font-semibold">الرسائل</h2>
          <SearchInput stateChanger={setSearchText} />
        </div>
        <div className="conversation-list mt-2">
          <ConversationPreview />
          <ConversationPreview />
          <ConversationPreview />
          <ConversationPreview />
          <ConversationPreview />
        </div>
      </div>
      <div className="conversation-body w-full hidden md:w-2/3 bg-gray-white  border-[1px] border-gray-100  md:block px-2">
        <ConversationBody />
      </div>
    </section>
  );
}
