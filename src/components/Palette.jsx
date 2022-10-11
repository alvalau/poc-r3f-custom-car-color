import React from 'react';
import './Palette.scss';
import {useUpdateAtom} from 'jotai/utils';
import {updateCustomColorAtom} from '../App';

const Palette = () => {
  const updateCustomColor = useUpdateAtom(updateCustomColorAtom);
  const colorOptions = {
    carpaint: ['#ffffff', '#df0000', '#ffff00', '#00009f'],
    interior: ['#383838', '#74644E'],
  };

  const _renderPicker = (colorKey, color) => {
    return (
      <div
        key={`${colorKey + color}`}
        className="picker"
        onClick={() => updateCustomColor({key: colorKey, value: color})}
        style={{
          background: color,
        }}></div>
    );
  };

  const _renderPickersGrp = (text, colorKey, options) => {
    return (
      <div className="pickers-grp">
        <span className="title">{text}</span>
        <div>{options.map(color => _renderPicker(colorKey, color))}</div>
      </div>
    );
  };

  return (
    <div className="palette">
      {_renderPickersGrp('Paint', 'carpaint', colorOptions.carpaint)}
      {_renderPickersGrp('Interior', 'interior', colorOptions.interior)}
    </div>
  );
};

export default Palette;

Palette.propTypes = {};
Palette.defaultProps = {};
