import { useState, useRef, useEffect } from "react";
import BoxViewCanvas from "./BoxViewCanvas";
import { Datatype } from "../Types";

export function BoxView() {
  
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
          const response = await fetch('./data/minified.json'); // Adjust the path accordingly
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching JSON data:', error);
        }
      };
  
      fetchData();
    }, []);
    return (
      <div 
        ref={graphDiv} 
        style={{ 
          flexGrow: 1,
          height: '50vh',
        }}>
        {width && height && data ? (
          <BoxViewCanvas
            width={width}
            height={height}
            data={data}
          />
        ) : null}
      </div>
    );
  }