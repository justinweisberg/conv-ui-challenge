if(typeof module !== 'undefined') {
  exports = module.exports = {};
}

//Shim for IE<8
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
//End Shim

var Registry = function () {
  //store currently registered numbers
 // this.currentlyRegistered = [];
  this.currentlyRegistered = [];

  //tracks the next available default assigned number
  //this allows us to not have to sort or iterate through on each action
  this.nextAvailableNumber = 1;

  /**
  @function assignNumber assigns the lowest available number to the user
  @returns currentlyRegistered
  */
  this.assignNumber = function() {
    this.currentlyRegistered.splice(this.nextAvailableNumber - 1, 0, this.nextAvailableNumber);
    this.nextAvailableNumber = this.determineNextAvailableNumber();
    return this.currentlyRegistered;
  };

  /**
  @function determineNextAvailable determines the next available number in
            currentlyRegistered
  @returns Number - the next available number in currentlyRegistered
  **/
  this.determineNextAvailableNumber = function() {
    //Because we start with 1, the index of nextAvailable will always be its
    //  value-1.  As such, we can assume that using nextAvailable as an index
    //  should reference the index 1 greater than the index of nextAvailable
    for(i = this.nextAvailableNumber; i <= this.currentlyRegistered.length + 1; i++) {
      //If the next available index is undefined then the next largest number is at the end of the array.
      if(typeof this.currentlyRegistered[i - 1] === 'undefined') {
        return i;
        //If we added a larger number than the next available then there's no need to update
      } else if (this.currentlyRegistered[i - 1] > this.nextAvailableNumber && this.currentlyRegistered.indexOf(this.nextAvailableNumber) < 0) {
        return this.nextAvailableNumber;
      } else if (this.currentlyRegistered[i - 1] > this.nextAvailableNumber) {
        //In this particular case I found it was better to loop through and ensure integrity
        //Moving forward I would like to replace this with some more efficient logic to
        //  determine the next available number using the unique situational constraints
        //  provided by determining which action was taken last.
        var n = this.nextAvailableNumber;
        while (this.currentlyRegistered.indexOf(n) >= 0) {
          n++;
        }
        return n;
      }
    }
  };

  /**
  @function addCustomNumber adds a user selected number to the registry, if available
  @returns currentlyRegistered or throws an error if the number is already taken
  **/
  this.addCustomNumber = function(customNumber) {
    if(this.currentlyRegistered.indexOf(customNumber) < 0) {
      //if the customNumber is the largest value just push it on the end
      if(this.currentlyRegistered[this.currentlyRegistered.length - 1] < customNumber) {
        this.currentlyRegistered.push(customNumber);
      } else {
        //Using same logic as determining next available number
        this.currentlyRegistered.splice(customNumber - 1, 0, customNumber);
      }
      this.nextAvailableNumber = this.determineNextAvailableNumber();
      return this.currentlyRegistered;
    } else {
      throw new Error(customNumber + ' is already taken, please try again.');
    }
  };

  /**
  @function deleteNumber removes the user selected number from currentlyRegistered
  @returns currentlyRegistered or throws an error if the number does not exist
  **/
  this.deleteNumber = function(selectedNumber) {
    var selectedIndex = this.currentlyRegistered.indexOf(selectedNumber);
    if(selectedIndex >= 0) {
      this.currentlyRegistered.splice(selectedIndex, 1);
      if(selectedNumber < this.nextAvailableNumber) {
        this.nextAvailableNumber = selectedNumber;
      } else {
        this.nextAvailableNumber = this.determineNextAvailableNumber();
      }
      return this.currentlyRegistered;
    } else {
      throw new Error(selectedNumber + ' does not exist in the registry, please try again.');
    }
  };
};

if(typeof exports !== 'undefined') {
  exports.Registry = Registry;
}
