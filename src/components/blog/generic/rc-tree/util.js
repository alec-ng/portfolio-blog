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

/**
 * Given a date, verify that treeData has the appropriate year and month nodes
 * and if so, return their keys to be used as initially expanded nodes
 */
export function getInitialExpandedKeys(date, treeData) {
  if (!date || !treeData) {
    return [];
  }

  const [year, month] = date.split("-");
  const { yearKey, monthKey } = getDateNodeKeys(year, month);
  let yearNode = treeData.find(node => node.key === yearKey);
  if (!yearNode) {
    return [];
  }
  let monthNode = yearNode.children.find(node => node.key === monthKey);
  if (!monthNode) {
    return [];
  }
  return [yearNode.key, monthNode.key];
}

/**
 * Given a mm and yyyy value, return back the keys to the corresponding rc-tree nodes
 */
const getYearKey = year => `year-${year}`;
const getMonthKey = (year, month) => `year-${(year, month)}`;
export function getDateNodeKeys(year, month) {
  const yearKey = getYearKey(year);
  const monthKey = getMonthKey(year, month);
  return { yearKey, monthKey };
}
/**
 * Given the postIndex.index, returns an array of node objects to be used as treeData
 */
export function createTreeData(indexArr) {
  // Group all data by yyyy, mm, dd
  let keyData = getGroupedPostData(indexArr);
  let treeData = [];
  let sequentialData = [];
  let yearKeys = [];
  let monthKeys = [];

  function reverse(a, b) {
    return b - a;
  }

  // iteratively put all grouped data in an array, where days are grouped subchildren of its respective
  // month, which are in term grouped subchildren of its respective year
  let sortedYears = Object.keys(keyData).sort(reverse);
  sortedYears.forEach(year => {
    let months = [];
    let yearNode = {
      key: getYearKey(year),
      title: year.toString(),
      children: months
    };
    yearKeys.push(yearNode.key);

    let sortedMonths = Object.keys(keyData[year]).sort(reverse);
    sortedMonths.forEach(month => {
      let posts = [];
      let monthNode = {
        key: getMonthKey(year, month),
        title: monthMap[month],
        children: posts
      };
      monthKeys.push(monthNode.key);

      let sortedDays = Object.keys(keyData[year][month]).sort(reverse);
      sortedDays.forEach(day => {
        keyData[year][month][day].forEach(post => {
          let postNode = {
            key: post.key,
            title: post.title,
            children: []
          };
          posts.push(postNode);
          sequentialData.push(postNode);
        });
      });

      months.push(monthNode);
    });

    treeData.push(yearNode);
  });

  return { treeData, sequentialData, monthKeys, yearKeys };
}

/**
 * groups all posts by year, date, month, date and sorts by title
 */
function getGroupedPostData(indexArr) {
  const titleSort = (a, b) => (a.title < b.title ? -1 : 1);
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

  for (let year in keyData) {
    for (let month in keyData[year]) {
      for (let day in keyData[year][month]) {
        if (keyData[year][month][day].length > 1) {
          debugger;
        }
        keyData[year][month][day].sort(titleSort);
      }
    }
  }
  return keyData;
}
