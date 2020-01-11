export const post = {
  id: date - title,
  title: "post header title",
  date: "RESEARCH: date type, or what format to store that i can sort them?",
  location: "some unique id for a map application coordinate",
  tags: ["tag-1"],
  isPublished: false,
  lastModified: new Date().toISOString(),
  createdDate: "yyyy-mm-dd"
};

export const postData = {
  postId: "reference",
  header: {
    title: undefined,
    subTitle: undefined,
    displayDate1: null,
    displayDate2: null
  },
  blocks: [] // Order will matter here, is that an issuse? Can it hold a collection of maps?
};
