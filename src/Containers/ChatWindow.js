import * as React from "react";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/joy";
import { Avatar } from "@mui/material";
import { SocketContext } from "../Context/SocketContext";
import { CommentBox } from "./CommentBox";
import { useSelector } from "react-redux";
import { API } from "../apiManager/endPoints";

export function ChatWindow(props) {
  const { currentMatchId } = props;
  const user = useSelector((state) => state.userReducer?.user);
  const { socket } = React.useContext(SocketContext);

  const [chats, setChats] = React.useState([]);

  React.useEffect(() => {
    socket.emit('join-match-chat', `${currentMatchId}`);

    socket.on('messages', (messages) => {
      if (messages && messages.length > 0) {
        messages = JSON.parse(messages)
        setChats([...messages]);
      }
    });

    socket.on('connectToRoom', (message) => {
      console.log(message);
    });

    socket.on('message', (msgData) => {
      setChats((prevChats) => {
        return [...prevChats, JSON.stringify(msgData)]
      });
    });

    return () => {
      socket.off('messages');
      socket.off('connectToRoom');
      socket.off('message');
    };

  }, []);


  const sendMessage = (message) => {
    socket.emit('send-room-message', { "name": user?.name || "unknown", "message": message, "room": `match-${currentMatchId}`, "userId": user?.userId || "1" });
  }

  return (
    <>
      <Box
        sx={{
          height: 300,
          backgroundColor: "black",
          maxHeight: "100%",
          width: "100%",
          overflow: "auto",
          borderRadius: "2em",
          "&::-webkit-scrollbar": {
            width: "10px",
            backgroundColor: "none",
            borderRadius: "2em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "lightgray",
            cursor: "pointer",
            color: "white",
            borderRadius: "2em",
          },
        }}
      >
        {
          chats.map((elem, index) => {
            elem = JSON.parse(elem);
            return (
              <List>
                <ListItem>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0.2em",
                    }}
                  >
                    <Avatar alt="Remy Sharp" src={API.GET_USER_PROFILE(elem?.userId)} />
                  </Grid>
                  <Box
                    sx={{
                      backgroundColor: "#441c41",
                      maxWidth: "60%",
                      padding: "0.5rem",
                      borderRadius: "0.5rem",
                      wordBreak: "break-word",
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography >
                          <strong
                            style={{
                               
                              fontWeight: "700",
                              fontSize: "1.3em",
                            }}
                          >
                            {elem.name}
                          </strong>
                          <br/>
                          {elem.message}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </ListItem>
              </List>
            )
          })
        }
      </Box>
      <CommentBox sendMessage={sendMessage} />
    </>
  );
}
