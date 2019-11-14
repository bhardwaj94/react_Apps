import React from 'react';
import { connect } from 'react-redux';

import { getPlanets } from '../../redux/actions/index';

class GetPlanets extends React.Component{

    componentDidMount(){
        // this.props.dispatch(getPlanets());
    }
    render(){
        return(
        <>GetPlanets</>
        )
    }  
};

function mapStateToProps(state){
    return {
        state
    };
};
export default connect(mapStateToProps,null)(GetPlanets);