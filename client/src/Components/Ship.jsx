
const Ship = ({ type, direction, shipDetails }) => {

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', type);
  };

  const length = parseInt(shipDetails[type].length)
  const margin = 10 * (length-1)
  const shipStyle = {
    display: "inline-block",
    width: direction === "horizontal" ? `${length * 40 + margin}px` : "40px",
    height: direction === "vertical" ? `${length * 40 + margin}px` : "40px",
    backgroundColor: `${shipDetails[type].color}`,
    cursor: "grab"
  }
  return (
    <div
      draggable="true"
      style={shipStyle}
      onDragStart={handleDragStart}
    />
  )
}

export default Ship

