function findLastNonConflictingJob(activities, n) {
  for (let i = n - 1; i >= 0; i--) {
    if (activities[i][1] <= activities[n][0]) {
      return i;
    }
  }

  return -1;
}

function findMaxProfit2(activities, n) {
  if (n < 0) {
    return 0;
  }

  if (n === 0) {
    return activities.get(0).profit;
  }

  let index = findLastNonConflictingJob(activities, n);

  let incl = activities.get(n).profit + findMaxProfit2(activities, index);

  let excl = findMaxProfit2(activities, n - 1);

  return Math.max(incl, excl);
}

function findMaxProfit(activities) {
  activities.sort((next, item) => {
    if (next[1] < item[1]) {
      return -1;
    }
    if (next[1] > item[1]) {
      return 1;
    }
    return 0;
  });

  return findMaxProfit2(activities, activities.length() - 1);
}
