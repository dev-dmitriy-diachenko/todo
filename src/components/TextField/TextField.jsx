import PropTypes from 'prop-types';
import { useId } from 'react';

import './TextField.scss';

export const TextField = (props) => {
  const { label, type, name, required, value, onChange } = props;
  const id = useId();

  return (
    <div className="text-field">
      <input
        className="text-field__input"
        type={type}
        name={name}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
      />
      <label
        className={`text-field__label ${value.length && 'text-field__label--shrink'}`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  required: false,
};
