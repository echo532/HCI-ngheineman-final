

function createNewButton(svg, newButtonGroup, popupGroup) {

    //creating new functionality
    newButtonGroup.attr("transform", "translate(10, 10)")
        .on("click", function () {
            newOrEditing = "new";
            popupGroup.select("#entryTitle").html('<input type="text" maxlength="20" class="input - field">');
            popupGroup.select("#entryContent").html('<textarea class="textarea-field"> </textarea>');
            popupGroup.style("display", "block");
            popupGroup.raise();

        });

    //new button
    newButtonGroup.append("rect")
        .attr("class", "button")
        .attr("width", 100)      // width of the rectangle
        .attr("height", 40)      // height of the rectangle
        .style("cursor", "pointer"); // change cursor to pointer on hover


    // Append text to the group
    newButtonGroup.append("text")
        .attr("class", "button-text")
        .attr("x", 5) // x-coordinate of the text relative to the group
        .attr("y", 25) // y-coordinate of the text relative to the group
        .style("cursor", "pointer") // change cursor to pointer on hover
        .text("New");
}
function createEditButton(editButtonGroup, popupGroup) {

    //create edit functionality
    editButtonGroup.attr("transform", "translate(10, 80)")
        .on("click", function () {

            entry = d3.select("#" + svg.attr("selectedEntry")).text();
            console.log(entry);
            if (entry !== null) {
                newOrEditing = "editing";
                editButtonGroup.select("#edit-button-error").style("display", "none");
                const entry = d3.select("#" + svg.attr("selectedEntry"));
                let title = entry.select("#entryTitle").text();
                let content = entry.select("#extra-information").text();

                popupGroup.select("#entryTitle").html('<input type="text" maxlength="20" value=' + title + ' class="input - field">');
                popupGroup.select("#entryContent").html('<textarea class="textarea-field">' + content + '</textarea>');

                popupGroup.style("display", "block");
                popupGroup.raise();


            } else {
                editButtonGroup.select("#edit-button-error").style("display", "block");
            }

        });

    //edit button
    editButtonGroup.append("rect")
        .attr("class", "button")
        .attr("width", 100)      // width of the rectangle
        .attr("height", 40)      // height of the rectangle
        .style("cursor", "pointer"); // change cursor to pointer on hover


    // edit text
    editButtonGroup.append("text")
        .attr("class", "button-text")
        .attr("x", 5) // x-coordinate of the text relative to the group
        .attr("y", 25) // y-coordinate of the text relative to the group
        .style("cursor", "pointer") // change cursor to pointer on hover
        .text("Edit");

    //error text
    editButtonGroup.append("text")
        .attr("id", "edit-button-error")
        .attr("x", 0) // x-coordinate of the text relative to the group
        .attr("y", 60) // y-coordinate of the text relative to the group
        .style("fill", "red")
        .style("font-size", "12px")
        .style("display", "none")
        .text("No entry selected.");
}