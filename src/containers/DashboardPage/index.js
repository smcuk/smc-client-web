import React from 'react';

// import Data from '../../data';
import { userIsAuthenticatedRedir } from '../Auth/auth-routing';
import PageBase from '../../components/PageBase';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Layout from '../Layout';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import Road from '../../road.svg';
import { VictoryLine, VictoryScatter, VictoryGroup, VictoryLabel } from 'victory'
import RoadMapMilestone from '../../components/RoadMap/RoadMapMilestone'



class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    this.setState({
      loading: false
    });
  }

  render() {

    var data = [
      { x: -190, y: 350, sidetext: 'Mortgage', order: 1 },
      { x: 80, y: 300, sidetext: 'Offer', order: 2 },
      { x: 60, y: 200, sidetext: 'Solicitor', order: 3 },
      { x: 180, y: 60, sidetext: 'Survey', order: 4 },
      { x: 150, y: 20, sidetext: 'Survey', order: 4 },
      // { x: -30, y: 30 },
      // { x: 40, y: 40 },
      // { x: 50, y: 50 }
    ]

    return (
      <Layout>
        <PageBase navigation="SeeMyChain / Dashboard" noWrapContent loading={this.state.loading}>
          <div>
            {' '}
            <Card style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
              <CardMedia>


                <VictoryGroup width={data.length * 400} height={data.length * 300} domain={{ x: [-200, 200], y: [-400, 400] }} data={data}>
                  <VictoryLine
                    sortKey="order"
                    interpolation={"cardinal"}
                    style={{ data: { stroke: "black", strokeWidth: 80 } }}
                  />
                  <VictoryLine
                    sortKey="order"
                    interpolation={"cardinal"}
                    style={{ data: { stroke: "white", strokeWidth: 2, strokeDasharray: "15,15" } }}
                  />
                  <VictoryScatter
                    dataComponent={<RoadMapMilestone />}
                  />
                </VictoryGroup>



              </CardMedia>
            </Card>
          </div>
        </PageBase>
      </Layout>
    );
  }
}

export default compose(
  firebaseConnect(),
  userIsAuthenticatedRedir,
  connect(({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  }))
)(DashboardPage);
