import React from "react";
import { Post } from "../../types/posts";
import { formatDate } from "../../utils/helper";

interface PostCardProps {
  postDetail: Post;
}

const PostCard: React.FC<PostCardProps> = ({ postDetail }) => {
  const handleClick = () => {
    alert("Clicked on post card");
  };

  return (
    <section className="mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">{postDetail.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          Posted on {formatDate(postDetail.postedAt)} by{" "}
          {postDetail.postedBy.name}
        </p>
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
          <button
            onClick={handleClick}
            className="text-gray-600 text-sm mt-2 hover:underline"
          >
            See more
          </button>
        </div>
      </div>
    </section>
  );
};

export default PostCard;
