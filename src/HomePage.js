import React, { useState } from "react";
import products from "./products.json";
import ProductCard from "./components/ProductCard";
import {
        Col,
        Input,
        Row,
        Layout,
        Typography,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";


const { Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
        const [searchTerm, setSearchTerm] = useState("");


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
                                                {filteredProducts.map((index) => (
                                                        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
                                                                <ProductCard product={index} />
                                                        </Col>
                                                ))}
                                        </Row>
                                </div>
                        </Content>
                </Layout>
        );
};

export default HomePage;
