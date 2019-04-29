import React from 'react';
import '../../App.css';
import menu from '../../utils/menu';
import Menu from '../../components/Menu';

const App = () => (
  <div>
    <h1>Restaurant Menu</h1>
    <Menu menu={menu} level={1}/>
  </div>
);

export default App;

