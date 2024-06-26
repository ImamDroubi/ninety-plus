import Container90 from "../containers/Container90";
import PopupLayout from "../layouts/PopupLayout";
import { useEffect, useState } from "react";
import ClosePopupButton from "../buttons/ClosePopupButton";
import { ChatIcon } from "../icons/icons";
import LiveStreamChat from "../chatComponents/LiveStreamChat";
import LiveStreamComponent from "../other/LiveStreamComponent";
import { useAuth } from "../../contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import useGetResource from "../../apiCalls/useGetResource";

export default function LiveStreamPage() {
  let { liveId } = useParams();
  const getLectureQuery = useGetResource("lectures", liveId);
  const { currentUser, fetchingUser } = useAuth();
  const [currentClient, setCurrentClient] = useState();
  const [watchPopupOpen, setWatchPopupOpen] = useState(false);
  const [isLiveStreamOn, setIsLiveStreamOn] = useState(false);
  const [currentLecture, setCurrentLecture] = useState();
  useEffect(() => {
    if (getLectureQuery.data) {
      setCurrentLecture(getLectureQuery.data.data.data);
    }
    if (getLectureQuery.data) {
    }
  }, [getLectureQuery.isSuccess]);
  if (fetchingUser) return <CircularProgress />;
  if (getLectureQuery.isPending) return <CircularProgress />;
  return (
    <>
      <div className="px-1 py-2 to bg-gray-50 sm:px-0">
        <Container90>
          <div className="flex justify-between content">
            <div className="flex gap-2 right">
              <div className="info flex flex-col gap-[0.2rem]">
                <h2 className="font-bold text-gray-900">
                  {currentLecture?.course?.name}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-1 left lg:hidden ">
              <button
                onClick={() => setWatchPopupOpen(true)}
                className="flex items-center justify-center w-6 h-6 text-xl bg-gray-100 rounded-full text-primary-500 hover:bg-gray-200"
              >
                <ChatIcon />
              </button>
            </div>
          </div>
        </Container90>
      </div>
      <Container90>
        <div className="flex flex-col gap-2 px-2 my-3 text-gray-900 lg:flex-row main sm:px-0">
          <div className="lg:w-full content">
            <div className="video">
              <h1 className="my-2 text-2xl font-normal md:font-bold title">
                {`${currentLecture?.id}. ${currentLecture?.name}`}
              </h1>
              <LiveStreamComponent liveId={liveId} />
              {/* <div className="flex justify-between text-sm info md:text-base">
                <p className="text-gray-600">
                  <span className="text-lg font-bold text-gray-900">523 </span>
                  مشاهد
                </p>
                <div className="flex gap-5 statistics">
                  <p className="text-gray-600 date">
                    تاريخ التحميل:{" "}
                    <span className="text-gray-900">Oct/26/2020</span>
                  </p>
                  <p className="text-gray-600 comments">
                    التعليقات: <span className="text-gray-900">154</span>
                  </p>
                </div>
              </div> */}
            </div>
          </div>
          {/* <div className="nav h-[60rem] hidden lg:block basis-1/4">
            <LiveStreamChat />
          </div> */}
        </div>
      </Container90>
      {watchPopupOpen ? (
        <PopupLayout>
          <div className="relative z-10 w-10/12 py-6 bg-gray-50">
            <ClosePopupButton setOpen={setWatchPopupOpen} />
            <LiveStreamChat />
          </div>
        </PopupLayout>
      ) : null}
    </>
  );
}
