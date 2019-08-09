import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function ResistorSVG({ code }) {

  const bands = code.length;

  if (!_.inRange(bands, 3, 6)) {
    throw new Error(`ResistorSVG: expected array of 3, 4 or 5 elements, got: ${bands}`);
  }

  code = code.map(color => color.toLowerCase());

  const width = (bands === 5) ? 35 : 45;

  const bandsArr = {
    3: [
      {
        x: 185.05522,
        y: 193.97354,
        height: 150.48511,
        width,
      },
      {
        x: 226.65579,
        y: 18.901487,
        height: 112.64787,
        width,
      },
      {
        x: 338.36636,
        y: 18.901487,
        height: 112.64787,
        width,
      },
    ],
    4: [
      {
        x: 185.05522,
        y: 193.97354,
        height: 150.48511,
        width,
      },
      {
        x: 226.65579,
        y: 18.901487,
        height: 112.64787,
        width,
      },
      {
        x: 338.36636,
        y: 18.901487,
        height: 112.64787,
        width,
      },
      {
        x: 447.96912,
        y: 0.0264872,
        height: 150.48511,
        width,
      },
    ],
    5: [
      {
        x: 160,
        y: 193.97354,
        height: 150.48511,
        width,
      },
      {
        x: 155,
        y: 0,
        height: 150.48511,
        width,
      },
      {
        x: 245,
        y: 18.901487,
        height: 112.64787,
        width,
      },
      {
        x: 330,
        y: 18.901487,
        height: 112.64787,
        width,
      },
      {
        x: 447.96912,
        y: 0.0264872,
        height: 150.48511,
        width,
      },
    ],
  };

  const rects = code.map((color, index) =>
    <rect ry="0"
      key={index}
      {...bandsArr[bands][index]}
      className={`is-${color}`}
    />
  );

  return (

    <svg
      className="resistor-svg"
      xmlns="http://www.w3.org/2000/svg"
      height="42.473526mm"
      width="174.7043mm"
      viewBox="0 0 619.03099 150.49675"
      id="svg2">

      <rect
        style={{fill: '#808080', fillOpacity: 1}}
        id="rect3292"
        width="100.33115"
        height="27.869762"
        x="522.83673"
        y="-764169.5"
        ry="13.934881" />
      <g
        id="g3298"
        transform="translate(-68.002197,-193.97351)">
        <rect
          style={{fill: '#808080', fillOpacity: 1}}
          id="rect3296"
          width="619.03101"
          height="27.869762"
          x="68.002197"
          y="254.49246"
          ry="13.934881" />
        <g
          style={{fill: '#ffd189', fillOpacity:1}}
          transform="translate(-15.607067,3.3443722)"
          id="g3284">
          <g
            style={{fill: '#ffd189', fillOpacity:1}}
            transform="translate(189.51438,3.3443714)"
            id="g3272">
            <rect
              style={{fill: '#ffd189', fillOpacity:1}}
              id="rect3274"
              width="162.7594"
              height="112.59386"
              x="152.72629"
              y="206.23622"
              ry="0" />
            <rect
              ry="30.099342"
              y="187.28477"
              x="294.30466"
              height="150.49673"
              width="153.84108"
              id="rect3276"
              style={{fill: '#ffd189', fillOpacity:1}} />
          </g>
          <g
            style={{fill: '#ffd189', fillOpacity:1}}
            id="g3278"
            transform="matrix(-1,0,0,-1,595.29807,528.41065)">
            <rect
              ry="0"
              y="206.23622"
              x="152.72629"
              height="112.59386"
              width="162.7594"
              id="rect3280"
              style={{fill: '#ffd189', fillOpacity:1}} />
            <rect
              style={{fill: '#ffd189', fillOpacity:1}}
              id="rect3282"
              width="153.84108"
              height="150.49673"
              x="294.30466"
              y="187.28477"
              ry="30.099342" />
          </g>
        </g>
      </g>
      <g
        transform="translate(-68.002197,-193.97351)">
        { rects[0] }
      </g>
      { rects.slice(1) }
    </svg>

  );
}

ResistorSVG.propTypes = {
  code: PropTypes.array.isRequired,
};

export default ResistorSVG;
