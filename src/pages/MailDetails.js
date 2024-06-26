import React from "react";
import { Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom";

const MailDetails = (props) => {
  
    const location = useLocation();
  const history = useHistory();
  console.log(location.state)
  const { to, from, subject, body, type } = location.state;
    return<>
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <Button
        variant="secondary"
        onClick={() => {
          history.replace("/inbox");
        }}
        style={{ marginBottom: "20px" }}
      >
        Back
      </Button>
      <div style={{ backgroundColor: "white", padding: "20px" }}>
        {type === "received" && <p style={{color: "black"}}>From: {from}</p>}
        {type === "sent" && <p style={{color: "black"}}>To: {to}</p>}
        <p style={{ fontWeight: "bold" , color: "black"}}>Subject: {subject}</p>
        <p style={{ whiteSpace: "pre-wrap" , color: "black"}}>{body}</p>
      </div>
    </div>
    </>
};
export default MailDetails;