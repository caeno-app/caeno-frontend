import React, { useState } from 'react';
import { XYPlot, XAxis, YAxis, HexbinSeries, ChartLabel } from 'react-vis';
import './FoodItemHexbin.scss';

const FoodItemHexbin = ({DATA}) => {
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
            <span>Food Nutrition</span>
			<XYPlot
				width={window.innerWidth - 40}
				height={300}
				margin={30}
			>
				<HexbinSeries
					animation
					sizeHexagonsWithCount
					className="hexbin-size-example"
					radius={15}
					data={data}
				/>
				<XAxis />
				<YAxis />
				<ChartLabel
					text={DIMENSIONS[xAxis]}
					className="alt-x-label"
					xPercent={0.9}
					yPercent={0.65}
					style={{
						transform: 'rotate(90)',
						textAnchor: 'end'
					}}
				/>

				<ChartLabel
					text={DIMENSIONS[yAxis]}
					className="alt-y-label"
					xPercent={0.1}
					yPercent={0.0}
					style={{
						textAnchor: 'start'
					}}
				/>
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
			<article className="description">
				This graph displays the ratio of {DIMENSIONS[xAxis]} to {DIMENSIONS[yAxis]} per meal. 
			</article>
		</div>
	);
}

export default FoodItemHexbin;