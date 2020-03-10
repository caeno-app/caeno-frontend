import React, {useState} from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalBarSeriesCanvas
} from 'react-vis';
import './FoodItemHexbin.scss';

const FoodLineChart = ({DATA}) => {
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
    const [yAxis, setYAxis] = useState(0);
    const updateY = (increment) => {
        setYAxis((yAxis + (increment ? 1 : -1)) % DIMENSIONS.length);
    }
	return (
		<div className="commit-graph-wrapper">
            <div className="controls">
				<button onClick={updateY.bind(null,false)}>❮</button>
				<div> {`${DIMENSIONS[yAxis]}`} </div>
				<button onClick={updateY.bind(null, true)}>❯</button>
			</div>
            <XYPlot width={window.innerWidth - 60} height={150}>
                <VerticalBarSeriesCanvas animation className="vertical-bar-series-example" data={DATA.map(e => ({
                    id: e.name,
                    x: (new Date(e.time)).getTime(),
                    y: (e[DIMENSIONS[yAxis]] ?? 0)
                }))} />
                <XAxis />
                <YAxis />
            </XYPlot>
			<article className="description">
				This graph displays the {DIMENSIONS[yAxis]} consumption with respect to time. 
			</article>
		</div>
	);
}

export default FoodLineChart;
