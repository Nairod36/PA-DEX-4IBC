import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";
import { useEffect, useRef, useState } from "react";


Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

interface LineChartProps {
    data:number[]
}

export const Linechart = (props:LineChartProps) => {
    const chartContainer = useRef(null);
    
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, {
        type: 'line',
        data: {
            labels: props.data,
            datasets: [{
                data: props.data,
                fill: false,
                borderColor:props.data[props.data.length-1] >= props.data[0] ? 'rgb(20, 218, 93)' : 'rgb(197, 50, 27)',
                borderWidth:1,
                pointRadius:0
            }]
        },
        options: {
            animations:{
                animation:{
                    easing:'linear',
                    duration:500
                }
            },
            plugins:{
                legend:{
                    display:false
                },
                title:{
                    display:false
                },
                tooltip:{
                    enabled:false
                },
            },
            scales:{
                y:{
                    beginAtZero: true,
                    display:false
                },
                x:{
                    display:false
                }
            },
            elements:{
                line: {
                    tension:0,
                    backgroundColor:'transparent'
                }
            }
        }
      });

      return () => {
        newChartInstance.destroy();
      }
    }
  }, [chartContainer, props.data]);

  return (
    <canvas className="change-chart" ref={chartContainer}/>
  );
}