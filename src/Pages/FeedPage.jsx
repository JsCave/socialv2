import React, { useMemo, useState } from "react";
import { getAllPostsApi } from "../services/PostSerices";
import LoadingPage from "./LoadingPage";
import Post from "../Components/Post";
import CreatePost from "../Components/CreatePost";
import { addToast, Button } from "@heroui/react";
import { deletePostApi } from "../services/PostSerices";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";

export default function FeedPage() {
  const [postId, setPostId] = useState(null);

  const { data, refetch, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPostsApi,
    //retry:3,
   // retryDelay:500,
  //  retryOnMount:true, // in case there is error if true will try to refetch automatically if false will not try
//refetchOnReconnect:true, //if lost internet connection and back again will try refetch automatically
//refetchOnMount:true, // if i moved between pages and return to feed page if false will not send refetch request for update data
//refetchOnWindowFocus:true, // make refetch if you moved to other window like other app and returned to browser again
//refetchInterval:5000, //send refetch request every 5s for example
//refetchIntervalInBackground:false, //idea is if true even if your focus not on browser or tap still refetch if false will not refetch
//staleTime:5000, //dev tool mark info as old after 5 seconds ex , as long as data fresh no refetch will work
//gcTime:5000, // garbage collection time-how much time then data will erase from cache
});

  async function handleDeletePost(onClose, postId, setIsPostDeleting) {
    setIsPostDeleting(true);
    const response = await deletePostApi(postId);
    setIsPostDeleting(false);

    if (response.message === "success") {
      await refetch();
      onClose();
      addToast({
        title: "Delete Post",
        description: "Post Deleted",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "success",
      });
     // console.log("delete" + response);
    }
  }
/* custom hooks examples 
  const products=useFetch('https://ecommerce.routemisr.com/api/v1/products')
  console.log(products)

  const brands=useFetch('https://ecommerce.routemisr.com/api/v1/brands')
  console.log(brands)

  const categories=useFetch('https://ecommerce.routemisr.com/api/v1/categories')
  console.log(categories)
*/
return (

    
    <div className="grid gap-3 max-w-3xl mx-auto">
     
      <h1>{error?.message}</h1>
      <CreatePost getAllPosts={refetch} />
      {isLoading ? (
        <LoadingPage />
      ) :
      isError?
      !isFetching?(<><h1>{isError+''}</h1>
      <h1>{error?.message}</h1>
      <Button onPress={refetch} isLoading={isFetching}>Retry</Button>
      </>):('')
      :
      (
        data?.data.posts.map((post) => (
          <Post
            setPostId={setPostId}
            handleDeletePost={handleDeletePost}
            key={post._id}
            post={post}
            commentsLimit={1}
          />
        ))
      )}
      
    </div>
  
  );
}
