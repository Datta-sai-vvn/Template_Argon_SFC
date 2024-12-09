import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Form,
  Input,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { collection, addDoc, query, orderBy, onSnapshot, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";

const Tables = () => {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { uid } = useParams(); // Get the uid from the route
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUserUid = auth.currentUser?.uid;

  const selectedChat = filteredContacts.find((contact) => contact.uid === uid);

  // Fetch contacts and select the first one by default
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (!currentUserUid) return;
  
        // Fetch the current user's connections
        const connectionsQuery = query(
          collection(db, "connections"),
          where("userId", "==", currentUserUid)
        );
        const snapshot = await getDocs(connectionsQuery);
  
        const connectedUserIds = new Set();
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.connectedUsers) {
            data.connectedUsers.forEach((user) => connectedUserIds.add(user.userId));
          }
        });
  
        // Fetch user data for connected users
        const contactsCollection = collection(db, "users");
        const contactsSnapshot = await getDocs(contactsCollection);
  
        const contacts = contactsSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            uid: doc.id,
            ...doc.data(),
          }))
          .filter((contact) => connectedUserIds.has(contact.uid));
  
        setFilteredContacts(contacts);
  
        // Redirect to the first contact if no uid is in the URL
        if (!uid && contacts.length > 0) {
          navigate(`/admin/chats/${contacts[0].uid}`);
        }
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      }
    };
  
    fetchContacts();
  }, [currentUserUid, uid, navigate]);
  

  // Fetch messages
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await addDoc(collection(db, "messages"), {
          text: newMessage,
          senderUid: currentUserUid,
          receiverUid: selectedChat?.uid,
          timestamp: new Date(),
        });
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col lg="4" md="4" sm="12" className="p-0" style={{ borderRight: "1px solid #ddd" }}>
            <Card className="shadow">
              <CardBody style={{ height: "100vh", overflowY: "auto", padding: "10px" }}>
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.uid}
                    className={`d-flex align-items-center p-2 mb-2 ${
                      uid === contact.uid ? "bg-light" : ""
                    }`}
                    style={{ cursor: "pointer", borderRadius: "10px" }}
                    onClick={() => navigate(`/admin/chats/${contact.uid}`)}
                  >
                    <img
                      src={require("../../assets/img/theme/profilepic.jpeg")} 
                      alt='...'
                      className="rounded-circle"
                      style={{ width: "50px", height: "50px", marginRight: "10px" }}
                    />
                    <div>
                      <h5 className="mb-0">{contact.name}</h5>
                      <small
                        className={contact.status === "online" ? "text-success" : "text-muted"}
                      >
                        {contact.status === "online" ? "Online" : "Offline"}
                      </small>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col lg="8" md="8" sm="12" className="p-0">
            <Card className="shadow">
            <CardBody style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
              {selectedChat ? (
                <>
                  {/* Selected chat header */}
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "10px" }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={require("../../assets/img/theme/profilepic.jpeg")}
                        alt="..."
                        className="rounded-circle"
                        style={{ width: "50px", height: "50px", marginRight: "10px" }}
                      />
                      <div>
                        <h5 className="mb-0">{selectedChat.name}</h5>
                        <small
                          className={selectedChat.status === "online" ? "text-success" : "text-muted"}
                        >
                          {selectedChat.status === "online" ? "Online" : "Offline"}
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
                    {messages
                      .filter(
                        (message) =>
                          (message.senderUid === currentUserUid &&
                            message.receiverUid === selectedChat?.uid) ||
                          (message.senderUid === selectedChat?.uid &&
                            message.receiverUid === currentUserUid)
                      )
                      .map((message) => (
                        <div
                          key={message.id}
                          className={`d-flex ${
                            message.senderUid === currentUserUid
                              ? "justify-content-end"
                              : "justify-content-start"
                          } mb-3`}
                        >
                          <div
                            style={{
                              maxWidth: "70%",
                              padding: "10px 15px",
                              borderRadius: "20px",
                              backgroundColor:
                                message.senderUid === currentUserUid ? "#00bfff" : "#f1f1f1",
                              color: message.senderUid === currentUserUid ? "#fff" : "#000",
                            }}
                          >
                            {message.text}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Message input */}
                  <Form
                    className="d-flex align-items-center"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                  >
                    <Input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      style={{ flex: 1, borderRadius: "20px", marginRight: "10px" }}
                    />
                    <Button color="primary" size="lg" onClick={handleSendMessage}>
                      <i className="ni ni-send" />
                    </Button>
                  </Form>
                </>
              ) : (
                // Placeholder message
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "#888",
                    textAlign: "center",
                  }}
                >
                  <h3>Welcome to Chat</h3>
                  <p>Select a contact to start chatting</p>
                </div>
              )}
            </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
