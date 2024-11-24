import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Card,
  CardBody,
  Form,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getAuth } from "firebase/auth"; 



const Tables = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const auth = getAuth();
  const currentUserUid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsCollection = collection(db, "users");
        const q = query(contactsCollection);
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const contacts = snapshot.docs
            .map((doc) => ({
              id: doc.id,
              uid: doc.id,
              ...doc.data(),
            }))
            .filter((contact) => contact.uid !== currentUserUid); 

          setFilteredContacts(contacts);

          if (!selectedChat && contacts.length > 0) {
            setSelectedChat(contacts[0]);
          }
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      }
    };

    fetchContacts();
  }, [currentUserUid, selectedChat]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = filteredContacts.filter((contact) =>
      contact.name.toLowerCase().includes(value)
    );
    setFilteredContacts(filtered);
  };

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
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search..."
                  style={{
                    marginBottom: "15px",
                    borderRadius: "20px",
                    padding: "10px 15px",
                  }}
                />
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.uid}
                    className={`d-flex align-items-center p-2 mb-2 ${
                      selectedChat?.uid === contact.uid ? "bg-light" : ""
                    }`}
                    style={{ cursor: "pointer", borderRadius: "10px" }}
                    onClick={() => setSelectedChat(contact)}
                  >
                    <img
                      src={contact.avatar || "default-avatar.jpg"}
                      alt={contact.name}
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
                {selectedChat && (
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "10px" }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={selectedChat.avatar || "default-avatar.jpg"}
                        alt={selectedChat.name}
                        className="rounded-circle"
                        style={{ width: "50px", height: "50px", marginRight: "10px" }}
                      />
                      <div>
                        <h5 className="mb-0">{selectedChat.name}</h5>
                        <small
                          className={
                            selectedChat.status === "online" ? "text-success" : "text-muted"
                          }
                        >
                          {selectedChat.status === "online" ? "Online" : "Offline"}
                        </small>
                      </div>
                    </div>
                  </div>
                )}

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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Tables;

