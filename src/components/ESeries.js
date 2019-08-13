import React from 'react';
import PropTypes from 'prop-types';
import { stripZero } from "../lib/utils";

import Table from 'react-bootstrap/Table';
//import Badge from 'react-bootstrap/Badge';

import {base} from "../lib/utils";
import { bandsToESeries, eseriesToTolerances, getTriple } from "../lib/eseries";

const ResistanceLink = ({base, onBaseChange}) =>
    <a onClick={(e) => {
      e.preventDefault();
      onBaseChange(base);
    }}
       href="#">{base}</a>;

const ToleranceLink = ({tolerance, onToleranceChange}) =>
    <a onClick={(e) => {
      e.preventDefault();
      onToleranceChange(tolerance);
    }}
       href="#">{stripZero(tolerance)}</a>;

/*const QuestionBadge = () => (
  <Badge pill variant="info"
    style={{
      display: 'inline',
      lineHeight: 2,
      verticalAlign: 'top',
      cursor: 'pointer',
    }}
  >
    ?
  </Badge>
);*/


export default function ESeries({
  resistor,
  onBaseChange,
  onToleranceChange,
}) {
  const {resistance, tolerance, bands} = resistor;
  const baseResistance = base(resistance);
  const eseries = bandsToESeries[bands];

  return (
    <div className="ESeries">

      <Table striped hover size="sm">
        <thead>
          <tr>
            <th>E-Series {/*<QuestionBadge />*/}</th>
            <th>Tolerances [%]</th>
            <th>Less</th>
            <th>Equal</th>
            <th>Greater</th>
          </tr>
        </thead>
        <tbody>
        {eseries.map(series => {
          const [smaller, equal, greater] = getTriple(baseResistance, series);
          return (
            <tr key={series}>
              <td>{series}</td>
              <td>{eseriesToTolerances[series].map((tol, index) => (
                <React.Fragment key={index}>
                  {tolerance !== tol ? <ToleranceLink tolerance={tol} onToleranceChange={onToleranceChange}/> :
                    stripZero(tolerance)}
                  {index < eseriesToTolerances[series].length - 1 ? ', ' : ''}
                </React.Fragment>
              ))}
              </td>
              <td>{smaller ? <ResistanceLink base={smaller} onBaseChange={onBaseChange} /> : '—'}</td>
              <td>{equal ? equal : '—'}</td>
              <td>{greater ? <ResistanceLink base={greater} onBaseChange={onBaseChange} /> : '—'}</td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    </div>
  );
}

ESeries.propTypes = {
  resistor: PropTypes.object.isRequired,
  onBaseChange: PropTypes.func.isRequired,
  onToleranceChange: PropTypes.func.isRequired,
};
