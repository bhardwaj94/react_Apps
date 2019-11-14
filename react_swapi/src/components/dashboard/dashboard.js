import React from 'react';
import { connect } from 'react-redux';
import { fetchItemsIfNeeded } from '../../redux/actions/planetAction';
import Search from './search';
import Paper from '@material-ui/core/Paper';
import Planet from './planets';
import PlanetDiag from './planet';

class Dashboard extends React.Component {
  state = {
    login: this.props.login,
    searchStr: '',
    openPlanetDiag: false,
    selectedPlanet:{}
  }
  componentDidMount() {
    const { dispatch, searchStr } = this.props;
    dispatch(fetchItemsIfNeeded(searchStr));
  }
  handleChange = str => {
    this.setState({ searchStr: str });
    this.props.dispatch(fetchItemsIfNeeded(str));
  }

  onPlanetClick = (item, open) => {
    this.setState({ selectedPlanet: item,openPlanetDiag:open });
  }
  handleClose = bool =>{
    this.setState({ openPlanetDiag: bool });
  }
  render() {
    const { searchStr, items, isFetching } = this.props;
    return (
      <React.Fragment>
        <Search value={searchStr} onChange={this.handleChange} />
        {items.length ? <Paper style={{
          margin: '10px',
          padding: '15px'
        }}>
          {items.length > 0 &&
            <ul className="results">
              {items.map((item, i) =>
                <Planet key={i} item={item} onClick={() => { this.onPlanetClick(item, true) }} />
              )}
            </ul>
          }
        </Paper> : null}
        <PlanetDiag item={this.state.selectedPlanet} handleClose={()=>{this.handleClose(false)}} open={this.state.openPlanetDiag}/>
      </React.Fragment>
    )
  }
};

function mapStateToProps(state) {
  const { searchStr, itemsBySearchString } = state;
  const { isFetching, items } = itemsBySearchString[searchStr] || {
    searchStr,
    isFetching: true,
    items: [],
  };

  return {
    searchStr,
    items,
    isFetching,
    login: state.login
  };
}

export default connect(mapStateToProps, null)(Dashboard);