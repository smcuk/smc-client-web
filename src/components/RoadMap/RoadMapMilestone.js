import React from 'react';
import { VictoryLabel } from 'victory'

export default class RoadMapMilestone extends React.Component {
  render() {
    const { datum, x, y } = this.props;
    const dx = 50;
    const dy = 150;

    return (



      <g
      >
        {/* <circle cx={x} cy={y} r={radius} style={{ fill: "#00ccff" }}>
        </circle> */}


        <path transform={`translate(${x - dx},${y - dy})`}
          d="M64,13.875c-19.761,0-35.782,16.02-35.782,35.782c0,23.134,29.818,64.468,35.782,64.468  c5.965,0,35.781-41.334,35.781-64.468C99.781,29.895,83.762,13.875,64,13.875z M64,69.811c-11.186,0-20.256-9.07-20.256-20.256  c0-11.187,9.07-20.256,20.256-20.256c11.188,0,20.256,9.07,20.256,20.256C84.256,60.74,75.188,69.811,64,69.811z" fill="gold" />



        <VictoryLabel style={{ fontSize: 30 }} text={datum.sidetext} dy={y - 90} dx={x + 60} />

      </g>
    );
  }
}
