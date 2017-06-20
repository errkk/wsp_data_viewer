// @flow

import React from "react";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import NavigationRefresh from "material-ui/svg-icons/navigation/refresh";
import CircularProgress from "material-ui/CircularProgress";

import "../sass/Header.css";

type Props = {
  fetchData: Function,
  loading: Boolean,
};

type State = {
  drawer: Boolean,
};

export default class HeaderComponent extends React.PureComponent {
  props: Props;
  state: State;

  handleToggle = () => this.setState({drawer: !this.state.drawer});

  constructor (props: Props) {
    super(props);
    this.state = {
      drawer: false,
    };
  }

  reloadButton () {
    const { fetchData, loading } = this.props;

    if (loading) {
      return <IconButton><CircularProgress color='#fff' size={24} /></IconButton>;
    } else {
      return <IconButton onClick={fetchData}><NavigationRefresh /></IconButton>;
    }
  }

  render () {
    const { drawer } = this.state;
    return (
      <div>
        <AppBar
          title="Charts"
          iconElementLeft={<IconButton>{drawer ? <NavigationClose /> : <NavigationMenu />}</IconButton>}
          iconElementRight={this.reloadButton()}
          onLeftIconButtonTouchTap={this.handleToggle}
        >
        </AppBar>
        <Drawer open={drawer} openSecondary>
          <MenuItem>
            <Link to="/">Dashboard</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/chart">Chart</Link>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}
