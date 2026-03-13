export const commentService = async () => {
  const res = await fetch("https://dummyjson.com/comments");
  const data = await res.json();

  const filterData = data?.comments?.map((item) => {
    return {
      name: item.user.fullName,
      message: item.body,
    };
  });

  return filterData;
};
