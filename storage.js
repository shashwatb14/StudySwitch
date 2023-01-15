document.getElementById("slider-switch").addEventListener("change", function() {
    chrome.storage.sync.set({ "checkboxState": this.checked });
});

chrome.storage.sync.get("checkboxState", function(data) {
    document.getElementById("slider-switch").checked = data.checkboxState;
});

document.getElementById("dark-slider-switch").addEventListener("change", function() {
    chrome.storage.sync.set({ "DcheckboxState": this.checked });
});

chrome.storage.sync.get("DcheckboxState", function(data2) {
    document.getElementById("dark-slider-switch").checked = data2.DcheckboxState;
});