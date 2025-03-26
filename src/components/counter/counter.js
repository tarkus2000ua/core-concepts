import React from "react";
import './counter.css';

export class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: props.initialValue || 0 };
      }
    
      increment = () => {
        this.setState((prevState) => ({ count: prevState.count + 1 }));
      };
    
      decrement = () => {
        this.setState((prevState) => ({ count: prevState.count - 1 }));
      };
    
      render() {
        return React.createElement(
          "div",
          {className: 'counter'},
          React.createElement("div", {className: 'count'}, this.state.count),
          React.createElement("div", {className: 'buttons'}, 
          React.createElement("button", { className: 'button', onClick: this.decrement }, "-"),
          React.createElement("button", { className: 'button', onClick: this.increment }, "+")
        ));
      }
}