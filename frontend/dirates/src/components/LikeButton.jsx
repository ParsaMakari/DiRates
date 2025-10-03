
import { FaThumbsUp } from "react-icons/fa";

export default function LikeButton({likes, handleLike }) {




  return (
    <span
      onClick={handleLike}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",      // space between icon and number
        fontSize: "1rem",
        userSelect: "none"
      }}
    >
      <FaThumbsUp color={"#ccc"} />
      <span style={{ fontSize: "0.8rem" }}>{likes}</span>
    </span>
  );
}
