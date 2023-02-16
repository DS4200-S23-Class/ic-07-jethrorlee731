const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 200;
const MARGINS = {left: 100, right: 50, top: 50, bottom: 100};

// Binding data
const data = [55000, 48000, 27000, 66000, 90000];

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// Add frame
const FRAME =
d3.select('#vis')
	.append('svg')
		.attr('height', FRAME_HEIGHT)
		.attr('width', FRAME_WIDTH)
		.attr('class', 'frame');

// scaling functions

const MAX_Y = d3.max(data, (d) => {return d;});

const Y_SCALE = d3.scaleLinear()
				  .domain([0, (MAX_Y + 10000)])
				  .range([0, VIS_HEIGHT]);

// Add points based on data
FRAME.selectAll('points')
	.data(data)
	.enter()
	.append('circle')
		.attr('cx', 50 + MARGINS.left)
		.attr('cy', (d) => {
			return (Y_SCALE(d) + MARGINS.bottom);
	})
		.attr('r', 5)
		.attr('class', 'point');

 // add an axis
 // g is a placeholder for a generic SVG
FRAME.append('g')
		.attr('transform',
			'translate(' + MARGINS.left + ',' + (MARGINS.bottom + ')'))
		.call(d3.axisLeft(Y_SCALE).ticks(4))
			.attr('font-size', '20px');