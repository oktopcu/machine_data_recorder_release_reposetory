import React from 'react';
import './style/style.css';

//import page router
import { MainPageMenu } from './components/container/app_container';
import PageRouter from './Router/AppRoutes';

//import created react components
import FlexBox from './components/atoms/other/flexbox';

function App() {
  return (
    <div className="App">
      <FlexBox>
        <MainPageMenu/>
        <PageRouter/>
      </FlexBox>
    </div>
  );
}

export default App;
