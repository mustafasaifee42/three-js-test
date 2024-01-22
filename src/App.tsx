import { BoxView } from './BoxView';

function App() {

  return (
    <div 
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1px',
        width: '100vw',
      }}
    >
      <div 
        style={{
          width: 'calc(50% - 0.5px)',
          height: '50vh'
        }}
      >
        <BoxView />
      </div>
      <div 
        style={{
          width: 'calc(50% - 0.5px)',
          height: '50vh'
        }}
      >
        <BoxView />
      </div>
      <div 
        style={{
          width: 'calc(50% - 0.5px)',
          height: '50vh'
        }}
      >
        <BoxView />
      </div>
      <div 
        style={{
          width: 'calc(50% - 0.5px)',
          height: '50vh'
        }}
      >
        <BoxView />
      </div>
    </div>
  )
}

export default App
