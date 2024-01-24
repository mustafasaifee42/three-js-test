import { useEffect, useReducer, useState } from 'react';
import { BoxView } from './BoxView';
import Reducer from './Context/Reducer';
import Context from './Context/Context';
import { Datatype } from './Types';

function App() {
  const initialState = {
    x: undefined,
    y: undefined,
  };
  const [grayScaleData, setGrayScaleData] = useState<Datatype | undefined>(undefined)
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`./data/Grayscale.json`); // Adjust the path accordingly
        const data = await response.json();
        setGrayScaleData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

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
        {
          grayScaleData ? (
            <>          
              <div 
                style={{
                  width: 'calc(50% - 0.5px)',
                  height: '50vh'
                }}
              >
                <BoxView fileName='Aluminium.json' colors={['#eff3ff', '#08519c']} grayScaleData={grayScaleData} />
              </div>
              <div 
                style={{
                  width: 'calc(50% - 0.5px)',
                  height: '50vh'
                }}
              >
                <BoxView fileName='Aluminium.json' colors={['#eff3ff', '#08519c']} grayScaleData={grayScaleData} />
              </div>
              <div 
                style={{
                  width: 'calc(50% - 0.5px)',
                  height: '50vh'
                }}
              >
                <BoxView fileName='Copper.json' colors={['#edf8e9', '#006d2c']} grayScaleData={grayScaleData} />
              </div>
              <div 
                style={{
                  width: 'calc(50% - 0.5px)',
                  height: '50vh'
                }}
              >
                <BoxView fileName='Iron.json' colors={['#feedde', '#a63603']} grayScaleData={grayScaleData} />
              </div>
            </>
          ) : null
        }
    </Context.Provider>
    </div>
  )
}

export default App
