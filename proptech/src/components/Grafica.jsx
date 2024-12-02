// D3BarChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function Grafica() {
    const svgRef = useRef();

  // Datos para la gráfica de líneas
  const data = [
    { date: "2024-01-01", value: 30 },
    { date: "2024-02-01", value: 50 },
    { date: "2024-03-01", value: 70 },
    { date: "2024-04-01", value: 60 },
    { date: "2024-05-01", value: 90 },
    { date: "2024-06-01", value: 120 },
  ];

  useEffect(() => {
    // Dimensiones del gráfico
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Crear el SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parsear las fechas
    const parseTime = d3.timeParse("%Y-%m-%d");
    data.forEach((d) => {
      d.date = parseTime(d.date);
    });

    // Escalas
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // Definir la línea
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    // Configurar el dominio de las escalas
    x.domain(d3.extent(data, (d) => d.date));
    y.domain([0, d3.max(data, (d) => d.value)]);

    // Ejes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %Y")));

    svg.append("g").call(d3.axisLeft(y).ticks(5));

    // Agregar la línea
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "#2E7D32")
      .attr("stroke-width", 3)
      .attr("d", line)
      .transition()
      .duration(1500);

    // Agregar puntos
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.value))
      .attr("r", 5)
      .attr("fill", "#FF5733");

    // Títulos para los ejes
    svg
      .append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
      .style("text-anchor", "middle")
      .text("Fecha");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - height / 2)
      .style("text-anchor", "middle")
      .text("Valor");

    // Título principal
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Gráfica de Líneas de Ejemplo");

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Grafica;
