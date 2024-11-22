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
    navigate("/tables"); // Replace with the route for the table page
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 d-flex justify-content-center" fluid>
        <Row style={{ width: "100%" }}>
          <Col xl="12">
            <Card
              className="bg-default shadow"
              style={{
                marginTop: "2in",
                padding: "20px",
                width: "95%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <CardHeader className="bg-transparent border-0 text-center">
                <h3 className="text-white mb-0">Past Activity Info</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  textAlign: "center",
                }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Event</th>
                    <th scope="col">Date</th>
                    <th scope="col">Participants</th>
                    <th scope="col">Connect</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cooking Event</td>
                    <td>10/05/2024 6:00 PM</td>
                    <td>Star Lopez</td>
                    <td>
                      <Button
                        style={{
                          backgroundColor: "#6C63FF", // Custom button color
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                        }}
                        onClick={redirectToTablePage} // Redirect on click
                      >
                        Message with Star
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Biking</td>
                    <td>11/21/2024 8:00 AM</td>
                    <td>John Tyler</td>
                    <td>
                      <Button
                        style={{
                          backgroundColor: "#6C63FF", // Custom button color
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
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
