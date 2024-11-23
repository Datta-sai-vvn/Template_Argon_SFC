import React, { useState } from "react";
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

const chatContacts = [
  { id: 1, name: "Maryam Naz", status: "online", avatar: "path/to/avatar1.jpg" },
  { id: 2, name: "Sahar Darya", status: "offline", avatar: "path/to/avatar2.jpg" },
  { id: 3, name: "Yolduz Rafi", status: "online", avatar: "path/to/avatar3.jpg" },
  { id: 4, name: "Nargis Hawa", status: "offline", avatar: "path/to/avatar4.jpg" },
];

const ChatPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filteredContacts, setFilteredContacts] = useState(chatContacts); // State for filtered contacts
  const [selectedChat, setSelectedChat] = useState(chatContacts[0]); // Default selected chat
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, how are you?", sender: "other" },
    { id: 2, text: "I'm good, how about you?", sender: "self" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Function to handle searching
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = chatContacts.filter((contact) =>
      contact.name.toLowerCase().includes(value)
    );
    setFilteredContacts(filtered);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "self" }]);
      setNewMessage("");
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          {/* Sidebar */}
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
                    key={contact.id}
                    className={`d-flex align-items-center p-2 mb-2 ${
                      selectedChat.id === contact.id ? "bg-light" : ""
                    }`}
                    style={{ cursor: "pointer", borderRadius: "10px" }}
                    onClick={() => setSelectedChat(contact)}
                  >
                    <img
                      src={contact.avatar}
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

          {/* Chat Section */}
          <Col lg="8" md="8" sm="12" className="p-0">
            <Card className="shadow">
              <CardBody style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                {/* Chat Header */}
                <div
                  className="d-flex align-items-center justify-content-between"
                  style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "10px" }}
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
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
                  <div>
                    <Button color="info" size="sm" className="mr-2">
                      <i className="ni ni-camera-compact" />
                    </Button>
                    <Button color="primary" size="sm">
                      <i className="ni ni-chat-round" />
                    </Button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`d-flex ${
                        message.sender === "self" ? "justify-content-end" : "justify-content-start"
                      } mb-3`}
                    >
                      <div
                        style={{
                          maxWidth: "70%",
                          padding: "10px 15px",
                          borderRadius: "20px",
                          backgroundColor: message.sender === "self" ? "#00bfff" : "#f1f1f1",
                          color: message.sender === "self" ? "#fff" : "#000",
                        }}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
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

export default ChatPage;
