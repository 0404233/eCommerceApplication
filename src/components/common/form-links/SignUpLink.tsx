import { ReactElement } from 'react';
import { Link } from 'react-router';

export default function SignUpLink(): ReactElement {
  return (
    <p style={{ textAlign: 'center' }}>
      Don't have an account? <Link to="/register">Sign up</Link>
      <br />
      <Link to="/main" style={{ fontSize: '20px' }}>
        Go to Store
      </Link>
    </p>
  );
}
