// import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation (React Router v6)
// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const Index = (props) => {
  const navigate = useNavigate(); // Hook to handle navigation

  // Function to handle redirection
  const redirectToTablePage = () => {
    navigate("/admin/chats"); // Replace with the route for the table page
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 d-flex justify-content-center" fluid>
        <Row style={{ width: "100%" }}>
          <Col xl="12">
            <Card
              className="shadow"
              style={{
                marginTop: "2in",
                padding: "20px",
                width: "95%",
                marginLeft: "auto",
                marginRight: "auto",
                background: "#FF69B4", // Hot pink background
                borderRadius: "10px",
                color: "#FFFFFF", // White text for good contrast
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
              }}
            >
              <CardHeader
                className="border-0 text-center"
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF", // White text color for "Past Activity Info"
                }}
              >
                <h3
                  className="mb-0"
                  style={{
                    fontWeight: "bold",
                    color: "#FFFFFF", // Ensure text is white
                  }}
                >
                  Past Activity Info
                </h3>
              </CardHeader>
              <Table
                className="align-items-center table-flush"
                responsive
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  textAlign: "center",
                  background: "transparent", // Transparent table
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
                    <th scope="col" style={{ color: "#FFFFFF" }}>
                      Event
                    </th>
                    <th scope="col" style={{ color: "#FFFFFF" }}>
                      Date
                    </th>
                    <th scope="col" style={{ color: "#FFFFFF" }}>
                      Participants
                    </th>
                    <th scope="col" style={{ color: "#FFFFFF" }}>
                      Connect
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "#FFFFFF" }}>Cooking Event</td>
                    <td style={{ color: "#FFFFFF" }}>10/05/2024 6:00 PM</td>
                    <td style={{ color: "#FFFFFF" }}>Star Lopez</td>
                    <td>
                      <Button
                        style={{
                          background: "linear-gradient(90deg, #FF69B4, #6C63FF)", // Gradient with pink and purple
                          color: "#FFFFFF",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          fontWeight: "bold",
                        }}
                        onClick={redirectToTablePage} // Redirect on click
                      >
                        Message with Star
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ color: "#FFFFFF" }}>Biking</td>
                    <td style={{ color: "#FFFFFF" }}>11/21/2024 8:00 AM</td>
                    <td style={{ color: "#FFFFFF" }}>John Tyler</td>
                    <td>
                      <Button
                        style={{
                          background: "linear-gradient(90deg, #FF69B4, #6C63FF)", // Gradient with pink and purple
                          color: "#FFFFFF",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          fontWeight: "bold",
                        }}
                        onClick={redirectToTablePage} // Redirect on click
                      >
                        Message with John
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
