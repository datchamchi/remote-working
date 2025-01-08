import { cn } from "@/lib/utils";
import { Comment } from "@/types/comment.type";
import { useState } from "react";

const SettingComment = (props: {
  comment: Comment;
  setIsEdit: (status: boolean) => void;
  deleteComment: (commentId: string) => void;
}) => {
  const { comment, setIsEdit, deleteComment } = props;
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpenSetting((isOpen) => !isOpen)}
        id={`dropdownComment${comment.id}Button`}
        data-dropdown-toggle={`dropdownComment${comment.id}`}
        className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
        <span className="sr-only">Comment settings</span>
      </button>
      <div
        id={`dropdownComment${comment.id}`}
        className={cn(
          "absolute z-50 w-36 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700",
          !isOpenSetting && "hidden",
        )}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconHorizontalButton"
        >
          <button
            onClick={() => {
              setIsEdit(true);
              setIsOpenSetting(false);
            }}
            className="block w-full px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Edit
          </button>

          <button
            onClick={() => deleteComment(String(comment.id))}
            className="block w-full px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Remove
          </button>
        </ul>
      </div>
    </div>
  );
};

export default SettingComment;
