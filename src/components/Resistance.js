import React from 'react';
import PropTypes from 'prop-types';
import { toleranceAndColor, validResistance } from "../lib/ColorCode";

function ResistanceInput({
  value,
  onResistanceChange,
}) {
  return (
    <label>
      <input
        className="Resistance__resistance-input"
        type="text"
        size={12}
        value={value}
        onChange={(e) => onResistanceChange(e.target.value)}
      />
      Ω
    </label>
  );
}

function ToleranceInput({
  value,
  onToleranceChange,
}) {
  const tolerances = toleranceAndColor.map(tc => tc[0]);

  return (
    <select
      className="Resistance__tolerance-input"
      value={value}
      onChange={(e) => onToleranceChange(+e.target.value)}
    >
      {tolerances.map(t => <option key={t} value={t}>{t}%</option>)}
    </select>
  );
}

function BandSelection({
  value,
  onBandsChange,
}) {

  return (
    <select
      className="Resistance__bands-input"
      value={value}
      onChange={(e) => onBandsChange(+e.target.value)}
    >
      <option value="4">4 bands</option>
      <option value="5">5 bands</option>
    </select>
  );
}

function Resistance({
  resistor,
  onResistanceChange,
  onBandsChange,
  onToleranceChange,
}) {

  const handleResistanceChange = (resistance) => {
    if (validResistance(resistance, resistor.bands) && +resistance !== resistor.resistance) {
      onResistanceChange(+resistance);
    }
  };

  const handleToleranceChange = tolerance =>
    tolerance !== resistor.tolerance && onToleranceChange(tolerance);

  const handleBandsChange = bands =>
    bands !== resistor.bands && onBandsChange(bands);

  const {resistance, tolerance, bands} = resistor;

  return (
    <div className="Resistance">
      <ResistanceInput
        value={resistance}
        onResistanceChange={handleResistanceChange}
      />
      <span style={{fontVariantPosition: 'sub'}}>±</span>
      <ToleranceInput
        value={tolerance}
        onToleranceChange={handleToleranceChange}
      />
      <BandSelection
        value={bands}
        onBandsChange={handleBandsChange}
      />
    </div>
  );
}

Resistance.propTypes = {
  resistor: PropTypes.object.isRequired,
  onResistanceChange: PropTypes.func.isRequired,
  onBandsChange: PropTypes.func.isRequired,
  onToleranceChange: PropTypes.func.isRequired,
};

export default Resistance;