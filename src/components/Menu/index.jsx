import React, { Component } from 'react';

class Menu extends Component{

  state = {
    selected: {}
  };

  onItemSelected = (e) => {
    const { target: { name, checked }} = e;
    this.setState({
      selected: {
        [name]: checked
      }
    });
  };

  renderItem = (item) => {
    const { selected } = this.state;
    return (
      <li>
        <input type="checkbox" value={selected[item.name]} name={item.name} onChange={this.onItemSelected} />
        {item.name}
        {
          selected[item.name] && (
            <ul>
              <Menu menu={item.choices} />
              {
                item.related && (
                  <h4>You might also want</h4>
                )
              }
              <Menu menu={item.related} />
            </ul>
          )
        }
      </li>
    );
  };

  render(){
    const { menu = [] } = this.props;
    return (
      <ul>
        {
          menu.map(this.renderItem)
        }
      </ul>
    );
  }
}

export default Menu;
