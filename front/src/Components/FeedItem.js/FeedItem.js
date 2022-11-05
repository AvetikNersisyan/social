import { Container, Box } from "@mui/system";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
//
// export const FeedItem = ({content, title, name, surname}) => {
//
//     return (
//         <Container>
//             <Box style={{
//                 color: 'red',
//                 border: '1px solid gray'
//             }}>
//                 <h4> {title}</h4>
//                 <pre> {content}</pre>
//             </Box>
//         </Container>
//     )
// }

const createAvatarLetters = (name, surname) => {
  let res = "";

  if (name) {
    res += name.split("")[0];
  }
  if (surname) {
    res += surname.split("")[0];
  }

  return res || null;
};

export const FeedItem = ({ content, title, name, surname, isOwner, ID }) => {
  return (
    <Card
      sx={{
        maxWidth: 500,
        width: "50vw",
        minWidth: 250,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {createAvatarLetters(name, surname)}
          </Avatar>
        }
        action={
          isOwner && (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={title}
        subheader="September 14, 2016"
      />

      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
