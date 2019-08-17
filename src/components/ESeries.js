import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { base, stripZero } from "../lib/utils";
import { bandsToESeries, eseriesToTolerances, getTriple } from "../lib/eseries";

const ButtonLink = ({children, ...props}) =>
  <Button variant="link"
          style={{padding: 0}}
          {...props} >
    { children }
  </Button>;

const ResistanceLink = ({base, onBaseChange}) =>
  <ButtonLink onClick={() => onBaseChange(base)}>
    { base }
  </ButtonLink>;

const ToleranceLink = ({tolerance, onToleranceChange}) =>
    <ButtonLink onClick={() => onToleranceChange(tolerance)}>
      { stripZero(tolerance) }
    </ButtonLink>;

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
            <th>
              <span className="d-none d-sm-inline">E-Series</span>
              <span className="d-sm-none">EIA</span>
            </th>
            <th>
              <span className="d-none d-sm-inline">Tolerances </span>
              <span className="d-sm-none">Tol. </span>
              [%]
            </th>
            <th>
              <span className="d-none d-sm-inline">Less</span>
              <span className="d-sm-none">&lt;</span>
            </th>
            <th>
              <span className="d-none d-sm-inline">Equal</span>
              <span className="d-sm-none">=</span>
            </th>
            <th>
              <span className="d-none d-sm-inline">Greater</span>
              <span className="d-sm-none">&gt;</span>
            </th>
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
                    <span>{stripZero(tolerance)}</span>}
                  {index < eseriesToTolerances[series].length - 1 ? ', ' : ''}
                </React.Fragment>
              ))}
              </td>
              <td>{smaller ? <ResistanceLink base={smaller} onBaseChange={onBaseChange} /> : '—'}</td>
              <td>{equal ? <span>{equal}</span> : '—'}</td>
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
