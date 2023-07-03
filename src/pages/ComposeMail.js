import { useState } from "react";
import { useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "axios";

const ComposeEmail = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const  email  = useSelector((state) => state.auth.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = convertToRaw(editorState.getCurrentContent());
    const body = JSON.stringify(content);
    console.log("email = ", email);
    axios
      .post(
        `https://mail-box-client-3bc7d-default-rtdb.firebaseio.com//${email.replace(
          /[.@]/g,
          ""
        )}/sentMails.json`,
        {
          to,
          subject,
          body,
          email,
        }
      )
      .then(() => {
        alert("Success");
      })
      .catch((err) => {
        alert("error");
      });
      axios
      .post(
        `https://mail-box-client-3bc7d-default-rtdb.firebaseio.com//${to.replace(
          /[.@]/g,
          ""
        )}/receivedMails.json`,
        {
          to,
          subject,
          body,
          email,
        }
      )
      .then(() => {
        alert("Success");
      })
      .catch((err) => {
        alert("error");
      });


    setTo("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
    console.log(body);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Compose Email</h2>
        <a href="/welcome">
          <Button>Back to homepage</Button>
        </a>
      </div>
      <Form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
        <Form.Group controlId="to">
          <Form.Label>To:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="body">
          <Row>
            <Col>
              <Form.Label>Body:</Form.Label>
            </Col>
            <Col xs={12}>
              <Editor
                editorState={editorState}
                onEditorStateChange={(state) => setEditorState(state)}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "embedded",
                  ],
                  inline: {
                    options: [
                      "bold",
                      "italic",
                      "underline",
                      "strikethrough",
                      "monospace",
                      "superscript",
                      "subscript",
                    ],
                  },
                  blockType: {
                    options: [
                      "Normal",
                      "H1",
                      "H2",
                      "H3",
                      "H4",
                      "H5",
                      "H6",
                      "Blockquote",
                      "Code",
                    ],
                  },
                  textAlign: {
                    options: ["left", "center", "right", "justify"],
                  },
                  link: {
                    defaultTargetOption: "_blank",
                    showOpenOptionOnHover: true,
                  },
                }}
              />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default ComposeEmail;
