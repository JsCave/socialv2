import React, { useContext, useState } from "react";
import Comment from "./Comment";
import CardHeader from "./Post/CardHeader";
import PostBody from "./Post/PostBody";
import PostFooter from "./Post/PostFooter";
import PostActions from "./Post/PostActions";
import { Button, Input, useDisclosure } from "@heroui/react";
import { addCommentApi } from "../services/CommentsService";
import { authContext } from "../contexts/authContext";
import DropDownCard from "./DropDownCard";
import ModalComponent from "./ModalComponent";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { client } from "../App";

export default function Post({ post, commentsLimit, handleDeletePost,setPostId }) {
  const [visibleComments, setVisibleComments] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [isCLoading, setIsCLoading] = useState(false);
  const { userData } = useContext(authContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPostDeleteing, setIsPostDeleting] = useState(false);
console.log(post)
  const{mutate:HandleAddComment,isPending}=   useMutation({
mutationFn:()=>addCommentApi(commentContent,post._id),
onSuccess:(data)=>{
  //console.log("create Comment Data"+data)
  setCommentContent('')
//  console.log("create Comment Data Response.comments"+data.comments)
  //callback() we don't need to callback now
  client.invalidateQueries(["posts"])
},
onError:(e)=>{
console.log("create comments errors"+e)
},
     })

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleComments((prev) => prev + 2);
      setIsLoading(false);
    }, 200);
  };


  return (
    <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
      <div className="w-full h-16 items-center flex justify-between">
        <CardHeader avatar={post.user.photo} header={post.user.name} subheader={post.createdAt} />
        {post.user._id === userData._id && <DropDownCard onOpen={onOpen} postId={post._id} setPostId={setPostId} />}
      </div>

      <PostBody caption={post.body} image={post.image} />
      <PostFooter commentsNum={post.comments.length} />
      <PostActions postId={post._id} />

      <div className="flex my-3">
        <Input
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          variant="bordered"
          placeholder="Comment..."
          endContent={
            <Button onPress={HandleAddComment} isLoading={isPending}>
              Comment
            </Button>
          }
        />
      </div>

      {post.comments
        .slice(0, commentsLimit ?? visibleComments)
        .map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}

      {post.comments.length > visibleComments && !commentsLimit && (
        <Button isLoading={isLoading} className="mx-auto block" variant="faded" onPress={handleLoadMore}>
          Load More
        </Button>
      )}

      <ModalComponent
        deleteFunction={(onClose) => handleDeletePost(onClose, post._id, setIsPostDeleting)}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isPostDeleteing={isPostDeleteing}
      />
    </div>
  );
}