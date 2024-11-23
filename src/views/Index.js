// Import dependencies
import { useNavigate } from "react-router-dom"; // Import for navigation (React Router v6)
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header.js"; // Header component

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
                background: "linear-gradient(90deg, rgba(255, 105, 180, 0.9), rgba(138, 43, 226, 0.9))", // Slightly darker gradient
                borderRadius: "10px",
                color: "#fff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardHeader
                className="border-0 text-center"
                style={{
                  background: "rgba(0, 0, 0, 0.2)", // Semi-transparent background for contrast
                  borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "8px",
                }}
              >
                <h3
                  className="mb-0"
                  style={{
                    fontWeight: "bold",
                    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)", // Shadow for readability
                  }}
                >
                  Past Activity Info
                </h3>
              </CardHeader>
              <Table
                className="align-items-center"
                responsive
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark transparent table background
                  borderRadius: "5px",
                  color: "#fff",
                }}
              >
                <thead
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent header
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
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
                          background: "linear-gradient(90deg, #FF69B4, #8A2BE2)", // Gradient for button
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          fontWeight: "bold",
                          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)", // Text shadow
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.background =
                            "linear-gradient(90deg, #8A2BE2, #FF69B4)") // Reverse gradient on hover
                        }
                        onMouseOut={(e) =>
                          (e.target.style.background =
                            "linear-gradient(90deg, #FF69B4, #8A2BE2)")
                        }
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
                          background: "linear-gradient(90deg, #FF69B4, #8A2BE2)", // Gradient for button
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          fontWeight: "bold",
                          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)", // Text shadow
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.background =
                            "linear-gradient(90deg, #8A2BE2, #FF69B4)") // Reverse gradient on hover
                        }
                        onMouseOut={(e) =>
                          (e.target.style.background =
                            "linear-gradient(90deg, #FF69B4, #8A2BE2)")
                        }
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

