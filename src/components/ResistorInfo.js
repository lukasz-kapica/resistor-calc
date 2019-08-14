import React from "react";
import PropTypes from "prop-types";
import {boundaries, magnitude} from "../lib/utils";

import Badge from "react-bootstrap/Badge";

export default function ResistorInfo({
  resistor,
}) {
  const {resistance, tolerance} = resistor;
  const resistanceStr = magnitude(resistance);
  const [lowerBound, upperBound] = boundaries(resistance, tolerance);
  const boundsStr = `${magnitude(lowerBound)}Ω - ${magnitude(upperBound)}Ω`;

  return (
    <h2 className="resistor-info">
      <span>{resistanceStr}Ω ± {tolerance}%</span>
      <Badge className="bounds">{boundsStr}</Badge>
    </h2>
  );
}

ResistorInfo.propTypes = {
  resistor: PropTypes.object.isRequired,
};
