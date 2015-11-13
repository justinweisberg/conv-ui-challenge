var reg = new Registry();

//Gathers references to DOM elements and adds event handlers
function init() {
  var spanCurrentlyRegistered = document.getElementsByClassName('registry-currently-registered')[0];
  var spanNextAvailable = document.getElementsByClassName('registry-next-available')[0];
  var btnAssignNumber = document.getElementById("btn-assign-number");
  var btnAddNumber = document.getElementById("btn-add-number");
  var btnDeleteNumber = document.getElementById("btn-delete-number");
  var inputAddNumber = document.getElementById("add-num-val");
  var inputDeleteNumber = document.getElementById("del-num-val");


  btnAssignNumber.onclick = function() {
    reg.assignNumber();
    updateRegistryDisplay();
    updateNextAvailableDisplay();
  }

  btnAddNumber.onclick = function() {
    if(inputAddNumber.value !== "") {
      var val = parseInt(inputAddNumber.value);
      reg.addCustomNumber(val);
      updateRegistryDisplay();
      updateNextAvailableDisplay();
    }
  }

  btnDeleteNumber.onclick = function() {
    if(inputDeleteNumber.value !=="") {
      var val = parseInt(inputDeleteNumber.value);
      reg.deleteNumber(val);
      updateRegistryDisplay();
      updateNextAvailableDisplay();
    }
  }

  //Displays the currently registered numbers in the registry-currently-registered span
  function updateRegistryDisplay() {
    spanCurrentlyRegistered.innerHTML = reg.currentlyRegistered;
  }
  function updateNextAvailableDisplay() {
    spanNextAvailable.innerHTML = reg.nextAvailableNumber;
  }
  updateRegistryDisplay();
  updateNextAvailableDisplay();
}

init();
