import React from 'react';
import { VictoryLabel } from 'victory'
import './RoadMapMilestone.css'

export default class RoadMapMilestone extends React.Component {
  render() {
    const { datum, x, y, milestoneOffsetX, milestoneOffsetY } = this.props;


    return (


      <g >
        <g
          transform={`translate(${x - milestoneOffsetX},${y - milestoneOffsetY}) matrix(0.2,0,0,0.2,-8.1902,6.21517)`}
          id="g8"><path
            id="path2"
            d="M 249.462,0 C 151.018,0 70.951,80.106 70.951,178.511 c 0,92.436 133.617,192.453 172.248,315.948 0.83,2.667 3.322,4.484 6.116,4.465 2.804,-0.039 5.256,-1.876 6.048,-4.563 C 292.841,367.828 427.963,271.054 427.972,178.492 427.963,80.106 347.886,0 249.462,0 Z m 0,313.925 c -77.184,0 -139.987,-62.812 -139.987,-139.987 0,-77.184 62.803,-139.987 139.987,-139.987 77.165,0 139.977,62.803 139.977,139.987 0,77.175 -62.813,139.987 -139.977,139.987 z"
            style={{ fill: "gold" }} /></g>

        {datum.current === 'Y' ? <g > <circle className="circle first-pulse-circle" fill="none" cx={x + 10} cy={y - (milestoneOffsetY / 1.5)} r="25"></circle>
          <circle className="circle second-pulse-circle" fill="none" cx={x + 10} cy={y - (milestoneOffsetY / 1.5)} r="25"></circle>
          <circle className="circle third-pulse-circle" fill="none" cx={x + 10} cy={y - (milestoneOffsetY / 1.5)} r="25"></circle>
          <circle className="circle" fill="none" cx={x + 10} cy={y - (milestoneOffsetY / 1.5)} r="10"></circle></g> : null}



        <VictoryLabel style={{ fontSize: 30, fill: '#7144b7' }} text={datum.sidetext} dy={y - 70} dx={x + 60} />

      </g>
    );
  }
}
