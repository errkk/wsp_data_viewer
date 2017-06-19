// @flow

import React from "react";

import "../sass/Button.css";

type Props = {
  onClick: Function,
  text: string,
};

export default class Button extends React.PureComponent {
  props: Props;

  render (): React.Element<*> {
    const { text, onClick } = this.props;
    return (
      <span className="Button" onClick={onClick}>
        {text}
      </span>
    );
  }
}
