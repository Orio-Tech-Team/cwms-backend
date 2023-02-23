export default function arrayModifier(array: any[]) {
  var query_temp: string = "(";
  array.forEach((each_item, key) => {
    query_temp =
      key == array.length - 1
        ? query_temp + each_item + ","
        : query_temp + each_item + ")";
    //
  });
  return query_temp;
}
