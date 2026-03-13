import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLiveChat } from "../store/liveChatSlice";

import { commentService } from "../service/commentService";

const LiveChatMessage = ({ messages }) => {
  return (
    <div className="max-w-xl  shadow-sm rounded-lg m-10 p-10  border  flex flex-col-reverse h-100 bg-amber-600 overflow-y-auto">
      {messages.map((item) => {
        return (
          <div key={item.id} className="flex items-center gap-2">
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="profile"
              className="w-10"
            />
            <div className="flex flex-col">
              <h6>{item.name}</h6>
              <h6>{item.message}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LiveChat = () => {
  const dispatch = useDispatch();
  const [myMessage, setMyMessage] = useState("");
  const [comments, setComments] = useState([]);
  const liveMessages = useSelector((store) => store.liveChat.messages);

  const handleEnterLiveText = (e) => {
    e.preventDefault();
    dispatch(
      addLiveChat({
        id: "007",
        name: "Prashant",
        message: myMessage,
      }),
    );
    setMyMessage("");
  };

  const handleApiDataOnce = async () => {
    try {
      const apiResponse = await commentService();
      setComments(apiResponse);
    } catch (err) {
      console.log(err);
    }
  };

  //fetch once
  useEffect(() => {
    handleApiDataOnce();
  }, []);

  //mimicking api polling
  useEffect(() => {
    if (!comments.length) return;

    const i = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * comments?.length);
      const randomName = comments[randomIndex]?.name;
      const randomMessage = comments[randomIndex]?.message;

      dispatch(
        addLiveChat({
          id: crypto.randomUUID(),
          name: randomName,
          message: randomMessage,
        }),
      );
    }, 600);
    return () => clearInterval(i);
  }, [comments]);

  return (
    <>
      <LiveChatMessage messages={liveMessages} />
      <div className="ml-10 ">
        <form onSubmit={(e) => handleEnterLiveText(e)}>
          <input
            type="text"
            name="msg"
            id="msg"
            placeholder="🎮 Enter into Live Chat"
            autoComplete="off"
            value={myMessage}
            onChange={(e) => setMyMessage(e.target.value)}
            className="rounded-sm border border-gray-500 mr-3 p-1 "
          />
          <button className="p-1 w-20 rounded-sm bg-blue-400 text-center">
            Enter
          </button>
        </form>
      </div>
    </>
  );
};

export default LiveChat;
