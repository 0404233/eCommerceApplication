import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

export default function DetailedProduct(): ReactElement {
  const location = useLocation();
  const id = location.state?.id;

  return (
    <>
      <h1>Detailed Product page; ID car:{id}</h1>
    </>
  );
}
