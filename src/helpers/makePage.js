import React from "react";

type Props = { title: String };

export default function makePage (title: String): Class {
  return class PlaylistPage extends React.PureComponent {
    props: Props;
    render () {
      return <div className="screen-container">{title}</div>;
    }
  };
}
