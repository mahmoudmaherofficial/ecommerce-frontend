import { useEffect, useState } from 'react';
import { Button, InputGroup } from 'react-bootstrap';

export default function PlusAndMinusBtn(props) {
  const { product, setBtnCount, btnCount, width, changeCartCount } = props;
  const [count, setCount] = useState(1);
  console.log(count);

  useEffect(() => {
    setBtnCount(count);
    if (changeCartCount) {
      changeCartCount(product, count);
    }
  }, [count]);

  useEffect(() => {
    if (btnCount) {
      setCount(btnCount);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setCount(e.target.value);
  };
  return (
    <div className={`plus-and-minus-btn w-${width || '50'}`}>
      <InputGroup>
        <Button variant="outline-secondary" onClick={() => count !== 0 && setCount(+count - 1)} id="minus">
          -
        </Button>
        <input type="text" className="form-control" value={count} onChange={handleChange} />
        <Button variant="outline-secondary" onClick={() => setCount(+count + 1)} id="plus">
          +
        </Button>
      </InputGroup>
    </div>
  );
}
