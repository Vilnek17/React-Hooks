import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState({
    coffee: 0,
    sugar: 0,
  });
  const [coffeeLeft, setCoffeeLeft] = useState(true);
  const [sugarLeft, setSugarLeft] = useState(true);

  const addCoffee = () => setProducts((prevState) => {
    return {
      ...prevState,
      coffee: prevState.coffee + 1
    }
  });
  const addSugar = () => setProducts((prevState) => {
        console.log(prevState);
      return {
        ...prevState,
        sugar: prevState.sugar + 1
    }
  });
  const removeCoffee = () => setProducts((prevState) => {
    if (prevState.coffee > 0) {
      return {
        ...prevState,
        coffee: prevState.coffee - 1
      }
    } else {
      return prevState;
    }
  });
  const removeSugar = () => setProducts((prevState) => {
    if (prevState.sugar > 0) {
      return {
        ...prevState,
        sugar: prevState.sugar - 1
      }
    } else {
      return prevState;
    }
  });

  const save = () => {
    localStorage.setItem('coffee', products.coffee);
    localStorage.setItem('sugar', products.sugar);
  }

  const clear = () => {
      localStorage.removeItem('coffee');
      localStorage.removeItem('sugar');
      setProducts({
        coffee: 0,
        sugar: 0
      });
  }

  useEffect(()=>{
    if (localStorage.getItem('coffee')){
      setProducts({
        coffee: +localStorage.getItem('coffee'),
        sugar: +localStorage.getItem('sugar')
      });
    }
  }, []);

  useEffect(() => {
      setCoffeeLeft(products.coffee <= 0); 
  }, [products.coffee])
  useEffect(() => {
      setSugarLeft(products.sugar <= 0); 
  }, [products.sugar])
    
    
  return (
    <div className="wrapper">
      <div className="list">
        <h1>Product list</h1>
        <div className='product'>
        <span>{`Coffe: ${products.coffee}`}</span>
        <button onClick={addCoffee}>Add</button>
        {!coffeeLeft && <button onClick={removeCoffee}>Remove</button>}
        </div>
        <div className='product'>
        <span>{`Sugar: ${products.sugar}`}</span>
          <button onClick={addSugar}>Add</button>
          {!sugarLeft && <button onClick={removeSugar}>Remove</button>}
        </div>
        <div className='save'>
            <button onClick={save}>SAVE</button>
            <button onClick={clear}>CLEAR</button>
          </div>
      </div>
    </div> 
  );
}

export default App;
