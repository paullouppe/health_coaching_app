// transform the dates into a numerical format (days since start)
const startDate = new Date(data[0].date);
const transformedData = data.map(entry => {
  const currentDate = new Date(entry.date);
  const timeDiff = currentDate - startDate;
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  return {
    daysSinceStart: daysDiff,
    weight: entry.weight
  };
});

// implement a linear regression 
function linearRegression(y,x){
  var lr = {};
  var n = y.length;
  var sum_x = 0;
  var sum_y = 0;
  var sum_xy = 0;
  var sum_xx = 0;
  var sum_yy = 0;

  for (var i = 0; i < y.length; i++) {
    sum_x += x[i];
    sum_y += y[i];
    sum_xy += (x[i]*y[i]);
    sum_xx += (x[i]*x[i]);
    sum_yy += (y[i]*y[i]);
  }

  lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
  lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
  lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y) / Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

  return lr;
}

let x = transformedData.map(entry => entry.daysSinceStart);
let y = transformedData.map(entry => entry.weight);

let lr = linearRegression(y,x);

// Predict function using the linear regression model
function predictWeight(targetWeight, lr) {
  return (targetWeight - lr.intercept) / lr.slope;
}

// // Use this to predict when the optimal weight will be reached
// const optimalWeight = /* optimal weight value */;
// const daysToOptimalWeight = predictWeight(optimalWeight, lr);

// // Convert days since start to a date
// const predictedDate = new Date(startDate.getTime() + daysToOptimalWeight * 24*60*60*1000);
// console.log(predictedDate); // This is the estimated date when the optimal weight will be reached
