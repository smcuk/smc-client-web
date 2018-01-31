import React from 'react';

// import Data from '../../data';
import { userIsAuthenticatedRedir } from '../Auth/auth-routing';
import PageBase from '../../components/PageBase';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Layout from '../Layout';
import { Card, CardMedia } from 'material-ui/Card';
import { VictoryLine, VictoryScatter, VictoryGroup, VictoryLabel } from 'victory'
import RoadMapMilestone from '../../components/RoadMap/RoadMapMilestone'
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import './road.css'




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
    const { width } = this.props;
    let widthGrow = 1;
    let data = [];
    let domain = {}
    let roadwidth = 0;
    let milestoneOffsetX = 0;
    let milestoneOffsetY = 0;




    if (width === LARGE) {

      data = [
        { x: -190, y: 350, sidetext: 'Funding', current: 'N', order: 1, icon: 'funding' },
        { x: 80, y: 300, sidetext: 'Offer', current: 'Y', order: 2, icon: 'offer' },
        { x: 60, y: 200, sidetext: 'Solicitor', current: 'N', order: 3, icon: 'offer' },
        { x: 180, y: 60, sidetext: 'Survey', current: 'N', order: 4, icon: 'offer' },
        { x: 150, y: 20, sidetext: 'Survey', current: 'N', order: 4, icon: 'offer' },

      ]

      domain = { x: [-200, 200], y: [-400, 400] };
      roadwidth = 50;
      milestoneOffsetX = 55
      milestoneOffsetY = 140;


      widthGrow = 400;
    } else {


      widthGrow = 100;
      roadwidth = 40;
      milestoneOffsetX = 54
      milestoneOffsetY = 140;

      data = [
        { x: -190, y: 350, sidetext: 'Mortgage', current: 'N', order: 1, icon: 'funding' },
        { x: 80, y: 300, sidetext: 'Offer', current: 'Y', order: 2, icon: 'offer' },
        { x: -60, y: 200, sidetext: 'Solicitor', current: 'N', order: 3, icon: 'offer' },
        { x: 100, y: 60, sidetext: 'Survey', current: 'N', order: 4, icon: 'offer' },
        { x: 10, y: 20, sidetext: 'Survey', current: 'N', order: 4, icon: 'offer' },

      ]

      domain = { x: [-200, 200], y: [-400, 400] };

    }


    return (
      <Layout>
        <PageBase navigation="SeeMyChain / Dashboard" noWrapContent loading={this.state.loading}>
          <div className="road-container">
            {' '}
            <Card style={{ backgroundColor: 'transparent', boxShadow: 'none', maxWidth: '1000px' }}>
              <CardMedia >


                <VictoryGroup width={data.length * widthGrow} height={data.length * 200} domain={{ x: [-200, 200], y: [0, 400] }} data={data}>
                  <VictoryLine
                    sortKey="order"
                    interpolation={"cardinal"}
                    style={{ data: { stroke: "black", strokeWidth: roadwidth } }}
                  />

                  <VictoryLine
                    sortKey="order"
                    interpolation={"cardinal"}
                    style={{ data: { stroke: "white", strokeWidth: 2, strokeDasharray: "15,15" } }}
                  />
                  <VictoryScatter
                    dataComponent={<RoadMapMilestone milestoneOffsetX={milestoneOffsetX} milestoneOffsetY={milestoneOffsetY} />}
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
  withWidth(),
  firebaseConnect(),
  userIsAuthenticatedRedir,
  connect(({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  }))
)(DashboardPage);
