import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Table,
  Button,
  Input,
  Row,
  Col,
  FormGroup,
  Label,
} from "reactstrap";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";

const MatchingProfile = () => {
  const [filters, setFilters] = useState({
    name: "",
    age: "",
    interestLevel: "",
    gender: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const location = useLocation(); // To access the passed state
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();

  // Fetch data from Firestore and apply event filter
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });

      const currentUser = auth.currentUser?.uid;

      // Filter by event and exclude self-profile
      const eventFilter = location.state?.event || ""; // Get selected event from state
      const filtered = usersData
        .filter(
          (user) =>
            user.selectedEvent === eventFilter && user.id !== currentUser // Exclude self-profile
        )
        .sort((a, b) => b.interestLevel - a.interestLevel); // Sort by interest level descending

      setData(filtered);
      setFilteredData(filtered); // Initialize with filtered data
      setIsDataEmpty(filtered.length === 0); // Check if the filtered data is empty
    };

    fetchData();
  }, [db, location.state, auth.currentUser]);

  // Apply additional filters
  const applyFilters = () => {
    const { name, age, interestLevel, gender } = filters;
    const filtered = data.filter((item) => {
      return (
        (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
        (!age || item.age.toString() === age) &&
        (!interestLevel || item.interestLevel.toString() === interestLevel) &&
        (!gender || item.gender.toLowerCase() === gender.toLowerCase())
      );
    });
    setFilteredData(filtered);
    setIsDataEmpty(filtered.length === 0); // Check if no matches found
  };

  return (
    <Card
      className="shadow-lg rounded-4"
      style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardBody>
        <h3
          className="mb-4"
          style={{
            color: "#5D3FD3",
            fontSize: "2.5rem",
            fontWeight: "700",
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          Matching Profiles
        </h3>

        {/* Filter Section */}
        <Row className="mb-5">
          <Col md="3">
            <FormGroup>
              <Label for="nameFilter" style={{ fontSize: "1.1rem", color: "#5D3FD3" }}>
                Name
              </Label>
              <Input
                id="nameFilter"
                placeholder="Enter Name"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  border: "1px solid #ddd",
                  background: "#f4f5f7",
                }}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label for="ageFilter" style={{ fontSize: "1.1rem", color: "#5D3FD3" }}>
                Age
              </Label>
              <Input
                id="ageFilter"
                placeholder="Enter Age"
                value={filters.age}
                onChange={(e) => setFilters({ ...filters, age: e.target.value })}
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  border: "1px solid #ddd",
                  background: "#f4f5f7",
                }}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label for="interestLevelFilter" style={{ fontSize: "1.1rem", color: "#5D3FD3" }}>
                Interest Level
              </Label>
              <Input
                id="interestLevelFilter"
                placeholder="Enter Interest Level"
                value={filters.interestLevel}
                onChange={(e) => setFilters({ ...filters, interestLevel: e.target.value })}
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  border: "1px solid #ddd",
                  background: "#f4f5f7",
                }}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label for="genderFilter" style={{ fontSize: "1.1rem", color: "#5D3FD3" }}>
                Gender
              </Label>
              <Input
                id="genderFilter"
                placeholder="Enter Gender (Male/Female)"
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                style={{
                  borderRadius: "8px",
                  padding: "12px",
                  border: "1px solid #ddd",
                  background: "#f4f5f7",
                }}
              />
            </FormGroup>
          </Col>
          <Col md="12" style={{ textAlign: "center" }}>
            <Button
              color="primary"
              onClick={applyFilters}
              style={{
                background: "linear-gradient(90deg, #5D3FD3, #FF6F91)",
                borderColor: "transparent",
                padding: "12px 25px",
                fontSize: "1.2rem",
                borderRadius: "12px",
                boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              }}
            >
              Apply Filters
            </Button>
          </Col>
        </Row>

        {/* Show Message if No Data */}
        {isDataEmpty ? (
          <div style={{ textAlign: "center", color: "#5D3FD3", fontSize: "1.5rem" }}>
            <marquee behavior="scroll" direction="left" scrollamount="5" style={{ display: "inline-block" }}>
              <span role="img" aria-label="sad emoji" style={{ marginRight: "8px" }}>
                😔
              </span>
              No profiles match your search at the moment. Please hold on, a match will appear soon!
              <span role="img" aria-label="sad emoji" style={{ marginLeft: "8px" }}>
                😔
              </span>
            </marquee>
          </div>
        ) : (
          <Table
            className="align-items-center table-flush"
            responsive
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 15px",
            }}
          >
            <thead
              className="thead-light"
              style={{
                backgroundColor: "#5D3FD3",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
                <th scope="col">Event</th>
                <th scope="col">Interest Level</th>
                <th scope="col">Connect</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <td style={{ textAlign: "center" }}>{row.name}</td>
                  <td style={{ textAlign: "center" }}>{row.age}</td>
                  <td style={{ textAlign: "center" }}>{row.gender}</td>
                  <td style={{ textAlign: "center" }}>{row.selectedEvent}</td>
                  <td style={{ textAlign: "center" }}>{row.interestLevel}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => navigate("/admin/chats")}
                      style={{
                        background: "linear-gradient(90deg, #FF6F91, #5D3FD3)",
                        borderColor: "transparent",
                        padding: "8px 16px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Connect
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};

export default MatchingProfile;
