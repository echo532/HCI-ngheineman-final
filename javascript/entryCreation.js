
function entryHelper(entry, input1, input2, tabColor) {


    //highlight box
    entry.append("rect")
        .attr("id", "highlight")
        .attr("x", -10) // Adjust x position to create padding
        .attr("y", -10) // Adjust y position to create padding
        .attr("width", 175) // Set the width of the outer rectangle
        .attr("height", 60) // Set the height of the outer rectangle
        .attr("rx", 10) // Set horizontal radius
        .attr("ry", 10) // Set vertical radius
        .classed("highlight", true)

    //tab
    let colorPopupOpen = false;
    const tab = entry.append("rect")
        .attr("class", "tab") // Apply 'tab' class for styling
        .attr("x", 10) // Adjust x position to create tab on the side
        .attr("y", -20)
        .attr("width", 90) // Set the width of the tab
        .attr("height", 65) // Set the height of the tab
        .attr("rx", 10) // Set horizontal radius
        .attr("ry", 10) // Set vertical radius
        .attr("fill", tabColor)
        .on("click", function () {

            if (colorPopupOpen) {
                colorPopup.style("display", "none");
                colorPopupOpen = false;
            } else {
                colorPopup.style("display", "block");
                colorPopupOpen = true;
            }
        });

    // Calculate the position for the color popup window above the entry box
    const popupWidth = 105;
    const popupHeight = 55;
    const popupX = 0;
    const popupY = -90; // Adjust to position above the entry box

    // Create the color popup window as a rectangle with rounded corners (speech bubble style)
    const colorPopup = entry.append("g")
        .attr("class", "colorPopup")
        .style("display", "none")
        .attr("transform", "translate(" + popupX + "," + popupY + ")");

    colorPopup.append("rect")
        .attr("class", "popupBackground")
        .attr("width", popupWidth)
        .attr("height", popupHeight)
        .attr("rx", 10) // Rounded corners
        .attr("ry", 10);

    // Define colors and layout for color options
    const colorRows = 2;
    const colorColumns = 4;
    const colorSize = 20; // Size of each color box
    const colorPadding = 5; // Padding between color boxes
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#808080'];

    // Add color options to the color popup
    const colorOptions = colorPopup.selectAll(".colorOption")
        .data(colors)
        .enter()
        .append("rect")
        .attr("class", "colorOption")
        .attr("x", function (d, i) { return (i % colorColumns) * (colorSize + colorPadding) + 5; })
        .attr("y", function (d, i) { return Math.floor(i / colorColumns) * (colorSize + colorPadding) + 5; })
        .attr("width", colorSize)
        .attr("height", colorSize)
        .attr("fill", function (d) { return d; })
        .on("click", function (event, d) {
            // Change the fill color of the tab
            tab.style("fill", d)

            // Hide the color popup
            colorPopup.style("display", "none");
            colorPopupOpen = false;
        });


    //box
    entry.append("rect")
        .attr("id", "mainBox")
        .attr("x", -5) // Adjust x position to create padding
        .attr("y", -5) // Adjust y position to create padding
        .attr("width", 160) // Set the width of the outer rectangle
        .attr("height", 50) // Set the height of the outer rectangle
        .attr("rx", 10) // Set horizontal radius
        .attr("ry", 10) // Set vertical radius
        .classed("mainBox", true)




    // Append text to the group
    entry.append("text")
        .attr("id", "entryTitle")
        .attr("x", 5)
        .attr("y", 25)
        .attr("font-size", "14px")
        .text(input1);



    //delete button
    entry.append("text")
        .attr("x", 135) // x-coordinate of the text relative to the group
        .attr("y", 15) // y-coordinate of the text relative to the group
        .text("X")
        .on("click", function () {
            // console.log(entry.attr("id"));
            // if (entry.attr("id") === svg.attr("selectedEntry")) {
            //     console.log("This should have worked...");
            //     svg.attr("selectedEntry", "-1");
            // }
            entry.remove();
            //event.stopPropagation(); //stop click from overriding

        });

    //extra information box
    const extraInfo = entry.append("g")
        .attr("id", "extra-information")
        .attr("transform", "translate( -50, 60)")
        .style("display", "none")

    extraInfo.append("rect")
        .attr("width", 250)
        .attr("height", 200)
        .attr("fill", "lightgray");

    const foreignObject = extraInfo.append('foreignObject')
        .attr('x', 10)
        .attr('y', 10)
        .attr('width', 230) // Set the width of the foreignObject
        .attr('height', 180); // Set the height of the foreignObject

    // Append HTML content to foreignObject
    foreignObject.append('xhtml:div')
        .attr("id", "extra-information-text")
        .style('width', '100%') // Set the width of the HTML content
        .style('max-height', '1px') // Set the height of the HTML content
        .style('overflow-wrap', 'break-word') // Enable text wrapping
        .style('font-size', '12px')
        .html('' + input2);

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

