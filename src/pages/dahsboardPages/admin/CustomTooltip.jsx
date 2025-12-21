const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-main border border-neutral rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-text-primary mb-1">
          {payload[0].payload.service}
        </p>
        <p className="text-xs text-text-secondary">
          Total Bookings:{" "}
          <span className="font-bold text-primary">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};
export default CustomTooltip;
