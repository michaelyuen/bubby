import React from "react";
import Form from "./index";
import Input from "components/Input";
import Button from "components/Button";

export default {
  title: "Form",
  component: Form
};

export const Default = () => (
  <Form>
    <Input placeholder="Enter some deets." />
    <Input placeholder="Enter some more deets." />
    <Button>Click Me!</Button>
  </Form>
);
