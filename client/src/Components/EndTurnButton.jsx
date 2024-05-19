const EndTurnButton = ({selectedGridItem}) => {
  const handleClick = () => {
    if (typeof selectedGridItem !== "number" && selectedGridItem === selectedGridItem.toUpperCase()) {
      alert(`HIT`)
    } else {
      alert(`MISS`)
    }

  }
  
  return (
    <button onClick={handleClick}>PET THAT CAT!</button>
  )
}

export default EndTurnButton;