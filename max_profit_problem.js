function maxProfit(totalTime) {
  var buildings = [
    { name: "T", buildTime: 5, earning: 1500 },
    { name: "P", buildTime: 4, earning: 1000 },
    { name: "C", buildTime: 10, earning: 3000 }
  ];

  var store = [];
  for (let i = 0; i <= totalTime; i++) {
    store[i] = {
      maxProfit: 0,
      combinations: [{ T: 0, P: 0, C: 0 }]
    };
  }

  for (var time = 1; time <= totalTime; time++) {
    store[time] = {
      maxProfit: store[time - 1].maxProfit,
      combinations: store[time - 1].combinations.map(item => ({ ...item }))
    };

    for (let i = 0; i < buildings.length; i++) {
      var b = buildings[i];
      if (time >= b.buildTime) {
        var timeLeft = time - b.buildTime;
        var earned = timeLeft * b.earning;
        var totalProfit = store[timeLeft].maxProfit + earned;

        if (totalProfit > store[time].maxProfit) {
          store[time].maxProfit = totalProfit;
          store[time].combinations = store[timeLeft].combinations.map(item => {
            let newComb = { ...item };
            newComb[b.name]++;
            return newComb;
          });
        } else if (totalProfit === store[time].maxProfit) {
          var newCombinations = store[timeLeft].combinations.map(item => {
            let newComb = { ...item };
            newComb[b.name]++;
            return newComb;
          });
          newCombinations.forEach(newComb => {
            var exists = store[time].combinations.some(existingComb =>
              existingComb.T === newComb.T &&
              existingComb.P === newComb.P &&
              existingComb.C === newComb.C
            );
            if (!exists) {
              store[time].combinations.push(newComb);
            }
          });
        }
      }
    }
  }

  var result = store[totalTime];
  console.log(`Max Earnings: $${result.maxProfit}`);
  console.log("Possible Combinations:");
  result.combinations.forEach(item => {
    console.log(`T: ${item.T}, P: ${item.P}, C: ${item.C}`);
  });
}

maxProfit(49);