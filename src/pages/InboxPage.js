import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import  { mailActions } from "../redux/mail";
import { Badge, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const InboxPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const receivedMails = useSelector((state) => state.mail.receivedMails);
  const history = useHistory();

  const [readMessagesCount,setReadMessagesCount] = useState(0);
  const unreadMessagesCount =  receivedMails.length - readMessagesCount;
  

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
              const readMails = receivedMails.filter((email) =>email.isRead);
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

  const receivedMailClickHandler = async(id) => {
    const fullMail = receivedMails.find((mail)=> mail.id === id);
    console.log(fullMail)
    try{
    await axios.put(`https://mail-box-client-3bc7d-default-rtdb.firebaseio.com//${email.replace(
        /[.@]/g,
        ""
      )}/receivedMails/${id}/isRead.json`,
      true)
dispatch(mailActions.markMailAsRead(id))
  
  history.push({
    pathname:`/mail/${id}`,
    state: {
        from: fullMail.email,
        subject: fullMail.subject,
        body: fullMail.body,
        type: "received",
      },
    });
}
  catch(e){
    alert(e);
  }
}

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6>Received Mails <Badge> {unreadMessagesCount} unread</Badge></h6>
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
              onClick={() =>{
                receivedMailClickHandler(mail.id)}
            }
                key={mail.id}
                style={{
                  cursor: "pointer",
                }}
              >
                <td>
                    {!mail.isRead &&<Badge bg="primary">.</Badge>}
                  </td>
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
