import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div`
  color:white;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #fff;
  color:#fff;
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const AddButton = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const { userLocation } = useSelector((state) => state?.user)
  console.log("userLocation", userLocation);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) { }
    };
    fetchComments();

  }, [videoId]);


  const handleAddComment = async () => {
    try {
      const payload = {
        text: newCommentText,
        userId: currentUser._id,
        location: userLocation
      };
      const res = await axios.post(`/comments/${videoId}`, payload);
      if (res.status === 200) {
        setComments([...comments, res.data]);
        setNewCommentText('');
      } else {
        console.error('Failed to add comment. Status:', res.status);
      }
    } catch (err) {
      console.error('Error adding comment:', err.message);
    }
  };

  
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder="Add a comment..." value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} />
        <AddButton onClick={handleAddComment} >Add</AddButton>
      </NewComment>
      <div style={{ padding: '10px' }}>
        {comments.map(comment => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </Container>
  );
};

export default Comments;