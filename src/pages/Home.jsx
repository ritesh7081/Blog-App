import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Button } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((response) => {
      if (response) {
        setPosts(response.documents);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-gray-950">

      {/* HERO SECTION */}
      <section className="py-20 text-center">
        <Container>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Welcome to <span className="text-blue-600">Writely</span>
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Express your ideas, inspire the world, and share your thoughts
            through beautifully written posts.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link to="/add-post">
              <Button className="cursor-pointer">Create Post</Button>
            </Link>

            <Link to="/all-posts">
              <Button bgColor="bg-gray-800 hover:bg-gray-900 cursor-pointer">
                Explore Posts
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* POSTS SECTION */}
      <section className="pb-16">
        <Container>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
                No posts available
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Login or create a new post to get started.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                Latest Posts
              </h2>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {posts.map((post) => (
                  <PostCard key={post.$id} {...post} />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </div>
  );
}

export default Home;