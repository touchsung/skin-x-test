import React from "react";
import { Post } from "../../types/posts";
import { formatDate } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

export interface PostCardProps {
  postDetail: Post;
}

const PostCard: React.FC<PostCardProps> = ({ postDetail }) => {
  const navigator = useNavigate();
  const handleClick = (id: number) => {
    navigator(`post/${id}`);
  };

  return (
    <section className="mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">{postDetail.title}</h1>
        <h2 className="text-gray-600 text-sm my-2">
          Posted on {formatDate(postDetail.postedAt)} by{" "}
          {postDetail.postedBy.name}
        </h2>
        <div className="flex items-start justify-between">
          <div className="flex flex-wrap">
            {postDetail.TagsOnPosts.map((item, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 transition duration-300 ease-in-out hover:bg-gray-400 hover:text-white select-none"
              >
                #{item.tag.name}
              </span>
            ))}
          </div>
          <div className="w-full max-w-fit flex justify-end">
            <button
              onClick={() => handleClick(postDetail.id)}
              className="text-gray-600 text-sm mt-2 hover:underline block w-fit"
            >
              See more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostCard;
