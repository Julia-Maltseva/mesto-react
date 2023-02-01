import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Card from './Card';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [cards, setCards] = React.useState([])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  return (
    <div className="page__content">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        setSelectedCard={setSelectedCard}
        cards={cards}
      />

      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
        nameForm='formEdit'
        children={
          <>
          <input 
            className='popup__first-field popup__first-field_edit popup__input'
            type='text'
            name='userName'
            id='user-name'
            placeholder='Имя'
            minLength='2'
            maxLength='40'
            required
          />
          <label className='popup__form-input'><span className='error' id='user-name-error'></span></label>
          <input 
            className='popup__second-field popup__second-field_edit popup__input'
            type='text'
            name='userJob'
            id='job'
            placeholder='О себе'
            minLength='2'
            maxLength='40'
            required
          />
          <label className='popup__form-input'><span className='error' id='job-error'></span></label>
          </>
        }
      />

      <PopupWithForm 
        name='addCard'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText='Создать'
        nameForm='formAdd'
        children={
          <>
          <input 
            className='popup__first-field popup__first-field_add popup__input'
            id='image-name'
            type='text'
            name='imageName'
            placeholder='Название'
            minLength='2'
            maxLength='30'
            required
          />
          <label className='popup__form-input'><span className='error' id='image-name-error'></span></label>
          <input 
            className='popup__second-field popup__second-field_add popup__input'
            id='image-link'
            type='url'
            name='imageLink'
            placeholder='Ссылка на картинку'
            required
          />
          <label className='popup__form-input'><span className='error' id='image-link-error'></span></label>
          </>
        }
      />

      <PopupWithForm 
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
        nameForm='formAvatar'
        children={
          <>
          <input 
            name='avatarLink' 
            className='popup__first-field popup__input popup__first-field_avatar' 
            type='url' 
            placeholder='Ссылка на аватар' 
            required 
          />
          <label className='popup__form-input'><span className='error' id='avatar-link-error'></span></label>
          </>
        }
      />

      <ImagePopup 
        selectedCard={selectedCard}
        isOpen={selectedCard}
        onClose={closeAllPopups}
      />
      <Footer />
  
  
  <div className="popup popup_type_edit">
    <div className="popup__container">
      <button className="popup__close-button" type="button" title="Закрыть"></button>
      <h2 className="popup__title">Редактировать профиль</h2>
      <form className="popup__form popup__form_edit" name="formEdit" noValidate />
        <input className="popup__first-field popup__first-field_edit popup__input" type="text" name="userName" id="user-name" placeholder="Имя" minLength="2" maxLength="40" required />
        <label className="popup__form-input"><span className="error" id="user-name-error"></span></label>
        <input className="popup__second-field popup__second-field_edit popup__input" type="text" name="userJob" id="job" placeholder="О себе" minLength="2" maxLength="200" required />
        <label className="popup__form-input"><span className="error" id="job-error"></span></label>
        <button className="popup__save-button popup__save-button_valid" name="editSave" type="submit" title="Сохранить">Сохранить</button>
      
    </div>  
  </div>
  
  <div className="popup popup_type_add-card">
    <div className="popup__container">
      <button className="popup__close-button popup__close-button_add" type="button" title="Закрыть"></button>
      <h2 className="popup__title">Новое место</h2>
      <form className="popup__form popup__form_add" name="formAdd" noValidate />
        <input className="popup__first-field popup__first-field_add popup__input" id="image-name" type="text" name="imageName" placeholder="Название" minLength="2" maxLength="30" required />
        <label className="popup__form-input"><span className="error" id="image-name-error"></span></label>
        <input className="popup__second-field popup__second-field_add popup__input" id="image-link" type="url" name="imageLink" placeholder="Ссылка на картинку" required />
        <label className="popup__form-input"><span className="error" id="image-link-error"></span></label>
        <button className="popup__save-button popup__save-button_invalid" type="submit" title="Создать" id="buttonSaveAdd">Создать</button>
      
    </div>  
  </div>
  
  <div className="popup popup_type_show-photo">
    <div className="popup__container-photo">
      <button className="popup__close-button popup__close-button_photo" type="button" title="Закрыть"></button>
      <img className="popup__photo" alt="" src="#" />
      <p className="popup__photo-title"></p>
    </div>
  </div>

  <div className="popup popup_type_delete">
    <div className="popup__container-delete">
      <button className="popup__close-button popup__close-button_delete" type="button" title="Закрыть"></button>
      <h2 className="popup__title popup__title_delete">Вы уверены?</h2>
      <form className="popup__form popup__form_delete">
        <button className="popup__save-button popup__save-button_delete" type="submit" title="Да">Да</button></form>
    </div>
  </div>

  <div className="popup popup_type_avatar">
    <div className="popup__container-avatar">
      <button className="popup__close-button popup__close-button_avatar" type="button" title="Закрыть"></button>
      <h2 className="popup__title popup__title_avatar">Обновить аватар</h2>
      <form className="popup__form popup__form_avatar" name="formAvatar" noValidate />
        <input className="popup__first-field popup__input popup__first-field_avatar" id="avatar-link" type="url" name="avatarLink" placeholder="Ссылка на аватар" required />
        <label className="popup__form-input"><span className="error" id="avatar-link-error"></span></label>
        <button className="popup__save-button popup__save-button_avatar" type="submit" title="Сохранить">Сохранить</button>
      
    </div>
  </div>

  </div>
  );
}

export default App;
