import React, { useState } from 'react'
import { Layout, Form, Input, InputNumber, Button, Select, FormInstance } from 'antd';

const { Option } = Select;

interface FormProps {
    formInstance: FormInstance   
}

const StepOne = (Props: FormProps) => {
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
                <Form.Item name={['user', 'age']} label="Age" rules={[{ required: true, type: 'number', min: 1, max: 99}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={['user', 'gender']} label="Gender"  rules={[{ required: true }]}>
                    <Select
                    placeholder="Select a option and change input text above"
                    onChange={onGenderChange}
                    allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                        </Select>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export default StepOne;