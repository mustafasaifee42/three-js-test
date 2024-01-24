import { useState, useRef, useEffect, useContext } from "react";
import BoxViewCanvas from "./BoxViewCanvas";
import { CtxDataType, Datatype } from "../Types";
import Context from "../Context/Context";

interface Props {
  fileName: string;
  colors: [string, string];
  grayScaleData: Datatype;
}

export function BoxView(props: Props) {
    const { fileName, colors, grayScaleData } = props;
    const {
      x,
      y,
    } = useContext(Context) as CtxDataType;
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [data, setData] = useState<Datatype | undefined>(undefined);

    const graphDiv = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (graphDiv.current) {
        setWidth(graphDiv.current.clientWidth);
        setHeight(graphDiv.current.clientHeight);
      }
    }, [graphDiv]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`./data/${fileName}`); // Adjust the path accordingly
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching JSON data:', error);
        }
      };
  
      fetchData();
    }, [fileName]);
    return (
      <div 
        ref={graphDiv} 
        style={{ 
          flexGrow: 1,
          height: '50vh',
        }}>
        {width && height && data ? (
          <>
            {
              x !== undefined && y !== undefined ?
              <div style={{
                padding: '0.5rem',
                backgroundColor: 'rgba(255,255,255,0.75)',
                position: 'absolute',
                zIndex: '10',
                margin: '1rem 0 0 1rem',
              }}>
                <p>X: {x}</p>
                <p>Y: {y}</p>
                <p>Value: {data.data[y * data.res_x + x]} </p>
              </div> : null
            }
            <BoxViewCanvas
              width={width}
              height={height}
              data={data}
              colors={colors}
              grayScaleData={grayScaleData}
            />
          </>
        ) : null}
      </div>
    );
  }