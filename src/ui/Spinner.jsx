const Spinner = ({ size = 20, color = "white" }) => {
  return (
    <div
      className="animate-spin rounded-full border-2 border-solid border-t-transparent"
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderTopColor: "transparent",
      }}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
