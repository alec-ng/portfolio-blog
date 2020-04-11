import { getSlug } from "../../../util/url-util";

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
 * Given a list of published posts, returns an array of node objects to be used as treeData
 */
export function createTreeData(publishedPosts) {
  // Group all data by yyyy, mm, dd
  let keyData = getGroupedPostData(publishedPosts);
  let treeData = [];
  let yearKeys = [];
  let monthKeys = [];

  const descendingDateSort = (a, b) => b - a;
  const ascendingTitleSort = (a, b) => (a.title < b.title ? -1 : 1);

  // iteratively put all grouped data in an array, where days are grouped subchildren of its respective
  // month, which are in term grouped subchildren of its respective year
  let sortedYears = Object.keys(keyData).sort(descendingDateSort);
  sortedYears.forEach(year => {
    let months = [];
    let yearNode = {
      key: getYearKey(year),
      title: year.toString(),
      children: months
    };
    yearKeys.push(yearNode.key);

    let sortedMonths = Object.keys(keyData[year]).sort(descendingDateSort);
    sortedMonths.forEach(month => {
      let posts = [];
      let monthNode = {
        key: getMonthKey(year, month),
        title: monthMap[month],
        children: posts
      };
      monthKeys.push(monthNode.key);

      let sortedDays = Object.keys(keyData[year][month]).sort(
        descendingDateSort
      );
      sortedDays.forEach(day => {
        keyData[year][month][day].sort(ascendingTitleSort).forEach(post => {
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

  return { treeData, monthKeys, yearKeys };
}

/**
 * groups all posts by year, date, month, date
 */
function getGroupedPostData(publishedPosts) {
  let keyData = {}; // yy -> {mm -> {post}}

  publishedPosts.forEach(post => {
    let [year, month, day] = post.date.split("-");
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
      key: getSlug(post.title, post.date)
    });
  });
  return keyData;
}

/*
 * mm -> labels
 */
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
