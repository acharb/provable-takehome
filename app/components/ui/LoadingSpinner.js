export const LoadingSpinner = (props) => {
  let width = "50px";
  if (props.size === "large") {
    width = "100px";
  }
  return <div className="loader" style={{ width }}></div>;
};
