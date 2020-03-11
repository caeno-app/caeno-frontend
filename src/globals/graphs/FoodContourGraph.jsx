import React, {useState} from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  ContourSeries,
  MarkSeriesCanvas,
} from 'react-vis';

const FoodContourGraph = ({DATA}) => {
    const DIMENSIONS = [
		'calories',
		'calories from fat',
        'total fat',
        'trans fat',
        'cholesterol',
        'sodium',
        'fiber',
        'sugars'
    ];
    const [xAxis, setXAxis] = useState(0);
	const [yAxis, setYAxis] = useState(1);
	const updateX = (increment) => {
		setXAxis((xAxis + (increment ? 1 : -1)) % DIMENSIONS.length);
	}
	const updateY = (increment) => {
		setYAxis((yAxis + (increment ? 1 : -1)) % DIMENSIONS.length);
	}
	const data = DATA.map(d => ({
		x: Number(d[DIMENSIONS[xAxis]]),
		y: Number(d[DIMENSIONS[yAxis]])
	}));
    return (
      <div className="commit-graph-wrapper">
        <XYPlot
          width={window.innerWidth - 40}
          height={350}
        >
          <ContourSeries
            animation
            style={{
              stroke: '#125C77',
              strokeLinejoin: 'round'
            }}
            colorRange={['#79C7E3', '#FF9833']}
            data={data}
          />
          <MarkSeriesCanvas animation data={data} size={1} color={'#125C77'} />
          <XAxis />
          <YAxis />
        </XYPlot>
        <div className="controls">
				<button onClick={updateX.bind(null,false)}>❮</button>
				<div> {`${DIMENSIONS[xAxis]}`} </div>
				<button onClick={updateX.bind(null, true)}>❯</button>
			</div>
			<div className="controls">
				<button onClick={updateY.bind(null,false)}>❮</button>
				<div> {`${DIMENSIONS[yAxis]}`} </div>
				<button onClick={updateY.bind(null, true)}>❯</button>
			</div>
      </div>
    );
}
export default FoodContourGraph;