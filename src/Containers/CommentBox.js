import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Textarea from  '@mui/material/TextareaAutosize';
import { Button } from '@mui/material';

export function CommentBox(props) {
  const [text, setText] = React.useState('');
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);
  return (
   <>
    <Textarea
      placeholder="Type in here…"
      style={{width:"100%"}}
      value={text}
      onChange={(event) => setText(event.target.value)}
      minRows={2}
      maxRows={4}
     
      
      sx={{ minWidth: 300, color: "white", textDecoration: "none", backgroundColor: "black" }}
    />
    < Button
        color='primary'
          onClick={
            () => {
              props.sendMessage(text);
              setText('')
            }
          }
          variant='contained' sx={{ ml: 'auto', color: "white", backgroundColor: "#000066" }}>
          SEND

        </Button >
        </>
 
  );
}