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

import "../sass/Menu.css";

type Props = {
  fetchData: Function,
  loading: boolean,
};

type State = {
  drawer: boolean,
};

export default class HeaderComponent extends React.PureComponent {
  props: Props;
  state: State;

  handleToggle = (): void => this.setState({drawer: !this.state.drawer});

  constructor (props: Props) {
    super(props);
    this.state = {
      drawer: false,
    };

    setInterval(this.isItTimeToReFetchYet, 1000);
  }

  isItTimeToReFetchYet = () => {
    const { fetchData, loading, lastRow } = this.props;
    if (loading) return;
    const now = new Date();
    const MAX_AGE = 15 * 60 * 1000;
    if (!lastRow) {
      console.log("No last row");
      // TODO dont get stuck in a loop doing this if shit get stuck
      fetchData();
      return;
    }
    if (now.getTime() - lastRow.timestamp.getTime() > MAX_AGE) {
      console.log("we go stale data");
      fetchData();
    }
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
        />
        <Drawer open={drawer}>
          <AppBar
            title="Menu"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <MenuItem>
            <Link className="MenuItem__Link" to="/">Dashboard</Link>
          </MenuItem>
          <MenuItem>
            <Link className="MenuItem__Link" to="/chart">Chart</Link>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}
