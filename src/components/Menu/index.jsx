import React, { Component } from 'react';

class Menu extends Component{

  state = {
    selected: {},
    showPreferred: {}
  };

  onItemSelected = (e) => {
    const { target: { name, checked }} = e;
    const { onSelected } = this.props;
    this.setState((prevState) => ({
      selected: {
        ...prevState.selected,
        [name]: checked
      }
    }), () => {
      const { selected } = this.state;
        onSelected && onSelected(Object.values(selected).find(a => a));
    });
  };

  onMenuItemSelected = (checked, name ) => {
    const { showPreferred } = this.state;
    this.setState({ showPreferred: { ...showPreferred, [name]: checked}});
  };

  renderItem = (item) => {
    const { selected , showPreferred } = this.state;
    const { level } = this.props;
    return (
      <li key={item.name}>
        <input type="checkbox" value={selected[item.name]} name={item.name} onChange={this.onItemSelected} />
        {item.name}
        {
          selected[item.name] && (
            <ul>
              <Menu menu={item.choices} onSelected={(checked) => this.onMenuItemSelected(checked, item.name)} level={level+1} />
              {
                item.related && item.related.length > 0 && showPreferred[item.name] && (
                  <>
                    <h4>You might also want</h4>
                    <Menu menu={item.related} level={level+1} />
                  </>
                )
              }
            </ul>
          )
        }
      </li>
    );
  };

  render(){
    const { menu = [] } = this.props;
    return (
      <ul> { menu.map(this.renderItem) } </ul>
    );
  }
}

export default Menu;
