import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Card from './Card';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  useEffect(() => {
    Promise.all([api.getProfile(), api.getCards()])
      .then(([userData, cardList]) => {
        setCurrentUser(userData)
        
        setCards(cardList)
      })
      .catch((err) => console.log(err))
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  })
    .catch((err) => console.log(err))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((item) => item._id !== card._id))
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api.editProfile({name: data.name, about: data.about})
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  function handleUpdateAvatar(data) {
    api.addAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
      })
      .catch((err) => console.log(err));
    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          setSelectedCard={setSelectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup 
          selectedCard={selectedCard}
          isOpen={selectedCard}
          onClose={closeAllPopups}
        />
        <Footer />
    

  <div className="popup popup_type_delete">
    <div className="popup__container-delete">
      <button className="popup__close-button popup__close-button_delete" type="button" title="Закрыть"></button>
      <h2 className="popup__title popup__title_delete">Вы уверены?</h2>
      <form className="popup__form popup__form_delete">
        <button className="popup__save-button popup__save-button_delete" type="submit" title="Да">Да</button></form>
    </div>
  </div>

    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
