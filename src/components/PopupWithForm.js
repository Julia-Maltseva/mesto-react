

function PopupWithForm(props) {
  return (
    <div className={`${props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup`}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={props.onClose} type="button" title="Закрыть"></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.nameForm} noValidate>
          {props.children}
          <button className="popup__save-button" type="submit">{props.buttonText}</button>
        </form>
      </div>  
    </div>
  )  
}

export default PopupWithForm;