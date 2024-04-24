


function createDraggableEntry(svg, inputText) {


    // Append a circle to the SVG
    const entry = svg.append("g")
        .attr("transform", "translate(200, 200)")
        .attr("id", "entry" + counterCreated)
        .on("click", function () {
            selectEntry(d3.select(this).attr("id"));

        });

    entry.append("rect")
        .attr("id", "outerBox")
        .attr("display", "none")
        .attr("x", -5) // Adjust x position to create padding
        .attr("y", -5) // Adjust y position to create padding
        .attr("width", 160) // Set the width of the outer rectangle
        .attr("height", 50) // Set the height of the outer rectangle
        .classed("outerBox", true)

    entry.append("rect")
        .attr("id", "innerBox")
        .attr("width", 150)      // width of the rectangle
        .attr("height", 40)      // height of the rectangle
        .classed("innerBox", true)

    // Append text to the group
    entry.append("text")
        .attr("x", 5) // x-coordinate of the text relative to the group
        .attr("y", 25) // y-coordinate of the text relative to the group
        .classed("entryText", true)
        .text(inputText);




    entry.append("rect")
        .attr("x", 130) // x-coordinate of the text relative to the group
        .attr("y", 0) // y-coordinate of the text relative to the group
        .attr("width", 20)      // width of the rectangle
        .attr("height", 20)     // height of the rectangle
        .classed("deleteButton", true)
        .text("X")
        .on("click", function () {

            entry.remove();
            //event.stopPropagation(); //stop click from overriding

        });

    // Define drag behavior
    const dragHandler = d3.drag()
        .on("start", function (event) {
            // Record the starting position of the group
            d3.select(this).attr("initialX", event.x);
            d3.select(this).attr("initialY", event.y);
        })
        .on("drag", function (event) {
            // Calculate the new position of the group based on the drag movement
            const dx = event.x - parseFloat(d3.select(this).attr("initialX"));
            const dy = event.y - parseFloat(d3.select(this).attr("initialY"));
            const newX = parseFloat(d3.select(this).attr("transform").split(",")[0].split("(")[1]) + dx;
            const newY = parseFloat(d3.select(this).attr("transform").split(",")[1].split(")")[0]) + dy;

            // Update the position of the group
            d3.select(this).attr("transform", "translate(" + newX + "," + newY + ")");

            // Update the initial position for the next drag event
            d3.select(this).attr("initialX", event.x);
            d3.select(this).attr("initialY", event.y);
        });

    // Apply drag behavior to the circle
    entry.call(dragHandler);

    return entry;


}