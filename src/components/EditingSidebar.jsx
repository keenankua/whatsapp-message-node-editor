import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ImageIcon from "@mui/icons-material/Image";
import ErrorIcon from "@mui/icons-material/Error";
import Switch from "@mui/material/Switch";
import HighlightIcon from "@mui/icons-material/Highlight";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import CodeIcon from "@mui/icons-material/Code";
import Crop169Icon from "@mui/icons-material/Crop169";
import Collapse from "@mui/material/Collapse";
import InputLabel from "@mui/material/InputLabel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./EditingSidebar.scss";

const CloseButton = (props) => {
  return (
    <IconButton
      className={`close-button ${props.noPadding && "no-padding"}`}
      onClick={props.onClick}
    >
      <CloseIcon />
    </IconButton>
  );
};

const SectionHeader = (props) => {
  const Icon = props.icon;
  const label = { inputProps: { "aria-label": "enable " + props.title } };
  return (
    <header className="section-header">
      <div className="left-wrapper">
        <Icon className="icon" />
        <h4 className="title">{props.title}</h4>
        <ErrorIcon className="error-icon" />
        {props.required && <div className="required-label">Required</div>}
      </div>
      {props.toggleSwitch && (
        <Switch
          {...label}
          checked={props.toggleProp}
          onChange={(event) => {
            props.setToggleProp(!props.toggleProp);
          }}
        />
      )}
    </header>
  );
};

const TipCard = (props) => {
  return (
    <Card className="tip-card">
      <header className="tip-card-header">
        <div className="left-wrapper">
          <HighlightIcon className="highlight-icon" />
          <span className="title">{props.title}</span>
        </div>
        <CloseButton
          noPadding
          onClick={() => {
            props.handleClose(false);
          }}
        />
      </header>
      <CardContent className="tip-card-content">
        <p className="tip-body">{props.body}</p>
        <Button className="learn-more-button">Learn More</Button>
      </CardContent>
    </Card>
  );
};

