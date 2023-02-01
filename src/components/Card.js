

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card)
  }

  return (
    <div className="element">
      <button className="element__delete-button" type="button" title="Удалить"></button>
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button className="element__like-button" type="button" title="Нравится"></button>
          <span className="element__like-count">{props.likes}</span>
        </div>
      </div>
    </div>
  )  
}

export default Card;