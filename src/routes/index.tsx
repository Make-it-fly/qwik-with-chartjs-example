import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ChartTypeRegistry } from "chart.js";
import ChartGraph from "~/components/chart/chart";

export default component$(() => {
  const chartProps = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6"],
    label: "Chart Label",
    chartType: "bar" as keyof ChartTypeRegistry,
    data: [12, 19, 3, 5, 2, 3],
  };
  
  return (
    <>
      <h1>Olá 👋</h1>
      <h2>Aqui estão alguns exemplos para utilizar o chart.js:</h2>
      <span>Este aqui é um gráfico de barras:</span>
      <ChartGraph {...chartProps} />
      <span>Já este, é um gráfico de pizza:</span>
      <ChartGraph {...chartProps} chartType="line" />
      <span>Você pode passar atributos do Chart.js por props, veja no código o exemplo:</span>
      <ChartGraph {...chartProps} chartType="pie" datasets={{
        backgroundColor: ["red", "blue", "green", "black", "cyan", "orange"],
        hoverBorderColor: "yellow",
        hoverBorderWidth: 5
      }}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "ChartJs Example",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
