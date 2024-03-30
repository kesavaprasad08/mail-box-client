import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../redux/mail";
import { Badge, Table, Button, Tabs, Tab } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import useFetch from "../hooks/use-fetch";

const InboxPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const receivedMails = useSelector((state) => state.mail.receivedMails);
  const sentMails = useSelector((state) => state.mail.sentMails);
  const history = useHistory();
  let [changes, setChanges] = useState(false);

  const [readMessagesCount, setReadMessagesCount] = useState(0);
  let unreadMessagesCount = receivedMails.length - readMessagesCount;
  if (unreadMessagesCount < 0) {
    unreadMessagesCount = 0;
  }
  setTimeout(() => {
    setChanges(!changes);
  }, 2000);

  const [receivedMailData] = useFetch(
    `https://mail-box-client-3bc7d-default-rtdb.firebaseio.com//${email.replace(
      /[.@]/g,
      ""
    )}/receivedMails.json`,
    changes
  );

  const [sentMailData] = useFetch(
    `https://mail-box-client-3bc7d-default-rtdb.firebaseio.com//${email.replace(
      /[.@]/g,
      ""
    )}/sentMails.json`
  );

  useEffect(() => {
    let receivedMessages = [];
    for (const key in receivedMailData) {
      const mail = {
        id: key,
        ...receivedMailData[key],
      };
      receivedMessages.push(mail);
    }
    dispatch(mailActions.addReceivedMails(receivedMessages));
    const readMails = receivedMessages.filter((email) => email.isRead);
    setReadMessagesCount(readMails.length);

    let sentMessages = [];
    for (const key in sentMailData) {
      const mail = {
        id: key,
        ...sentMailData[key],
      };
      sentMessages.push(mail);
    }
    dispatch(mailActions.addSentMails(sentMessages));
  }, [receivedMailData, sentMailData, dispatch]);

  const receivedMailClickHandler = async (id) => {
    const fullMail = receivedMails.find((mail) => mail.id === id);
    try {
      await axios.put(
        `https://mail-box-client-3bc7d-default-rtdb.firebaseio.com//${email.replace(
          /[.@]/g,
          ""
        )}/receivedMails/${id}/isRead.json`,
        true
      );
      dispatch(mailActions.markMailAsRead(id));

      history.push({
        pathname: `/mail/${id}`,
        state: {
          
          from: fullMail.email,
          subject: fullMail.subject,
          body: fullMail.body,
          type: "received",
        },
      });
    } catch (e) {
      alert(e);
    }
  };
  const deleteMailHandler = async (id) => {
    try {
      await axios.delete(
        `https://mail-box-client-3bc7d-default-rtdb.firebaseio.com//${email.replace(
          /[.@]/g,
          ""
        )}/receivedMails/${id}.json`
      );
      dispatch(mailActions.deleteReceivedMail(id));
      console.log("deleted");
    } catch (error) {
      alert(error);
    }
  };

  const handleMailClick = (id) => {
    const fullMail = sentMails.find((mail) => mail.id === id);
    history.push({
      pathname: `/mail/${id}`,
      state: {
        from: fullMail.email,
        subject: fullMail.subject,
        body: fullMail.body,
        type: "received",
      },
    });
  };
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(
        `https://mail-box-client-3bc7d-default-rtdb.firebaseio.com//${email.replace(
          /[.@]/g,
          ""
        )}/sentMails/${id}.json`
      );
      dispatch(mailActions.deleteSentMail(id));
      console.log("deleted");
    } catch (error) {
      alert(error);
    }
  };
  //
  return (
    <Tabs defaultActiveKey="received" id="inbox-tabs">
      <Tab eventKey="received" title="Received">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6>
            Received Mails <Badge> {unreadMessagesCount} unread</Badge>
          </h6>
          <div>
            <Badge variant="secondary" className="mr-2"></Badge>
          </div>
        </div>
        {receivedMails.length === 0 ? (
          <p style={{ padding: "1rem" }}>No new Mails</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>From</th>
                <th>Subject</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {receivedMails.map((mail) => (
                <tr
                  key={mail.id}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <td
                    onClick={() => {
                      receivedMailClickHandler(mail.id);
                    }}
                  >
                    {!mail.isRead && <Badge bg="primary">.</Badge>}
                  </td>
                  <td
                    onClick={() => {
                      receivedMailClickHandler(mail.id);
                    }}
                  >
                    {mail.email}
                  </td>
                  <td
                    onClick={() => {
                      receivedMailClickHandler(mail.id);
                    }}
                  >
                    {mail.subject}
                  </td>
                  <td
                    onClick={() => {
                      receivedMailClickHandler(mail.id);
                    }}
                  >
                    {mail.body}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteMailHandler(mail.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Tab>
      <Tab eventKey="sent" title="Sent">
        {sentMails.length === 0 ? (
          <p style={{ padding: "1rem" }}>No New Mails</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>To</th>
                <th>Subject</th>
                <th>Body</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {sentMails.map((mail) => (
                <tr
                  key={mail.id}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <td onClick={() => handleMailClick(mail.id)}>{mail.to}</td>
                  <td onClick={() => handleMailClick(mail.id)}>
                    {mail.subject}
                  </td>
                  <td onClick={() => handleMailClick(mail.id)}>{mail.body}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(mail.id)}
                    >
                      Delete Mail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Tab>
    </Tabs>
  );
};

export default InboxPage;
