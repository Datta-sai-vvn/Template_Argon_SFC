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
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

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

  // Handle Continue Button
  const handleContinueClick = () => {
    if (!selectedEvent) {
      alert("Please select an event before continuing.");
      return;
    }

    // Redirect to Matching Profile Page with optional state or query parameters
    navigate("/admin/matching-profile", {
      state: { event: selectedEvent, interestLevel },
    });
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Choose an Event</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  {eventList.map((event, index) => (
                    <Col lg="3" md="6" className="mb-3" key={index}>
                      <Button
                        style={{
                          backgroundColor: "#00bfff", // Blue color
                          borderColor: "#00bfff",
                          color: "#fff",
                        }}
                        className={`w-100 ${selectedEvent === event ? "active" : ""}`}
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
                      border: "2px solid #00bfff",
                      borderRadius: "10px",
                      backgroundColor: "#e6f7ff",
                    }}
                  >
                    {/* Increased heading size */}
                    <h2 style={{ color: "#00bfff", fontSize: "2rem", fontWeight: "bold" }}>
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
                        height: "25px", // Increased height
                        borderRadius: "15px",
                        background: "#d0eaff",
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
                          width: 30px;
                          height: 30px;
                          background: #fff;
                          border: 2px solid #00bfff;
                          border-radius: 50%;
                          cursor: pointer;
                          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                        }
                        input[type="range"]::-moz-range-thumb {
                          width: 30px;
                          height: 30px;
                          background: #fff;
                          border: 2px solid #00bfff;
                          border-radius: 50%;
                          cursor: pointer;
                        }
                      `}
                    </style>
                    {/* Bold and larger font for interest level */}
                    <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#00bfff" }}>
                      Interest Level: {interestLevel}
                    </p>
                    {/* Bold and increased size for slider labels */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      {[...Array(10).keys()].map((i) => (
                        <span key={i} style={{ color: "#00bfff" }}>
                          {i + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Increased size of the continue button */}
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Button
                    color="info"
                    size="lg"
                    onClick={handleContinueClick}
                    disabled={!selectedEvent}
                    style={{
                      backgroundColor: "#00bfff",
                      borderColor: "#00bfff",
                      fontSize: "1.5rem",
                      padding: "15px 30px", // Increased size
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
