import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { ChartTypeRegistry, registerables } from "chart.js";
import { Chart } from "chart.js";

interface props {
    labels: string[],
    label: string,
    data: number[]
    chartType: keyof ChartTypeRegistry,
    datasets?: any,
    options?: any
}

export const ChartGraph = component$<props>(({label, labels, data, chartType, datasets={}, options={}}) => {
    const myChart  = useSignal<HTMLCanvasElement>();

  
    useVisibleTask$(() => {
      if (myChart?.value) {
        Chart.register(...registerables);
        new Chart(myChart.value, {
          type: chartType,
          data: {
            labels: labels,
            datasets: [{
              label: label,
              data: data,
              borderWidth: 1,
              ...datasets
            }]
          },
          options: {
            ...options
          }
        });
      }
    });
  
    return (
      <div>
        <canvas ref={myChart} id="myChart" class="chart"></canvas>
      </div>
    );
  });

  export default ChartGraph