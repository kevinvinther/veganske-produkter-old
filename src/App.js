import React, { useState } from "react";
import "./App.css";
import products from "./products.json";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Row, Col, Card, Tag, Modal } from "antd";
import { RightOutlined } from "@ant-design/icons";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [proofVisible, setProofVisible] = useState({});
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedProducts = products.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleContactButtonClick = () => {
    setShowContactForm(!showContactForm);
  };

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post("https://your-api-endpoint.com/contact", values)
      .then(() => {
        setSubmitting(false);
        resetForm();
        alert("Form submitted successfully");
      })
      .catch((error) => {
        setSubmitting(false);
        console.log(error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <div class="App bg-gray-100 min-h-screen py-10 font-sans">
      <header class="text-center">
        <h1 class="text-4xl font-bold mb-8">Product Catalog</h1>
      </header>
      <div class="max-w-md mx-auto">
        <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            class="peer h-full w-full pl-12 outline-none text-sm text-gray-700 pr-2"
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <br />
      <div class="text-center">
        <Button onClick={handleContactButtonClick}>
          {showContactForm ? "Hide Contact Form" : "Show Contact Form"}
        </Button>
      </div>
      {showContactForm && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form class="contact-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-lg">
              <label
                htmlFor="name"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Name:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="name" />

              <label
                htmlFor="email"
                class="block text-gray-700 text-sm font-bold mb-2 mt-4"
              >
                Email:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="email" />

              <label
                htmlFor="message"
                class="block text-gray-700 text-sm font-bold mb-2 mt-4"
              >
                Message:
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="message" />

              <br />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
      <Row>
        {filteredProducts.map((product, index) => (
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img alt={product.title} src={`./assets/${product.image}`} />
            }
          >
            <Card.Meta
              title={product.title}
              description={product.description}
            />
            <p>Category: {product.category}</p>
            <p>
              Locations:
              {product.locations.map((location, index) => (
                <Tag key={index} color="blue">
                  {location}
                </Tag>
              ))}
            </p>
            <Button onClick={showModal}>Proof</Button>
            <Modal
              title="Proof"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <img alt="" src={product.proof_image} />
              <p>{product.proof_text}</p>
            </Modal>
          </Card>
        ))}
      </Row>
    </div>
  );
}

export default App;
