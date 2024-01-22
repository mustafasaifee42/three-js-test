import { useReducer } from 'react';
import { BoxView } from './BoxView';
import Reducer from './Context/Reducer';
import Context from './Context/Context';

function App() {
  const initialState = {
    x: undefined,
    y: undefined,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateX = (value?: number) => {
    dispatch({
      type: 'UPDATE_X',
      payload: value,
    });
  };

  const updateY = (value?: number) => {
    dispatch({
      type: 'UPDATE_Y',
      payload: value,
    });
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1px',
        width: '100vw',
      }}
    >
      <Context.Provider
        value={{
          ...state,
          updateY,
          updateX,
        }}
      >
        <div 
          style={{
            width: 'calc(50% - 0.5px)',
            height: '50vh'
          }}
        >
          <BoxView fileName='Grayscale.json' colors={['#252525', '#f7f7f7']} />
        </div>
        <div 
          style={{
            width: 'calc(50% - 0.5px)',
            height: '50vh'
          }}
        >
          <BoxView fileName='Aluminium.json' colors={['#eff3ff', '#08519c']}  />
        </div>
        <div 
          style={{
            width: 'calc(50% - 0.5px)',
            height: '50vh'
          }}
        >
          <BoxView fileName='Copper.json' colors={['#edf8e9', '#006d2c']}  />
        </div>
        <div 
          style={{
            width: 'calc(50% - 0.5px)',
            height: '50vh'
          }}
        >
          <BoxView fileName='Iron.json' colors={['#feedde', '#a63603']}  />
        </div>
    </Context.Provider>
    </div>
  )
}

export default App
