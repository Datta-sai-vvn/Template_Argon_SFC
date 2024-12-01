// Import dependencies
import React, { useState, useEffect } from "react";
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
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Firebase Firestore imports
import Header from "components/Headers/Header.js"; // Header component

const Index = () => {
  const [pastActivities, setPastActivities] = useState([]); // State to store past activities
  const navigate = useNavigate(); // Hook to handle navigation
  const db = getFirestore(); // Firestore instance
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore on component mount
  useEffect(() => {
    const fetchPastActivities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "connections"));
        const activities = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Fetched data: ", data);  // Log the fetched data for inspection
          data.connectedUsers.forEach((user) => {
            activities.push({
              event: data.event,
              dateTime: user.dateTime,
              name: user.name,
              age: user.age,
              gender: user.gender,
              interestLevel: user.interestLevel,
              uid: user.userId,
            });
          });
        });
        setPastActivities(activities);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching past activities:", error);
        setLoading(false);
      }
    };
    fetchPastActivities();
  }, [db]);
  

  // Function to handle redirection
  const redirectToTablePage = (participantName, uid) => {
    if (uid) {
      console.log(`Redirecting to chat with ${participantName}, UID: ${uid}`);
      navigate(`/admin/chats/${uid}`);
    } else {
      console.error(`Error: ${participantName} does not have a valid UID.`);
    }
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
                background:
                  "linear-gradient(90deg, rgba(255, 105, 180, 0.9), rgba(138, 43, 226, 0.9))", // Slightly darker gradient
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
                    color: "#fff", // Ensures text is white
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
                    <th scope="col">Gender</th>
                    <th scope="col">Age</th>
                    <th scope="col">Interest Level</th>
                    <th scope="col">Connect</th>
                  </tr>
                </thead>
                <tbody>
                  {pastActivities.map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.event}</td>
                      <td>{new Date(activity.dateTime).toLocaleString()}</td>
                      <td>{activity.name}</td>
                      <td>{activity.gender}</td>
                      <td>{activity.age}</td>
                      <td>{activity.interestLevel}</td>
                      <td>
                        <Button
                          style={{
                            background:
                              "linear-gradient(90deg, #FF69B4, #8A2BE2)", // Gradient for button
                            color: "#fff",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            fontWeight: "bold",
                            textShadow:
                              "1px 1px 2px rgba(0, 0, 0, 0.6)", // Text shadow
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
                          onClick={() => redirectToTablePage(activity.name, activity.uid)} // Redirect on click
                        >
                          Message with {activity.name}
                        </Button>
                      </td>
                    </tr>
                  ))}
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
