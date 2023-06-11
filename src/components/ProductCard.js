import React, { useState, memo } from 'react';
import { Card, Tag, Button, Modal } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';



const ProductCard = memo(({ product }) => {

        const [visible, setVisible] = useState(false);
        const [proofVisible, setProofVisible] = useState({});
        const [image, setImage] = useState("");
        const [imageVisible, setImageVisible] = useState({});
        return (
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
                                        <LazyLoadImage
                                                alt={product.title}
                                                src={`./assets/${product.image}`}
                                                placeholderSrc={`${product.image.replace('.jpg', '_compressed.jpg')}`}
                                                effect="blur"
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
                                                <LazyLoadImage
                                                        alt={product.title}
                                                        src={`./assets/${product.proof_image}`}
                                                        placeholderSrc={`${product.image.replace('.jpg', '_compressed.jpg')}`}
                                                        effect="blur"
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
                                <LazyLoadImage alt="" src={product.proof_image} />
                                <p>{product.proof_text}</p>
                        </Modal>
                </Card>
        );
});

export default ProductCard;
