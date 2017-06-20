// @flow

import React from "react";
import { Link } from "react-router-dom";

import Button from "./ButtonComponent";

import "../sass/Header.css";

type Props = {
  fetchData: Function,
};

export default class HeaderComponent extends React.PureComponent {
  props: Props;

  render () {
    const { fetchData } = this.props;
    return (
      <div className="Header">
        <h2>
          Chart
        </h2>

        <Link to="/chart">Chart</Link> | <Link to="/">Dashboard</Link>
        <Button onClick={fetchData} text="Fetch" />

      </div>
    );
  }
}
