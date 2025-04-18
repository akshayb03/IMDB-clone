function maxProfit(totalTime) {
  var buildings = [
    { name: "T", buildTime: 5, earning: 1500 },
    { name: "P", buildTime: 4, earning: 1000 },
    { name: "C", buildTime: 10, earning: 3000 }
  ];

  var store = [];

  store[0] = {
    profit: 0,
    counts: { T: 0, P: 0, C: 0 }
  };

  for (var time = 1; time <= totalTime; time++) {

    var bestCase = {
      profit: store[time - 1] ? store[time - 1].profit : 0,
      counts: store[time - 1]
        ? { ...store[time - 1].counts }
        : { T: 0, P: 0, C: 0 }
    };

    for (var i = 0; i < buildings.length; i++) {
      var b = buildings[i];

      if (time >= b.buildTime) {
        var timeLeft = time - b.buildTime;
        var past = store[timeLeft];

        var earned = timeLeft * b.earning;
        var totalProfit = past.profit + earned;

        if (totalProfit > bestCase.profit) {
          bestCase.profit = totalProfit;
          bestCase.counts = {
            T: past.counts.T,
            P: past.counts.P,
            C: past.counts.C
          };
          bestCase.counts[b.name]++;
        }
      } else {
        console.log(`Not enough time to build ${b.name}`);
      }
    }

    store[time] = bestCase;

  }

  var result = store[totalTime];
  console.log(`\n Final Result for time = ${totalTime}`);
  console.log(`Max Profit: $${result.profit}`);
  console.log(`Buildings - T: ${result.counts.T}, P: ${result.counts.P}, C: ${result.counts.C}`);
}

maxProfit(13);