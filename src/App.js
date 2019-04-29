import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import Menu from './components/Menu';
import {toggleItemSelection} from './redux/actions';

const App = (props) => (
  <div>
    <h1>Restaurant Menu</h1>
    <Menu {...props} />
  </div>
);

const mapStateToProps = ({ menu }) => menu;
export default connect(mapStateToProps, {
  toggleItemSelection
})(App);
