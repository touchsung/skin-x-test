import { useContext, useEffect, useState } from "react";
import { Post, queryGetAllPosts } from "../../types/posts";
import { getAllPosts } from "../../api/posts";
import PostCard from "../../components/post/PostCard";
import ReactLoading from "react-loading";
import { getAllTags } from "../../api/tags";
import Dropdown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import AuthContext from "../../context/AuthContext";
import ScrollToTopButton from "../../components/button/ScrollToTopButton";

export const PostPage = () => {
  const { user } = useContext(AuthContext);

  const [postLists, setPostLists] = useState<Post[]>([]);
  const [queryAllPosts, setQueryAllPosts] = useState<queryGetAllPosts>();
  const [loading, setLoading] = useState(false);
  const [tagLists, setTagLists] = useState<string[]>([]);
  const navigator = useNavigate();

  const getPostLists = async (query?: queryGetAllPosts) => {
    try {
      setLoading(true);
      const result = await getAllPosts(query);
      if (query?.lastCursor) {
        setPostLists([...postLists, ...result]);
      } else {
        setPostLists(result);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTagLists = async () => {
    try {
      const result = await getAllTags();
      setTagLists(result.map((item) => item.name));
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    if (user) {
      void getTagLists();
    } else {
      navigator("/login");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      void getPostLists(queryAllPosts);
    }
  }, [queryAllPosts, user]);

  useEffect(() => {
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setQueryAllPosts((pre) => {
          return {
            ...pre,
            lastCursor: postLists.length + 1,
          };
        });
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [postLists.length]);

  return (
    <Layout>
      <section className="flex gap-2 sticky w-full bg-white top-12 pt-2 container">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-gray-500 w-full"
          onChange={(e) =>
            setQueryAllPosts((pre) => {
              return {
                ...pre,
                title: e.target.value,
              };
            })
          }
        />
        <Dropdown
          name="Tag"
          itemLists={tagLists}
          onSelect={(selectedItem) =>
            setQueryAllPosts((pre) => {
              return {
                ...pre,
                tag: selectedItem,
              };
            })
          }
        />
        <Dropdown
          name="Sort"
          itemLists={[
            "Title - Ascending",
            "Title - Descending",
            "Posted At - Ascending",
            "Posted At - Descending",
          ]}
          onSelect={(selectedItem) =>
            setQueryAllPosts((pre) => {
              const [orderBy, sortBy] = selectedItem.split("-");

              return {
                ...pre,
                orderByParam:
                  orderBy.trim().charAt(0).toLocaleLowerCase() +
                  orderBy.trim().slice(1).replace(" ", ""),
                sortBy: sortBy.trim().toLocaleLowerCase().startsWith("asc")
                  ? "asc"
                  : "desc",
              };
            })
          }
        />
      </section>
      <section className="container">
        {postLists.map((post, idx) => (
          <PostCard key={idx} postDetail={post} />
        ))}
        {loading && (
          <ReactLoading
            type="bubbles"
            color="gray"
            height={667}
            width={80}
            className="mx-auto"
          />
        )}
      </section>
      <ScrollToTopButton />
    </Layout>
  );
};
