import { component$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import {
  QwikCityProvider,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";
import { ChartTypeRegistry } from "chart.js";
import ChartGraph from "./components/chart/chart";

export default component$(() => {

  interface ChartProps {
    labels: string[];
    label: string;
    chartType: keyof ChartTypeRegistry;
    data: number[]
  }
  
  const chartProps = useSignal({
    labels: ["Label", "Label", "Label", "Label", "Label", "Label"],
    label: "Chart Label",
    chartType: "bar" as keyof ChartTypeRegistry,
    data: [12, 19, 3, 5, 2, 3],
  });

  useVisibleTask$(async ()=>{
    await fetch("test.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Erro na requisição: ${response.statusText}`
          );
        }
        return response.json() as Promise<ChartProps>;
      })
      .then((response) => {
        chartProps.value = response
    });
  })

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <ChartGraph {...chartProps.value} toTrack={chartProps} className="chart" />
      </body>
    </QwikCityProvider>
  );
});
