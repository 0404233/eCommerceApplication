import { ReactElement } from 'react';
import { Link } from 'react-router';

export default function SignInLink(): ReactElement {
  return (
    <p style={{ textAlign: 'center', margin: 0 }}>
      Already have an account? <Link to="/login">Sign up</Link>
      <br />
      <Link to="/main" style={{ fontSize: '20px' }}>
        Go to Store
      </Link>
    </p>
  );
}
