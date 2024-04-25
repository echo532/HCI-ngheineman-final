function popupHelper(popupGroup) {

    popupGroup
        .attr("transform", "translate(400, 100)")
        .attr('class', 'popup-group');
    // Create popup background rectangle
    popupGroup.append('rect')
        .attr('class', 'popup-background')
        .attr('x', 100)
        .attr('y', 0)
        .attr('width', 300)
        .attr('height', 400);

    //popup title
    popupGroup.append('text')
        .attr('x', 150)
        .attr('y', 60)
        .attr('font-size', '40px')
        .text("New Entry");

    // Text input with character limit
    popupGroup.append('foreignObject')
        .attr("id", "entryTitle")
        .attr('x', 150)
        .attr('y', 100)
        .attr('width', 200)
        .attr('height', 30)
        .html('<input type="text" maxlength="20" placeholder="Enter text (max 20 characters)" class="input-field">');

    // Larger text input without character limit
    popupGroup.append('foreignObject')
        .attr("id", "entryContent")
        .attr('x', 150)
        .attr('y', 150)
        .attr('width', 200)
        .attr('height', 200)
        .html('<textarea placeholder="Enter text" class="textarea-field"></textarea>');

    // Submit button
    const submitButton = popupGroup.append('g')
        .attr('class', 'popup-submit-button')
        .attr('transform', 'translate(150, 360)')
        .style('cursor', 'pointer')
        .on('click', function () {
            const textInput1Value = d3.select('input').property('value');
            const textInput2Value = d3.select('textarea').property('value');

            if (textInput1Value.trim() === '') {
                alert('Please enter text in the top field.');
                return;
            }

            if (newOrEditing === "editing") {
                const entry = d3.select("#" + selectedEntry);
                entry.select("#entryTitle").text(textInput1Value);
                entry.select("#extra-information").select("#extra-information-text").html(textInput2Value);
            } else if (newOrEditing === "new") {
                addEntry(textInput1Value, textInput2Value);
            }

            popupGroup.style('display', 'none');
        });

    submitButton.append('rect')
        .attr('width', 80)
        .attr('height', 30);

    submitButton.append('text')
        .attr('x', 40)
        .attr('y', 20)
        .text('Submit');

    // Cancel button
    const cancelButton = popupGroup.append('g')
        .attr('class', 'popup-cancel-button')
        .attr('transform', 'translate(270, 360)')
        .style('cursor', 'pointer')
        .on('click', function () {
            popupGroup.style('display', 'none');
        });

    cancelButton.append('rect')
        .attr('width', 80)
        .attr('height', 30);

    cancelButton.append('text')
        .attr('x', 40)
        .attr('y', 20)
        .text('Cancel');
}