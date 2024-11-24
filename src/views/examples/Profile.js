import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    nickName: "",
    age: "",
    gender: "",
    email: "",
    city: "",
    instagram: "",
    linkedin: "",
    about: "",
    selectedEvent: null,
    interestLevel: 5,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchUserData = async () => {
      const user = getAuth().currentUser;
      if (!user) {
        alert("No user logged in");
        return;
      }

      const uid = user.uid;

      try {
        const userDocRef = doc(db, "users", uid);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          setFormData(docSnapshot.data());
        } else {
          console.log("No such user data!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = "Name is required.";
    if (!formData.age.trim()) validationErrors.age = "Age is required.";
    if (!formData.gender.trim()) validationErrors.gender = "Gender is required.";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Don't submit the form if there are errors
    }

    const user = getAuth().currentUser;
    if (!user) {
      alert("No user logged in");
      return;
    }

    const uid = user.uid;

    try {
      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, formData);

      console.log("User profile updated successfully");

      // Redirect to /admin/index
      navigate("/admin/index");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img src={require("../../assets/img/theme/profilepic.jpeg")} alt="..." className="rounded-circle" />

                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">
                          {formData.nickName || "N/A"}
                        </span>
                        <span className="description">Nickname</span>
                      </div>
                      <div>
                        <span className="heading">{formData.age || "N/A"}</span>
                        <span className="description">Age</span>
                      </div>
                      <div>
                        <span className="heading">
                          {formData.gender || "N/A"}
                        </span>
                        <span className="description">Gender</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>{formData.name || "User"}</h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {formData.email || ""}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Instagram: {formData.instagram || "Not provided"}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    LinkedIn: {formData.linkedin || "Not provided"}
                  </div>
                  <div>
                    <i className="ni location_pin mr-2" />
                    {formData.city || "City not specified"}
                  </div>
                  <hr className="my-4" />
                  <p>{formData.about || "A few words about yourself..."}</p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                  {/*
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  
                  */}  
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Name <span className="text-danger">*</span>
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                          {errors.name && <small className="text-danger">{errors.name}</small>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-nickname"
                          >
                            Nickname
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-nickname"
                            placeholder="Nickname"
                            type="text"
                            name="nickName"
                            value={formData.nickName}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-age"
                          >
                            Age <span className="text-danger">*</span>
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-age"
                            placeholder="Age"
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                          />
                          {errors.age && <small className="text-danger">{errors.age}</small>}
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-gender"
                          >
                            Gender <span className="text-danger">*</span>
                          </label>
                          <Input
                            type="select"
                            name="gender"
                            id="input-gender"
                            className="form-control-alternative"
                            value={formData.gender}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                          </Input>
                          {errors.gender && <small className="text-danger">{errors.gender}</small>}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email ID
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Email Address"
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            placeholder="City"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-instagram"
                          >
                            Instagram
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-instagram"
                            placeholder="Instagram Username"
                            type="text"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-linkedin"
                          >
                            LinkedIn
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-linkedin"
                            placeholder="LinkedIn Profile URL"
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Col>
                      <Button color="primary" type="submit">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
