import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Navn er nødvendigt"),
  email: Yup.string().email("Invalid email").required("Email er nødvendigt"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Besked er nødvendigt"),
});

const ContactPage = () => {
  const onSubmit = (values) => {
    window.location.href = `mailto:veganskeprodukter@email.dk?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(values.name)} (${encodeURIComponent(values.email)})%0D%0A%0D%0A${encodeURIComponent(values.message)}`;
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, getFieldProps }) => (
            <Form onFinish={handleSubmit} className="contact-form">
              <Title level={2}>Kontakt Formular</Title>
              <Form.Item {...getFieldProps("name")}>
                <Input placeholder="Navn" />
              </Form.Item>
              <Form.Item {...getFieldProps("subject")}>
                <Input placeholder="Emne" />
              </Form.Item>
              <Form.Item {...getFieldProps("message")}>
                <Input.TextArea placeholder="Besked" rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Send mail
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Col>
      <Col span={12}>
        <Title level={2}>Email Vejledning</Title>
        <Paragraph>
          Hvis du ønsker at kontakte os, følg venligst nedenstående vejledning.
        </Paragraph>
        <Title level={3}>Generel Kontakt</Title>
        <Paragraph>
          Kontakt os ved <a href="mailto:veganskeprodukter@protonmail.com">at klikke her</a>, eller sende en mail til <i>veganskeprodukter@protonmail.com</i>
        </Paragraph>
        <Title level={3}>Produktinformation</Title>
        <Paragraph>
          1. Skriv produktets titel.
          <br />
          2. Giv en beskrivelse af produktet.
          <br />
          3. Hvis det er muligt, medsend et billede af produktet som vedhæftet fil.
          <br />
          4. Skriv en tekst, der beviser at produktet er vegansk (e.g. "Der er ingen animalske ingredienser" "Jeg har snakket med producenten, og de siger at E### er vegansk", "Det står på pakken", etc.").
          <br />
          5. Hvis du har et billede som yderligere bevis, kan du vedhæfte det i din e-mail. (f.eks. et billede af ingredienslisten, samtale med producenten, etc.)
        </Paragraph>
        Kontakt os ved <a href="mailto:veganskeprodukter@protonmail.com">at klikke her</a>, eller sende en mail til <i>veganskeprodukter@protonmail.com</i>
      </Col>
    </Row>
  );
};

export default ContactPage;
