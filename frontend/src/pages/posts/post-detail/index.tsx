import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/helper";
import { Post } from "../../../types/posts";
import { useEffect, useState } from "react";
import { getPost } from "../../../api/posts";
import PageLoading from "../../../components/loading/PageLoading";
import ScrollToTopButton from "../../../components/button/ScrollToTopButton";
import Layout from "../../../components/Layout";

const PostDetailPage = () => {
  const [postDetail, setPostDetail] = useState<Post | null>();
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const { id } = useParams<{ id: string }>();

  const getPostById = async (id: string) => {
    try {
      setLoading(true);
      const result = await getPost(id);
      setPostDetail(result);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userLocal = localStorage.getItem("accessToken");

    if (!userLocal) {
      navigator("/login");
    }

    if (id) {
      getPostById(id);
    }
  }, [id]);

  if (loading) {
    return <PageLoading />;
  }
  return (
    <Layout>
      <section className="container">
        {postDetail && (
          <>
            <div className="my-2 py-2 bg-white">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold mb-2">{postDetail.title}</h1>
                <div className="w-full max-w-fit flex justify-end">
                  <Link to="/" className="btn-primary">
                    Back to Home
                  </Link>
                </div>
              </div>
              <h2 className="text-gray-600 text-sm my-2">
                Posted on {formatDate(postDetail.postedAt)} by{" "}
                {postDetail.postedBy.name}
              </h2>
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
            </div>
            <main className="my-4">
              {postDetail.content && (
                <div dangerouslySetInnerHTML={{ __html: postDetail.content }} />
              )}
            </main>
          </>
        )}
        <ScrollToTopButton />
      </section>
    </Layout>
  );
};

export default PostDetailPage;
