import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Icon.scss';

const ICON_TYPE_CLASSES = {
  logo: 'icon--logo',
  github: 'icon--github',
  linkedin: 'icon--linkedin',
};

export const Icon = (props) => {
  const { to, iconType, text } = props;

  return (
    <Link
      className="icon-container"
      to={to}
    >
      <div className={`icon ${ICON_TYPE_CLASSES[iconType]}`} />
      {text && <span className="icon__text">{text}</span>}
    </Link>
  );
};

Icon.propTypes = {
  to: PropTypes.string.isRequired,
  iconType: PropTypes.string,
  text: PropTypes.string,
};

Icon.defaultProps = {
  iconType: '',
  text: '',
};
