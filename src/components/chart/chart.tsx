import { Signal, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { ChartTypeRegistry, registerables } from "chart.js";
import { Chart } from "chart.js";

interface props {
  id?: string;
  className?: string;
	labels: string[];
	label: string;
	data: number[];
	chartType: keyof ChartTypeRegistry;
	datasets?: any;
	options?: any;
  toTrack?: Signal
}

const destroyExistingChartsOnCanvas = (canvas: HTMLCanvasElement | undefined) => {
  if (canvas) {
    const chartInstance = Chart.getChart(canvas);
    if (chartInstance) chartInstance.destroy();
  }
}

export const ChartGraph = component$<props>(
	({ label, labels, data, chartType, datasets = {}, options = {}, id = "test", className = "chart", toTrack}) => {
		const canvas = useSignal<HTMLCanvasElement>();

		useVisibleTask$(({track}) => {
      if (toTrack) {
        track(toTrack)
      }
      
      
      if (canvas?.value) {
          destroyExistingChartsOnCanvas(canvas.value)
          
          Chart.register(...registerables);
          const thisChart = new Chart(canvas.value, {
            type: chartType,
            data: {
              labels: labels,
              datasets: [
                {
                  label: label,
                  data: data,
                  borderWidth: 1,
                  ...datasets,
                },
              ],
            },
            options: {
              ...options,
              onClick: (e) => {
                console.log("clicou")
              }
            },
          });
        }

      });
		return (
			<div>
				<canvas ref={canvas} id={id} class={className}></canvas>
			</div>
		);
	}
);

export default ChartGraph;
