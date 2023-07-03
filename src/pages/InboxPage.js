import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../redux/mail";
import { Badge, Table } from "react-bootstrap";

const InboxPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const receivedMails = useSelector((state) => state.mail.receivedMails);

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

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Received Mails</h4>
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
                <td>{mail.email}</td>
                <td>{mail.subject}</td>
                <td>{mail.body}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default InboxPage;