export default function EditingSidebar(props) {
  const HEADER_TYPES = {
    IMAGE: "image",
  };
  const MAX_BODY_LENGTH = 1024;
  const MAX_BUTTON_TEXT_LENGTH = 25;

  const [headerType, setHeaderType] = React.useState(HEADER_TYPES.IMAGE);
  const [bodyMessageTipShowing, setBodyMessageTipShowing] =
    React.useState(true);
  const [headerTipShowing, setHeaderTipShowing] = React.useState(true);

  const handleHeaderTypeChange = (e) => {
    setHeaderType(e.target.value);
  };

  const handleFileInput = (e) => {
    props.setHeaderImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Card className="editing-sidebar">
      <header className="editing-sidebar-header">
        <h2 className="title">Edit Message</h2>
        <CloseButton />
      </header>
      <CardContent className="editing-sidebar-sections">
        <div>
          <h3 className="content-header">Content</h3>
          <Card className="card-section" variant="outlined">
            <SectionHeader
              title="Header"
              icon={ImageIcon}
              toggleSwitch
              toggleProp={props.headerEnabled}
              setToggleProp={props.setHeaderEnabled}
            />
            <Collapse in={props.headerEnabled} timeout="auto" unmountOnExit>
              <CardContent className="card-content header-content">
                <Select
                  value={headerType}
                  onChange={handleHeaderTypeChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Header type" }}
                  className="header-type-select"
                >
                  <MenuItem value={HEADER_TYPES.IMAGE}>Image</MenuItem>
                </Select>
                <p className="image-size-rec">
                  Image size recommendation: 800 x 418 pixel.
                </p>
                <Button
                  variant="outlined"
                  className="upload-image-button"
                  component="label"
                >
                  Upload Image
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                </Button>
                <Collapse in={headerTipShowing} timeout="auto" unmountOnExit>
                  <TipCard
                    title="Image header tips"
                    body="Images can enrich the message experience and help maintain engagement.
          Use eye-catching images that summarize the message (eg discounts,
          gifts etc.)"
                    handleClose={setHeaderTipShowing}
                  />
                </Collapse>
              </CardContent>
            </Collapse>
          </Card>
        </div>
        <Card className="card-section" variant="outlined">
          <SectionHeader title="Body message" icon={TextFieldsIcon} required />
          <CardContent className="card-content body-message-content">
            <div className="multiline-text-input-wrapper">
              <TextField
                multiline
                rows={10}
                value={props.bodyMessage}
                inputProps={{ maxLength: MAX_BODY_LENGTH }}
                onChange={(e) => {
                  props.setBodyMessage(e.target.value);
                }}
                className="multiline-text-input"
              />
              <span className="character-count">
                {props.bodyMessage.length + "/" + MAX_BODY_LENGTH}
              </span>
            </div>
            <div className="body-message-buttons">
              <Button variant="text">Add Variable</Button>
              <div className="text-formatting-buttons">
                <IconButton>
                  <EmojiEmotionsIcon className="text-formatting-icon" />
                </IconButton>
                <IconButton>
                  <FormatBoldIcon className="text-formatting-icon" />
                </IconButton>
                <IconButton>
                  <FormatClearIcon className="text-formatting-icon" />
                </IconButton>
                <IconButton>
                  <FormatItalicIcon className="text-formatting-icon" />
                </IconButton>
                <IconButton>
                  <CodeIcon className="text-formatting-icon" />
                </IconButton>
              </div>
            </div>
            <Collapse in={bodyMessageTipShowing} timeout="auto" unmountOnExit>
              <TipCard
                title="What are variables?"
                body="Variables are dynamic content that help personalize your campaign, for example: customer names or coupon codes."
                handleClose={setBodyMessageTipShowing}
              />
            </Collapse>
          </CardContent>
        </Card>
        <Card className="card-section" variant="outlined">
          <SectionHeader
            title="Footer text"
            icon={TextFieldsIcon}
            toggleSwitch
            toggleProp={props.footerEnabled}
            setToggleProp={props.setFooterEnabled}
          />
          <Collapse in={props.footerEnabled} timeout="auto" unmountOnExit>
            <CardContent className="card-content">
              <div className="multiline-text-input-wrapper">
                <TextField
                  multiline
                  rows={10}
                  value={props.footer}
                  inputProps={{ maxLength: MAX_BODY_LENGTH }}
                  onChange={(e) => {
                    props.setFooter(e.target.value);
                  }}
                  className="multiline-text-input"
                />
                <span className="character-count">
                  {props.footer.length + "/" + MAX_BODY_LENGTH}
                </span>
              </div>
            </CardContent>
          </Collapse>
        </Card>
        <Card className="card-section" variant="outlined">
          <SectionHeader
            title="Buttons"
            icon={Crop169Icon}
            toggleSwitch
            toggleProp={props.buttonsEnabled}
            setToggleProp={props.setButtonsEnabled}
          />
          <Collapse in={props.buttonsEnabled} timeout="auto" unmountOnExit>
            <CardContent className="card-content">
              <div className="text-input-wrapper">
                <InputLabel
                  htmlFor="first-option-button-input"
                  className="option-button-label"
                >
                  <span>Button 1</span>
                  <IconButton
                    className="delete-button"
                    onClick={() => {
                      props.setFirstOptionButton("");
                    }}
                  >
                    <DeleteOutlineIcon className="delete-icon" />
                  </IconButton>
                </InputLabel>
                <TextField
                  id="first-option-button-input"
                  value={props.firstOptionButton}
                  inputProps={{ maxLength: MAX_BUTTON_TEXT_LENGTH }}
                  onChange={(e) => {
                    props.setFirstOptionButton(e.target.value);
                  }}
                  className="option-button-input"
                />
                <span className="character-count">
                  {props.firstOptionButton.length +
                    "/" +
                    MAX_BUTTON_TEXT_LENGTH}
                </span>
              </div>
              <div className="text-input-wrapper">
                <InputLabel
                  htmlFor="second-option-button-input"
                  className="option-button-label"
                >
                  <span>Button 2</span>
                  <IconButton
                    className="delete-button"
                    onClick={() => {
                      props.setSecondOptionButton("");
                    }}
                  >
                    <DeleteOutlineIcon className="delete-icon" />
                  </IconButton>
                </InputLabel>
                <TextField
                  id="second-option-button-input"
                  value={props.secondOptionButton}
                  inputProps={{ maxLength: MAX_BUTTON_TEXT_LENGTH }}
                  onChange={(e) => {
                    props.setSecondOptionButton(e.target.value);
                  }}
                  className="option-button-input"
                />
                <span className="character-count">
                  {props.secondOptionButton.length +
                    "/" +
                    MAX_BUTTON_TEXT_LENGTH}
                </span>
              </div>
              <div className="text-input-wrapper">
                <InputLabel
                  htmlFor="third-option-button-input"
                  className="option-button-label"
                >
                  <span>Button 3</span>
                  <IconButton
                    className="delete-button"
                    onClick={() => {
                      props.setThirdOptionButton("");
                    }}
                  >
                    <DeleteOutlineIcon className="delete-icon" />
                  </IconButton>
                </InputLabel>
                <TextField
                  id="third-option-button-input"
                  value={props.thirdOptionButton}
                  inputProps={{ maxLength: MAX_BUTTON_TEXT_LENGTH }}
                  onChange={(e) => {
                    props.setThirdOptionButton(e.target.value);
                  }}
                  className="option-button-input"
                />
                <span className="character-count">
                  {props.thirdOptionButton.length +
                    "/" +
                    MAX_BUTTON_TEXT_LENGTH}
                </span>
              </div>
            </CardContent>
          </Collapse>
        </Card>
        <div className="finalize-buttons">
          <Button variant="contained" className="finalize-button">
            Save
          </Button>
          <Button variant="outlined" className="finalize-button">
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
