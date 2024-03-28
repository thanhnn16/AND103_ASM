import PropTypes from 'prop-types';
import { useSelector} from 'react-redux';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// HOC function
function withAuthCheck(WrappedComponent) {
  const AuthCheckComponent = (props) => {
    const navigate = useNavigate();

    const user = useSelector(state => state.auth.user);

    useEffect(() => {
      if (!user || Object.keys(user).length === 0) {
        navigate('/login');
      }
    }, [user, navigate]);

    return <WrappedComponent {...props} />;
  }
  AuthCheckComponent.propTypes = {
    user: PropTypes.object,
  };

  return AuthCheckComponent;
}

export { withAuthCheck };
