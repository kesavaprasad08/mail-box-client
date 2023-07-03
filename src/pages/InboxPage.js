import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../redux/mail";
import { Badge, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const InboxPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const receivedMails = useSelector((state) => state.mail.receivedMails);
  const history = useHistory();

  const [readMessagesCount, setReadMessagesCount] = useState(0);
  let unreadMessagesCount = receivedMails.length - readMessagesCount;
  if (unreadMessagesCount < 0) {
    unreadMessagesCount = 0;
  }

  useEffect(() => {
    const getData = async () => {
      try {
        await axios
          .get(
            `https://mail-box-client-3bc7d-default-rtdb.firebaseio.com//${email.replace(
              /[.@]/g,
              ""
            )}/receivedMails.json`
          )
          .then((res) => {
            let receivedMails = [];
            if (res.data) {
              for (const key in res.data) {
                const mail = {
                  id: key,
                  ...res.data[key],
                };
                receivedMails.push(mail);
              }
              dispatch(mailActions.addReceivedMails(receivedMails));
              const readMails = receivedMails.filter((email) => email.isRead);
              setReadMessagesCount(readMails.length);
            }
          });
      } catch (error) {
        alert(error);
      }
      try {
        await axios
          .get(
            `https://mail-box-client-3bc7d-default-rtdb.firebaseio.com//${email.replace(
              /[.@]/g,
              ""
            )}/sentMails.json`
          )
          .then((res) => {
            let sentMails = [];
            if (res.data) {
              for (const key in res.data) {
                const mail = {
                  id: key,
                  ...res.data[key],
                };
                sentMails.push(mail);
              }
              dispatch(mailActions.addSentMails(sentMails));
            }
          });
      } catch (error) {
        alert(error);
      }
    };
    getData();
  }, [dispatch, email]);

  const receivedMailClickHandler = async (id) => {
    const fullMail = receivedMails.find((mail) => mail.id === id);
    console.log(fullMail);
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

  return (
    <>
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
    </>
  );
};

export default InboxPage;
