/**
 * Used for animation of node expansion
 */
const onEnterActive = node => {
  return { height: node.scrollHeight };
};
export const motion = {
  motionName: "node-motion",
  motionAppear: false,
  onEnterActive,
  onLeaveStart: node => ({ height: node.offsetHeight })
};

/**
 * Given a date, verify that treeData has the appropriate year and month nodes
 * and if so, return their keys to be used as initially expanded nodes
 */
export function getInitialExpandedKeys(date, treeData) {
  if (!date || !treeData) {
    return [];
  }

  const [year, month] = date.split("-");
  let yearNode = treeData.find(node => node.key === `year-${year}`);
  if (!yearNode) {
    return [];
  }
  let monthNode = yearNode.children.find(
    node => node.key === `month-${year}-${month}`
  );
  if (!monthNode) {
    return [];
  }

  return [yearNode.key, monthNode.key];
}

/**
 * Given the postIndex.index, returns an array of node objects to be used as treeData
 */
export function createTreeData(indexArr) {
  // Group all data by yyyy, mm, dd
  let keyData = getGroupedPostData(indexArr);
  let treeData = [];

  function reverse(a, b) {
    return b - a;
  }

  // iteratively put all grouped data in an array, where days are grouped subchildren of its respective
  // month, which are in term grouped subchildren of its respective year
  let sortedYears = Object.keys(keyData).sort(reverse);
  sortedYears.forEach(year => {
    let months = [];
    let yearNode = {
      key: `year-${year}`,
      title: year.toString(),
      children: months
    };

    let sortedMonths = Object.keys(keyData[year]).sort(reverse);
    sortedMonths.forEach(month => {
      let posts = [];
      let monthNode = {
        key: `month-${year}-${month}`,
        title: monthMap[month],
        children: posts
      };

      let sortedDays = Object.keys(keyData[year][month]).sort(reverse);
      sortedDays.forEach(day => {
        keyData[year][month][day].forEach(post => {
          let postNode = {
            key: post.key,
            title: post.title,
            children: []
          };
          posts.push(postNode);
        });
      });

      months.push(monthNode);
    });

    treeData.push(yearNode);
  });

  return treeData;
}

// groups all posts by year, then by each year's month, then by each month's date
function getGroupedPostData(indexArr) {
  let keyData = {}; // yy -> {mm -> {post}}
  indexArr.forEach(post => {
    let [year, month, day] = post.date.split("-"); // yyyy-mm-dd
    if (!keyData[year]) {
      keyData[year] = {};
    }
    if (!keyData[year][month]) {
      keyData[year][month] = {};
    }
    if (!keyData[year][month][day]) {
      keyData[year][month][day] = [];
    }
    keyData[year][month][day].push({
      title: post.title,
      key: post.postDataId
    });
  });
  return keyData;
}

const monthMap = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"
};
