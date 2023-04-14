import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import MessageIcon from "@mui/icons-material/Message";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import "./MessageNode.scss";

export default function MessageNode(props) {
  return (
    <Card className="message-node">
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#7986CB", width: 32, height: 32 }}
            aria-label="message node"
          >
            <MessageIcon sx={{ width: 16, height: 16 }} />
          </Avatar>
        }
        title="Message Example"
      ></CardHeader>
      <CardContent className="message-example-content">
        <Card className="message-node-card">
          <Collapse in={props.headerEnabled} timeout="auto" unmountOnExit>
            <CardMedia
              image={props.headerImage}
              className="message-node-header"
            >
              <div className="section-label for-header">Header</div>
            </CardMedia>
            <hr className="dotted-green" />
          </Collapse>
          <CardContent className="message-node-content">
            <div>
              <div className="section-label">Body message</div>
              <p className="message-node-text">{props.bodyMessage}</p>
            </div>
            <Collapse in={props.footerEnabled} timeout="auto" unmountOnExit>
              <hr className="dotted-green" />
              <div>
                <div className="section-label">Footer</div>
                <p className="footer message-node-text">{props.footer}</p>
              </div>
            </Collapse>
          </CardContent>
        </Card>
        <Collapse in={props.buttonsEnabled} timeout="auto" unmountOnExit>
          <div className="option-buttons">
            <Collapse
              in={props.firstOptionButton.trim().length > 0}
              timeout="auto"
              unmountOnExit
            >
              <Button variant="contained" className="option-button">
                {props.firstOptionButton}
              </Button>
            </Collapse>
            <Collapse
              in={props.secondOptionButton.trim().length > 0}
              timeout="auto"
              unmountOnExit
            >
              <Button variant="contained" className="option-button">
                {props.secondOptionButton}
              </Button>
            </Collapse>
            <Collapse
              in={props.thirdOptionButton.trim().length > 0}
              timeout="auto"
              unmountOnExit
            >
              <Button variant="contained" className="option-button">
                {props.thirdOptionButton}
              </Button>
            </Collapse>
          </div>
        </Collapse>
      </CardContent>
    </Card>
  );
}
