import { commentsData } from "../data/commentsData";

const Comment = ({ text, name }) => (
  <div className="rounded-sm shadow-sm bg-red-300 flex items-center gap-4 ml-10 my-10">
    <div>
      <img
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        alt="profile"
        className="w-10"
      />
    </div>
    <div className="flex flex-col">
      <h6>{name}</h6>
      <h6>{text}</h6>
    </div>
  </div>
);

const CommentList = ({ comments }) => {
  return comments.map((comment, idx) => (
    <div key={idx}>
      <Comment text={comment.text} name={comment.name} />
      <div className=" pl-10 border border-gray-950">
        <CommentList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <CommentList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
