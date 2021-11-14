import React from 'react'
import { Layout,  Form, Input, InputNumber, Button, Select, FormInstance  } from 'antd';

const { Option } = Select;

interface FormProps {
    formInstance: FormInstance   
}

const StepTwo = (Props: FormProps) => {
    const form = Props.formInstance;
    const { age } = form.getFieldValue('user');

    return(
        <Layout>
            <Form form={form}>
                <Form.Item name={['user', 'ownsLicense']} label="Do you own a car driving License?" rules={[{ required: true }]}>
                    <Select
                    placeholder="Select a option"
                    allowClear
                    >
                        <Option value="true">Yes</Option>
                        <Option value="false">No, I prefer using other transport</Option>
                        </Select>
                </Form.Item>
                {age >= 18 && age <= 25 && <Form.Item name={['user', 'isFirstCar']} label="Is this your first car?" rules={[{ required: true }]}>
                    <Select
                    placeholder="Select a option"
                    allowClear
                    >
                        <Option value="true">Yes</Option>
                        <Option value="false">No</Option>
                        </Select>
                </Form.Item> }
                
            </Form>
        </Layout>
    )
}

export default StepTwo;