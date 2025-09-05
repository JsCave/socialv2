import React, { useContext, useState } from "react";
import holder from "/src/assets/holder.png"
import CardHeader from "./Post/CardHeader";
import { Button, Input,useDisclosure, addToast} from "@heroui/react"
import { authContext } from "../contexts/authContext";
import { deleteComment, updateComment } from "../services/CommentsService";
import DropDownCard from "./DropDownCard";
import ModalComponent from "./ModalComponent";
import { useMutation } from "@tanstack/react-query";
import { client } from "../App";

export default function Comment({comment}){
     const{userData}= useContext(authContext)
     const {isOpen, onOpen, onOpenChange} = useDisclosure();
     const[isCommentDeleteing,setIsCommentDeleting]=useState(false)
     const[updateMode,setUpdateMode]=useState(false)
     const[newComment,setNewComment]=useState(comment.content)
     const[isCommentUpdating,setIsCommentUpdating]=useState(false)



     async function handleDeleteComment(onClose){
      setIsCommentDeleting(true)
      const response=await deleteComment(comment._id)
      setIsCommentDeleting(false)
      console.log(response)
      if(response.message=='success'){
        await client.invalidateQueries(['posts'])
        onClose()
        addToast({
          title: "Delete Comment",
          description: "Comment Deleted",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color:"success",
        });
       // console.log('delete'+response)
      }
    
    }


async function handleUpdateComment() {
  setIsCommentUpdating(true)
  const response=await updateComment(comment._id,newComment)
 // console.log(response)
  if(response.message=='success'){
    await client.invalidateQueries(['posts'])
    setUpdateMode(false)
    setIsCommentUpdating(false)
    addToast({
      title: "Comment Updated",
      description: "Comment Updated",
      timeout: 3000,
      shouldShowTimeoutProgress: true,
      color:"success",
    });
  }
}

return(
    <div>
<div className="w-full h-16  items-center flex justify-between ">


            <CardHeader avatar={comment.commentCreator.photo} header={comment.commentCreator.name} subheader={comment.createdAt}/>
            {comment.commentCreator._id==userData._id &&
                  <DropDownCard onOpen={onOpen} setUpdateMode={setUpdateMode}/>
}
</div> 
        
           {updateMode?
<div className="ps-12 pt-2">
  <Input isDisabled={isCommentUpdating} variant="bordered" value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
  <div className="mt-2 flex justify-end gap-3">
  <Button color="default" variant="bordered" onPress={()=>setUpdateMode(false)}>Cancel</Button>
    <Button isDisabled={newComment.trim().length<2} color="primary" isLoading={isCommentUpdating} onPress={handleUpdateComment}>Update</Button>
  </div>
  </div>
  :
  <p className="ps-12 pt-2">{comment.content}</p>
  }

            <ModalComponent deleteFunction={handleDeleteComment} isOpen={isOpen} onOpenChange={onOpenChange}/>
      </div>
)
}