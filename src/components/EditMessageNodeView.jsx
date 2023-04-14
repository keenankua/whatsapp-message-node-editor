import React from "react";
import EditingSidebar from "./EditingSidebar.jsx";
import MessageNode from "./MessageNode.jsx";
import "./EditMessageNodeView.scss";

export default function EditMessageNodeView() {
  const [headerEnabled, setHeaderEnabled] = React.useState(true);
  const [headerImage, setHeaderImage] = React.useState(null);
  const [bodyMessage, setBodyMessage] = React.useState(
    "Your body message goes here"
  );
  const [footerEnabled, setFooterEnabled] = React.useState(false);
  const [footer, setFooter] = React.useState("Your footer goes here");
  const [buttonsEnabled, setButtonsEnabled] = React.useState(false);
  const [firstOptionButton, setFirstOptionButton] =
    React.useState("First option");
  const [secondOptionButton, setSecondOptionButton] =
    React.useState("Second option");
  const [thirdOptionButton, setThirdOptionButton] =
    React.useState("Third option");

  return (
    <div className="edit-message-node-view">
      <EditingSidebar
        className="editing-sidebar"
        headerEnabled={headerEnabled}
        setHeaderEnabled={setHeaderEnabled}
        setHeaderImage={setHeaderImage}
        bodyMessage={bodyMessage}
        setBodyMessage={setBodyMessage}
        footer={footer}
        setFooter={setFooter}
        footerEnabled={footerEnabled}
        setFooterEnabled={setFooterEnabled}
        buttonsEnabled={buttonsEnabled}
        setButtonsEnabled={setButtonsEnabled}
        firstOptionButton={firstOptionButton}
        setFirstOptionButton={setFirstOptionButton}
        secondOptionButton={secondOptionButton}
        setSecondOptionButton={setSecondOptionButton}
        thirdOptionButton={thirdOptionButton}
        setThirdOptionButton={setThirdOptionButton}
      />
      <div className="message-node-preview">
        <MessageNode
          className="message-node"
          headerEnabled={headerEnabled}
          headerImage={headerImage}
          bodyMessage={bodyMessage}
          footerEnabled={footerEnabled}
          footer={footer}
          buttonsEnabled={buttonsEnabled}
          firstOptionButton={firstOptionButton}
          secondOptionButton={secondOptionButton}
          thirdOptionButton={thirdOptionButton}
        />
      </div>
    </div>
  );
}
