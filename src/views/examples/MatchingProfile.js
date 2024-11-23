import React, { useState } from "react";
import { Card, CardBody, Table, Button, Input, Row, Col, FormGroup, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";

const MatchingProfile = () => {
  const navigate = useNavigate();

  // Original data
  const originalData = [
    { name: "Mishri Patel", age: 21, gender: "Female", event: "Biking", interestLevel: 10 },
    { name: "John Tyler", age: 33, gender: "Male", event: "Biking", interestLevel: 7 },
  ];

  // State for filters and filtered data
  const [filters, setFilters] = useState({ name: "", age: "", interestLevel: "", gender: "" });
  const [filteredData, setFilteredData] = useState(originalData);

  // Filter logic
  const applyFilters = () => {
    const { name, age, interestLevel, gender } = filters;
    const filtered = originalData.filter((item) => {
      return (
        (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
        (!age || item.age.toString() === age) &&
        (!interestLevel || item.interestLevel.toString() === interestLevel) &&
        (!gender || item.gender.toLowerCase() === gender.toLowerCase())
      );
    });
    setFilteredData(filtered);
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
        {/* Page Heading */}
        <h3
          className="mb-4"
          style={{
            color: "#5D3FD3", // Icon-based purple
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
                background: "linear-gradient(90deg, #5D3FD3, #FF6F91)", // Icon-based gradient
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

        {/* Data Table */}
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
              backgroundColor: "#5D3FD3", // Icon-based purple
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
                <td style={{ textAlign: "center" }}>{row.event}</td>
                <td style={{ textAlign: "center" }}>{row.interestLevel}</td>
                <td style={{ textAlign: "center" }}>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => navigate("/admin/chats")}
                    style={{
                      background: "linear-gradient(90deg, #FF6F91, #5D3FD3)", // Gradient for "Connect"
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
      </CardBody>
    </Card>
  );
};

export default MatchingProfile;
