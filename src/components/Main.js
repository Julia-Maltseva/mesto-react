import Card from './Card'
import api from '../utils/api'
import { useEffect } from 'react'
import React from 'react'

function Main(props) {

  const [userName, setUserName] = React.useState()
  const [userDescription, setUserDescription] = React.useState()
  const [userAvatar, setUserAvatar] = React.useState()
  const [cards, setCards] = React.useState([])

  useEffect(() => {
    Promise.all([api.getProfile(), api.getCards()])
      .then(([userData, cardList]) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        
        setCards(cardList)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <main>
      <section className="profile">
        <div className="profile__photo">
          <button onClick={props.onEditAvatar} className="profile__avatar-button" type="button"></button>
          <img className="profile__avatar" alt="аватар" src={userAvatar} style={{ backgroundImage: `url(${userAvatar})` }} />
        </div>
        <div className="profile__info">
          <div className="profile__info-name">
            <h1 className="profile__name">{userName}</h1>
            <button onClick={props.onEditProfile} className="profile__edit-button" type="button" title="Редактировать"></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button" title="Добавить"></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
          <Card key={card._id}
                card={card}
                onCardClick={props.onCardClick}
          />
          )
        })
        }
      </section>
    </main>
  )  
}

export default Main;