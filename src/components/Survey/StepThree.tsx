import React, { useState } from 'react'
import { Layout, Form, Input, InputNumber, Button, Select, FormInstance } from 'antd';

const { Option } = Select;

interface FormProps {
    formInstance: FormInstance   
}

const StepThree = (Props: FormProps) => {
    const form = Props.formInstance;

    const onGenderChange = (value: string) => {
        switch (value) {
          case 'male':
            form.setFieldsValue({ note: 'Hi, man!' });
            return;
          case 'female':
            form.setFieldsValue({ note: 'Hi, lady!' });
            return;
          case 'other':
            form.setFieldsValue({ note: 'Hi there!' });
        }
    };
    return(
        <Layout>
            <Form form={form}>
                <Form.Item name={['user', 'prefersDrivetrain']} label="Which drivetrain do you prefer?" rules={[{ required: true }]}>
                    <Select
                    placeholder="Select a option"
                    allowClear
                    >
                        <Option value="fwd">FWD</Option>
                        <Option value="rwd">RWD</Option>
                        <Option value="dk">I don't know</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['user', 'caresAboutFuelEmissions']} label="Are you worried about fuel emissions?" rules={[{ required: true }]}>
                    <Select
                    placeholder="Select a option"
                    allowClear
                    >
                        <Option value="true">Yes</Option>
                        <Option value="false">No</Option>
                    </Select>
                </Form.Item><Form.Item name={['user', 'noOfCars']} label="How many cars do you have in your family?" rules={[{ required: true, type: 'number', min: 1}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={['user', 'hasCarMakeModel']} label="Which car make and model you drive?" rules={[{ required: true }]}>
                    <Select
                    placeholder="Select a option"
                    allowClear
                    >
                        <Option value="fwd">FWD</Option>
                        <Option value="rwd">RWD</Option>
                        <Option value="dk">I don't know</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export default StepThree;