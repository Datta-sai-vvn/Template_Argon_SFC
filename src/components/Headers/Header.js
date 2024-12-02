import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";

const Header = () => {
  const [friendCount, setFriendCount] = useState(0);

  const fetchFriendCount = async () => {
    try {
      const auth = getAuth();
      const currentUserUid = auth.currentUser?.uid;

      if (!currentUserUid) return;

      const connectionsQuery = query(
        collection(db, "connections"),
        where("userId", "==", currentUserUid)
      );

      const snapshot = await getDocs(connectionsQuery);
      let totalFriends = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.connectedUsers) {
          totalFriends += data.connectedUsers.length;
        }
      });

      setFriendCount(totalFriends);
    } catch (error) {
      console.error("Error fetching friend count:", error);
    }
  };

  useEffect(() => {
    fetchFriendCount();
  }, []);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-md-8"
        style={{
          background: "linear-gradient(90deg, #FF69B4, #8A2BE2)", // Gradient matching the logo colors
        }}
      >
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col xs="12" sm="6" lg="3" className="mb-4">
                <Card className="card-stats h-100">
                  <CardBody>
                    <Row className="align-items-center">
                      <Col>
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Schedule an event
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          Upcoming events
                        </span>
                      </Col>
                      <Col xs="auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-star" style={{ fontSize: "36px" }} />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="6" lg="3" className="mb-4">
                <Card className="card-stats h-100">
                  <CardBody>
                    <Row className="align-items-center">
                      <Col>
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Notification
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          Set up your time here
                        </span>
                      </Col>
                      <Col xs="auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-bell" style={{ fontSize: "36px" }} />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="6" lg="3" className="mb-4">
                <Card className="card-stats h-100">
                  <CardBody>
                    <Row className="align-items-center">
                      <Col>
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Friends
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{friendCount}</span>
                      </Col>
                      <Col xs="auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" style={{ fontSize: "36px" }} />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="6" lg="3" className="mb-4">
                <Card className="card-stats h-100">
                  <CardBody>
                    <Row className="align-items-center">
                      <Col>
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Trending Events
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">Music concert</span>
                      </Col>
                      <Col xs="auto">
                        <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                          <i className="fas fa-music" style={{ fontSize: "36px" }} />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
