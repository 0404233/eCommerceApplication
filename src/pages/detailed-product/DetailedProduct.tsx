import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

export default function DetailedProduct(): ReactElement {
  const location = useLocation();
  const carID = location.pathname.replace('/product/', '');

  return (
    <>
      <h1>Detailed Product page; ID car: {carID}</h1>
    </>
  );
}
