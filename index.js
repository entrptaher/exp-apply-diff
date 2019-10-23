const { diff, applyChange } = require('deep-diff');
const copyCode = data => JSON.parse(JSON.stringify(data));

/* BACKEND */
// Create some sample data programatically
// send it to the frontend
var instanceSnapshot = {
  credit: 10
};
instanceSnapshot.logs = Array(10).fill({ message: "started" });
// now it has 10 logs with same message

// get the data from some query
var updatedInstance = copyCode(instanceSnapshot)
// update some data, using some mutation/action
updatedInstance.credit = 100;
updatedInstance.logs[2].message = 'updated';

// get the diff for before and after data
// send it to the frontend
var differences = diff(instanceSnapshot, updatedInstance);

/* FRONTEND */
const applyBackendChanges = (target, differences) => {
  const snapshot = copyCode(target);
  for (let difference of differences) {
    applyChange(snapshot, {}, difference);
  }
  return snapshot;
}

// Send the instanceSnapshot to frontend
const frontEndData = copyCode(instanceSnapshot);

// get a new version of updated data, with the updates
// it should have updated credit and so on
const updatedFrontEndData = applyBackendChanges(frontEndData, differences);

console.log({ differences, frontEndData, updatedFrontEndData })