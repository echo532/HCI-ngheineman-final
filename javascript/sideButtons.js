

function createNewButton() {

    //console.log(svg.attr("newOrEditing"));




    buttonTest = d3.select("#web-svg").append("g")
        .attr("id", "new-button")
        .attr("transform", "translate(10, 10)")
        .on("click", function () {
            d3.select("#web-svg").attr("newOrEditing", "new");


            popupGroup = d3.select("#popup-group");
            popupGroup.select("#entryTitle").html('<input type="text" maxlength="20" class="input - field">');
            popupGroup.select("#entryContent").html('<textarea class="textarea-field"> </textarea>');
            popupGroup.select("#popup-group-header").text("New Entry");
            popupGroup.style("display", "block");
            popupGroup.raise();

        });

    //new button
    buttonTest.append("rect")
        .attr("class", "button")
        .attr("width", 100)      // width of the rectangle
        .attr("height", 40)      // height of the rectangle
        .style("cursor", "pointer"); // change cursor to pointer on hover


    // Append text to the group
    buttonTest.append("text")
        .attr("class", "button-text")
        .attr("x", 5) // x-coordinate of the text relative to the group
        .attr("y", 25) // y-coordinate of the text relative to the group
        .style("cursor", "pointer") // change cursor to pointer on hover
        .text("New");
}
function createEditButton() {

    //create edit functionality
    editButtonGroup = d3.select("#web-svg").append("g")
        .attr("id", "edit-button")
        .attr("transform", "translate(10, 80)")
        .on("click", function () {
            let selectedEntry = d3.select("#web-svg").attr("selectedEntry");

            if (selectedEntry !== "-1") {
                d3.select("#web-svg").attr("newOrEditing", "editing");
                editButtonGroup.select("#edit-button-error").style("display", "none");
                const entry = d3.select("#" + selectedEntry);
                let title = entry.select("#entryTitle").text();
                let content = entry.select("#extra-information").text();

                popupGroup = d3.select("#popup-group");
                popupGroup.select("#entryTitle").html('<input type="text" maxlength="20" value=' + title + ' class="input - field">');
                popupGroup.select("#entryContent").html('<textarea class="textarea-field">' + content + '</textarea>');
                popupGroup.select("#popup-group-header").text("Edit Entry");
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