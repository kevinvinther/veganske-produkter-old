import React, { useState } from "react";
import products from "./products.json";
import {
  Col,
  Input,
  Row,
  Card,
  Tag,
  Modal,
  Layout,
  Typography,
  Button,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);
  const [proofVisible, setProofVisible] = useState({});
  const [image, setImage] = useState("");
  const [imageVisible, setImageVisible] = useState({});

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedProducts = products.sort((a, b) =>
    a.title < b.title ? -1 : a.title > b.title ? 1 : 0
  );

  const filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Content style={{ padding: "0px" }}>
        <Title level={2} style={{ textAlign: "center", color: "#595959" }}>
          Veganske produkter
        </Title>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Input
            placeholder="Search by title"
            onChange={handleSearchChange}
            prefix={<SearchOutlined />}
          />
        </div>
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: 380,
            borderRadius: "25px",
          }}
        >
          <Row gutter={[16, 16]}>
            {filteredProducts.map((product, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
                <Card
                  hoverable
                  style={{ width: "100%", borderRadius: "15px" }}
                  cover={
                    <div
                      style={{
                        width: "100%",
                        height: "150px",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        alt={product.title}
                        src={`./assets/${product.image}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onClick={() => {
                          setImageVisible(true);
                          setImage(product);
                        }}
                      />
                      <Modal
                        visible={imageVisible && image === product}
                        onOk={() => setImageVisible(false)}
                        onCancel={() => setImageVisible(false)}
                      >
                        <img
                          alt={product.title}
                          src={`/assets/${product.image}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Modal>
                    </div>
                  }
                >
                  <Card.Meta
                    title={product.title}
                    description={product.description}
                  />
                  <p>
                    <strong>Kategorier: </strong>
                    {product.category.map((category, index) => (
                      <Tag key={index} color="red">
                        {category}
                      </Tag>
                    ))}
                  </p>
                  <p>
                    <strong>Lokationer: </strong>
                    {product.locations.map((location, index) => (
                      <Tag key={index} color="blue">
                        {location}
                      </Tag>
                    ))}
                  </p>
                  <Button
                    type="primary"
                    onClick={() => {
                      setVisible(true);
                      setProofVisible(product);
                    }}
                  >
                    Bevis
                  </Button>
                  <Modal
                    title="Bevis"
                    visible={visible && proofVisible === product}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                  >
                    <img alt="" src={product.proof_image} />
                    <p>{product.proof_text}</p>
                  </Modal>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;
