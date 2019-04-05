import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [cn, setCount] = useState(0);
  const cnRef = useRef(1);

  useEffect(() => {
    console.log('a');
    setCount(cn => cn);
  });

  console.log('b', cn);
  return (
    <span>{cn}</span>
  );
}

export default App;
