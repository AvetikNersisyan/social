import { Box } from "@mui/system";

import * as React from "react";
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
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
  console.count(typeof name);
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
        subheader={
          <Box>
            <p>{name && name}</p>
            <p>{surname && surname}</p>
          </Box>
        }
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
