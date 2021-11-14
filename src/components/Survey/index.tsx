import React, { useEffect, useState } from 'react'
import { Steps, Button, message, Form, Result, notification } from 'antd';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { surveyDb } from '../../utils/IndexedDB';
import { validateAge } from '../../utils/formValidations';

const { Step } = Steps;

type UserData = {
  age: number,
  gender: string,
  hasDrivingLicense: boolean,
  isFirstCar: boolean,
  prefersDrivetrain: string,
  caresAboutFuelEmissions: boolean,
  hasCars: number,
  hasCarMakeModel: string
}

const SurveyHome = () => {
  const [current, setCurrent] = useState(0);
  const [shouldEndSurvey, setShouldEndSurvey] = useState(false);
  const [surveyEndMessage, setSurveyEndMessage] = useState("Thank you for your time");
  const [form] = Form.useForm();

  useEffect(() => {
    const runIndexDb = async () => {
      await surveyDb.createObjectStore(['users', 'stats']);
    }
    runIndexDb();
  })

  const refreshPage = () => {
    window.location.reload();
  }

  const next = async () => {
    const userData: UserData = form.getFieldValue('user');
    if(userData){
      const isAgeValid = validateAge(userData.age);
      if(!isAgeValid){
        setShouldEndSurvey(true);
      }
      if(userData.isFirstCar){
        setSurveyEndMessage("We are targeting more experienced clients, thank you for your interest")
        setShouldEndSurvey(true);

      }
      if(!userData.hasDrivingLicense){
        setSurveyEndMessage("Thank you for your interest")
        setShouldEndSurvey(true);
      }
      try{
        await surveyDb.putValue('users', userData);
      }catch(error){
        throw error;
      }
      setCurrent(current + 1);
    } else {
      notification['error']({
        message: 'Invalid fields',
        description:
          'Check values and try again',
      });
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Basic User Details',
      content: <StepOne formInstance={form}/>,
    },
    {
      title: 'Step Two',
      content: <StepTwo formInstance={form}/>,
    },
    {
      title: 'Step Three',
      content: <StepThree formInstance={form}/>
    }
  ];

  return (
    <>
      {shouldEndSurvey 
      ? <Result
          status="success"
          title={surveyEndMessage}
          extra={[
            <Button type="primary" key="home" onClick={refreshPage}>
              Take the survey again
            </Button>,
          ]}
        /> 
      : <>
        <Steps current={current} responsive>
          <Step title='Part One' />
          <Step title='Part Two' />
          <Step title='Part Three' />
        </Steps>
        <div className="steps-content" style={{height: '50%', padding: '24px'}}>{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {/* {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )} */}
        </div>
      </> }
      
    </>
  );
};

export default SurveyHome;