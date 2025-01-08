import { Comment } from "@/types/comment.type";
import SettingComment from "./SettingComment";
import { formatDate } from "date-fns";
import { useSelector } from "react-redux";
import photo from "../../assets/images/logo.png";
import { selectAuth } from "@/app/authSlice";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CommentCard = ({
  comment,
  deleteComment,
  updateComment,
}: {
  comment: Comment;
  deleteComment: (commentId: string) => void;
  updateComment: (dto: { commentId: string; content: string }) => void;
}) => {
  const currentUser = useSelector(selectAuth).user;
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [content, setContent] = useState(comment.content);

  useEffect(() => {
    if (inputRef.current) {
      const text = inputRef.current;
      if (isEdit) {
        text.disabled = false;
        text.focus();
        inputRef.current.setSelectionRange(
          text.value.length,
          text.value.length,
        );
      } else {
        inputRef.current.disabled = true;
      }
    }
  }, [isEdit]);

  return (
    <div className="rounded-lg border-2 px-4 py-2">
      <article className="rounded-lg bg-white text-base dark:bg-gray-900">
        <footer className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
              <img
                className="mr-2 h-6 w-6 rounded-full"
                src={comment.user.photo?.path || photo}
                alt={comment.user.name}
              />
              {comment.user.id === currentUser?.id ? "You" : comment.user.name}
            </p>
            <p className="text-[12px] text-gray-600 dark:text-gray-400">
              {formatDate(comment.createdAt, "dd/MM/yyyy")}
            </p>
          </div>
          {comment.user.id === currentUser?.id && (
            <SettingComment
              comment={comment}
              setIsEdit={setIsEdit}
              deleteComment={deleteComment}
            />
          )}
        </footer>
        <Textarea
          ref={inputRef}
          className="border-none text-sm disabled:cursor-default disabled:opacity-100"
          disabled={true}
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {isEdit && (
          <div className="mt-4 flex gap-2">
            <Button variant={"outline"} onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                updateComment({ commentId: String(comment.id), content });
                setIsEdit(false);
              }}
            >
              Update
            </Button>
          </div>
        )}
      </article>
    </div>
  );
};

export default CommentCard;
