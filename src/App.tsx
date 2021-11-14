import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import SurveyHome from './components/Survey';
import IndexedDb from './utils/IndexedDB';

const { Header, Content } = Layout;

function App() {
  const [selectedItem, setSelectedItem] = useState('1');

  const handleClick = (event: any) => {
    setSelectedItem(event.key);
  };

  return (
    <Router>
      <Layout className='layout' style={{ height: 'inherit'}}>
      <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selectedItem]} onClick={handleClick}>
            <Menu.Item key="1">Take Survey</Menu.Item>
            <Menu.Item key="2">View Results</Menu.Item>
          </Menu>
        </Header>
        <Content style={{padding: '24px'}}>
          {selectedItem === '1' ? <SurveyHome /> : <div>View Results</div>}
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
