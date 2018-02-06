import React from 'react';
import { VictoryLabel } from 'victory'
import './RoadMapMilestone.css'
import Images from './RoadmapIcons'



export default class RoadMapMilestone extends React.Component {
  render() {
    const { datum, x, y, milestoneOffsetX, milestoneOffsetY } = this.props;



    return (
      <g >
        <g
          transform={`translate(${x - milestoneOffsetX},${y - milestoneOffsetY}) `}
          id="g8">
          <path className="pulsate" fill="#7144b7" d="M65.348,0c-26.506,0-48,21.493-48,48c0,26.508,40.001,80,48.001,80c8,0,48-53.492,48-80C113.35,21.493,91.857,0,65.348,0z" />
        </g>

        {datum.current === 'Y' ? <g > <circle className="circle first-pulse-circle" fill="none" cx={x + 10} cy={y} r="25"></circle>
          <circle className="circle second-pulse-circle" fill="none" cx={x + 10} cy={y} r="25"></circle>
          <circle className="circle third-pulse-circle" fill="none" cx={x + 10} cy={y} r="25"></circle>
          <circle className="circle" fill="#7144b7" cx={x + 10} cy={y} r="7"></circle></g> : null}

        <image x={x - milestoneOffsetX + 40} y={y - milestoneOffsetY + 25} xlinkHref={Images[datum.icon]} height="50px" width="50px"></image>

        <VictoryLabel style={{ fontSize: 30, fill: '#7144b7' }} text={datum.sidetext} dy={y - 70} dx={x + 60} />
      </g>
    );
  }
}
