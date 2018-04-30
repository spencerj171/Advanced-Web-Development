let width = 800;
let height = 400;
let barPadding = 10;
let svg = d3.select("svg")
              .attr("width", width)
              .attr("height", height);

d3.select("#reset")
  .on("click", function() {
    d3.selectAll(".letter")
      .remove();

    d3.select("#phrase")
      .text("");

    d3.select("#count")
      .text("");
  });

d3.select("form")
  .on("submit", function() {
    d3.event.preventDefault();
    let input = d3.select("input");
    let text = input.property("value");
    let data = getFrequencies(text);
    let barWidth = width / data.length - barPadding;

    let letters = svg
                    .selectAll(".letter")
                    .data(data, function(d) {
                      return d.character;
                    });

    letters
        .classed("new", false)
      .exit()
      .remove();

    let letterEnter = letters
      .enter()
      .append("g")
        .classed("letter", true)
        .classed("new", true);

    letterEnter.append("rect");
    letterEnter.append("text");

    letterEnter.merge(letters)
      .select("rect")
        .style("width", barWidth)
        .style("height", function(d) {
          return d.count * 20;
        })
        .attr("x", function(d, i) {
          return (barWidth + barPadding) * i;
        })
        .attr("y", function(d) {
          return height - d.count * 20;
        });

    letterEnter.merge(letters)
      .select("text")
        .attr("x", function(d, i) {
          return (barWidth + barPadding) * i + barWidth / 2;
        })
        .attr("text-anchor", "middle")
        .attr("y", function(d){
          return height - d.count * 20 - 10;
        })
        .text(function(d){
          return d.character;
        });

    d3.select("#phrase")
      .text("Analysis of: " + text);

    d3.select("#count")
      .text("(New characters: " + letters.enter().nodes().length + ")");

    input.property("value", "");
  });

function getFrequencies(str) {
  let sorted = str.split("").sort();
  let data = [];

  for(let i = 0; i < sorted.length; i++) {
    let last = data[data.length - 1];

    if(last && last.character === sorted[i]) last.count++;
    else data.push({character: sorted[i], count: 1});
  } return data;
}
