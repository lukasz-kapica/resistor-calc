import React from "react";
import PropTypes from "prop-types";
import {boundaries, magnitude} from "../lib/utils";

import Badge from "react-bootstrap/Badge";

import styles from '../styles/ResistorInfo.module.css';

export default function ResistorInfo({
  resistor,
}) {
  const {resistance, tolerance} = resistor;
  const resistanceStr = magnitude(resistance);
  const [lowerBound, upperBound] = boundaries(resistance, tolerance);
  const boundsStr = `${magnitude(lowerBound)}Ω - ${magnitude(upperBound)}Ω`;

  return (
    <h2 className={styles.resistorInfo}>
      <span className={`d-block d-md-inline ${styles.vertMid}`}>
        {resistanceStr}Ω ± {tolerance}%
      </span>
      <Badge className={styles.bounds}>{boundsStr}</Badge>
    </h2>
  );
}

ResistorInfo.propTypes = {
  resistor: PropTypes.object.isRequired,
};
