import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useNavigate } from "react-router-dom"; 
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; 

// Event List
const eventList = [
  "Social Service",
  "Cooking",
  "Eat Out",
  "Movies",
  "Home Party",
  "Gardening",
  "Hang Out",
  "Hiking",
  "Biking",
  "Picnic in the Park",
  "Volunteer at a Shelter",
  "Book Club Meetup",
  "Cooking Class",
  "Game Night",
  "Sports Tournament",
  "Music Concert",
  "Dance Party",
  "Art Gallery Visit",
  "Barbecue Party",
  "Trivia Night",
  "Crafting Workshop",
  "Fundraising Event",
  "Movie Marathon",
  "Road Trip Adventure",
  "Outdoor Yoga",
  "Project Ideas",
  "Photography Walk",
  "Meditation Session",
  "Comedy Show",
  "StartUp Ideas",
  "Cycling",
  "Morning Walk",
];

const Icons = () => {
  const [selectedEvent, setSelectedEvent] = useState(null); // State for the selected event
  const [interestLevel, setInterestLevel] = useState(5); // Default interest level
  const navigate = useNavigate(); // Hook to navigate to different routes

  const db = getFirestore();
  const auth = getAuth();

  // Handle Continue Button
  const handleContinueClick = async () => {
    if (!selectedEvent) {
      alert("Please select an event before continuing.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("No user is logged in.");
      return;
    }

    const uid = user.uid; 
    const userDocRef = doc(db, "users", uid); 

    try {
      await setDoc(userDocRef, {
        selectedEvent,
        interestLevel,
      }, { merge: true });

      console.log("Event and interest level saved successfully.");
      navigate("/admin/matching-profile", {
        state: { event: selectedEvent, interestLevel },
      });
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      alert("An error occurred while saving your data.");
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container
        className="mt--7"
        fluid
        style={{
          background: "linear-gradient(135deg, #FF69B4, #6C63FF)", // Gradient background
          minHeight: "100vh",
          padding: "2rem",
          borderRadius: "10px",
        }}
      >
        <Row>
          <div className="col">
            <Card
              className="shadow"
              style={{
                background: "rgba(255, 255, 255, 0.2)", // Semi-transparent card
                borderRadius: "15px",
                color: "#FFFFFF",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardHeader
                className="bg-transparent"
                style={{
                  textAlign: "center",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                Choose an Event
              </CardHeader>
              <CardBody>
                <Row>
                  {eventList.map((event, index) => (
                    <Col lg="3" md="6" className="mb-3" key={index}>
                      <Button
                        style={{
                          background:
                            selectedEvent === event
                              ? "linear-gradient(90deg, #FF69B4, #6C63FF)" // Highlight selected event
                              : "#ffffff", // White background for others
                          borderColor: selectedEvent === event ? "#FFFFFF" : "transparent",
                          color: selectedEvent === event ? "#FFFFFF" : "#6C63FF", // Text color change
                          fontWeight: "bold",
                          borderRadius: "10px",
                          padding: "15px 25px",
                          fontSize: "1rem", // Adjusted font size for readability
                          boxShadow: selectedEvent === event ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none", // Added shadow to selected button
                          transition: "all 0.3s ease", // Smooth transition
                        }}
                        className="w-100"
                        onClick={() => setSelectedEvent(event)}
                      >
                        {event}
                      </Button>
                    </Col>
                  ))}
                </Row>
                {/* Interest Slider */}
                {selectedEvent && (
                  <div
                    style={{
                      margin: "20px auto",
                      textAlign: "center",
                      padding: "20px",
                      border: "2px solid rgba(255, 255, 255, 0.5)",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <h2
                      style={{
                        color: "#FFFFFF",
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      How interested are you in {selectedEvent}?
                    </h2>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={interestLevel}
                      onChange={(e) => setInterestLevel(Number(e.target.value))}
                      style={{
                        width: "100%",
                        height: "20px",
                        borderRadius: "15px",
                        background: "linear-gradient(90deg, #FF69B4, #6C63FF)",
                        margin: "10px 0",
                        appearance: "none",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    />
                    <style>
                      {`
                        input[type="range"]::-webkit-slider-thumb {
                          -webkit-appearance: none;
                          appearance: none;
                          width: 25px;
                          height: 25px;
                          background: #FFFFFF;
                          border: 2px solid #FF69B4;
                          border-radius: 50%;
                          cursor: pointer;
                          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                        }
                        input[type="range"]::-moz-range-thumb {
                          width: 25px;
                          height: 25px;
                          background: #FFFFFF;
                          border: 2px solid #FF69B4;
                          border-radius: 50%;
                          cursor: pointer;
                        }
                      `}
                    </style>
                    <p
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                      }}
                    >
                      Interest Level: {interestLevel}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "#FFFFFF",
                      }}
                    >
                      {[...Array(10).keys()].map((i) => (
                        <span key={i}>{i + 1}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Button
                    color="info"
                    size="lg"
                    onClick={handleContinueClick}
                    disabled={!selectedEvent}
                    style={{
                      background: "linear-gradient(90deg, #FF69B4, #6C63FF)",
                      borderColor: "transparent",
                      fontSize: "1.5rem",
                      padding: "15px 30px",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Icons;
