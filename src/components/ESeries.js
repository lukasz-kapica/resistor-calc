import React from 'react';
import PropTypes from 'prop-types';

import {TH} from './shared';

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
      <Table striped hover size="sm" className='text-center'>
        <thead>
          <tr>
            <TH full='E-Series'       abbr='EIA' />
            <TH full='Tolerances [%]' abbr='Tol. [%]' />
            <TH full='Less'           abbr='<' />
            <TH full='Equal'          abbr='=' />
            <TH full='Greater'        abbr='>' />
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
