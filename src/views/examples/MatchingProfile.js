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
      className="shadow"
      style={{
        backgroundColor: "#f0f4f8", // Light gray background
        border: "1px solid #dee2e6", // Optional border for better appearance
        borderRadius: "8px",
      }}
    >
      <CardBody>
        {/* Page Heading */}
        <h3 className="mb-4">Matching Profiles</h3>

        {/* Filter Section */}
        <Row className="mb-4">
          <Col md="3">
            <FormGroup>
              <Label for="nameFilter">Name</Label>
              <Input
                id="nameFilter"
                placeholder="Enter Name"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label for="ageFilter">Age</Label>
              <Input
                id="ageFilter"
                placeholder="Enter Age"
                value={filters.age}
                onChange={(e) => setFilters({ ...filters, age: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label for="interestLevelFilter">Interest Level</Label>
              <Input
                id="interestLevelFilter"
                placeholder="Enter Interest Level"
                value={filters.interestLevel}
                onChange={(e) => setFilters({ ...filters, interestLevel: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label for="genderFilter">Gender</Label>
              <Input
                id="genderFilter"
                placeholder="Enter Gender (Male/Female)"
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md="12">
            <Button color="primary" onClick={applyFilters}>
              Apply Filters
            </Button>
          </Col>
        </Row>

        {/* Data Table */}
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
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
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.gender}</td>
                <td>{row.event}</td>
                <td>{row.interestLevel}</td>
                <td>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => navigate("/admin/chats")}
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
