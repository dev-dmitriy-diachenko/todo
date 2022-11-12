import PropTypes from 'prop-types';

import './Button.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google',
};

export const Button = (props) => {
  const { type, buttonType, children, onClick } = props;

  return (
    <button
      className={`button ${BUTTON_TYPE_CLASSES[buttonType]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  buttonType: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'submit',
  buttonType: '',
  onClick: () => null,
};
