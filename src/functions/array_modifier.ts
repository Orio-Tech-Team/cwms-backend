const arrayModifier = (array: any[]): string => {
  var query_temp: string = "(";
  array.forEach((each_item: string) => {
    query_temp = query_temp + each_item + ",";
  });
  query_temp = query_temp.substring(0, query_temp.length - 1);
  return query_temp + ")";
};
export default arrayModifier;
