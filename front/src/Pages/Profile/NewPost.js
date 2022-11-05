import { LoadingButton } from "@mui/lab";
import { TextareaAutosize, Box, ButtonGroup, Button } from "@mui/material";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshPostDraft } from "../../redux/reducers/user";
import { useAddPost } from "../../services/addNewPost";
import { API_STATUS } from "../../services/constants";

export const NewPost = () => {
  const { fetch, res, status } = useAddPost();

  const { postDraft } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const id = useId();
  const submitPost = (e) => {
    e.preventDefault();
    fetch({
      title: "title " + id,
      content: postDraft.content,
    });
  };

  const onChangeValue = (e) => {
    const copied = Object.assign({}, postDraft);
    copied.content = e.target.value;

    dispatch(refreshPostDraft(copied));
  };

  return (
    <Box
      style={{
        display: "flex",
        gap: "2rem",
        alignItems: "center",
        flexDirection: "column",
        padding: "2rem",
      }}
    >
      <form onSubmit={submitPost}>
        <TextareaAutosize
          value={postDraft.content}
          onChange={onChangeValue}
          aria-label="empty textarea"
          placeholder="What's on your mind..."
          minRows={3}
          style={{
            maxWidth: 500,
            width: "50vw",
            minWidth: 250,
          }}
        />
        <ButtonGroup
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "50vw",
          }}
        >
          <Button type="reset"> Clear </Button>
          <LoadingButton
            loading={status === API_STATUS.LOADING}
            type="submit"
            variant="contained"
          >
            Post
          </LoadingButton>
        </ButtonGroup>
      </form>
    </Box>
  );
};
