

//storing inputted data
let entryArray = [];
let counterCreated = 0;
let selectedEntry = -1;
let newOrEditing = "";


var webWidth = document.getElementById("main-web").offsetWidth;
var webHeight = document.getElementById("main-web").offsetHeight;

// Create SVG element
const svg = d3.select("#main-web")
    .append("svg")
    .attr("id", "web-svg")
    .attr("width", webWidth)
    .attr("height", webHeight)
    .attr("selectedEntry", "-1")
    .attr("newOrEditing", "x");


//console.log(d3.select("#web-svg").attr("newOrEditing"));


createNewButton();
//console.log(svg.attr("newOrEditing"));
//popup group init
popupHelper();

createEditButton();




let xCoord = [200, 300, 500];
let yCoord = [200, 600, 400];
let title = ["Test1", "Test2", "Test3"];
let info = ["This is a test", "This is not a test", "This one might be a test"];
let color = ["red", "red", "green"];

for (let i = 0; i < xCoord.length; i++) {
    addEntry(xCoord[i], yCoord[i], title[i], info[i], color[i]);
}



// Create a function to handle keyboard shortcuts
function handleKeyPress(event) {
    // Check if the key pressed is 'n' and either Ctrl (for Windows/Linux) or Command (for macOS) is pressed
    if ((event.key === 'b' || event.key === 'B') && (event.ctrlKey || event.metaKey)) {
        // Prevent default behavior of the browser (e.g., opening a new tab)
        event.preventDefault();

        newOrEditing = "new";

        popupGroup.select("#entryTitle").html('<input type="text" maxlength="20" class="input - field">');
        popupGroup.select("#entryContent").html('<textarea class="textarea-field"></textarea>');

        popupGroup.style('display', 'block');
        popupGroup.raise();

    }
}
// Listen for keydown events on the window
window.addEventListener('keydown', handleKeyPress);


//array of all created entries


function selectEntry(entryID) {
    if (d3.select("#popup-group").style('display') === 'none') {
        entryArray.forEach(function (entry) {
            entry.select("#highlight").style("display", "none");
            entry.select("#extra-information").style("display", "none");
        });


        const entry = d3.select("#" + entryID).raise();
        entry.select("#highlight").style("display", "block");
        entry.select("#extra-information").style("display", "block");
        svg.attr("selectedEntry", entryID);
        d3.select("#edit-button").select("#edit-button-error").style("display", "none");
    }


}


function addEntry(x, y, text1, text2, color) {
    const entry = svg.append("g")
        .attr("transform", "translate(" + x + "," + y + ")")
        .attr("id", "entry" + counterCreated)
        .classed("entry", true)
        .on("click", function () {
            selectEntry(d3.select(this).attr("id"))
        });

    entryArray.push(entry);

    entryHelper(entry, text1, text2, color);
    counterCreated++;

}

function trackEntries() {
    entryArrayX = []
    entryArrayY = []
    entryArrayTitle = []
    entryArrayContent = []
    entryArrayColor = []
    for (let i = 0; i < counterCreated; i++) {
        let currentEntry = d3.select("#entry" + i);

        var transformAttr = currentEntry.attr("transform");

        // Parse the transform attribute to get x and y coordinates
        var transform = d3.zoomTransform(currentEntry.node());
        var x = transform.x;
        var y = transform.y;
        entryArrayX.push(x);
        entryArrayY.push(y);


    }
}