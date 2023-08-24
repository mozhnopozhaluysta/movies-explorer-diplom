import React, { useState, useEffect } from "react"
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom"
import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import InfoTooltip from "../InfoTooltip/InfoTooltip"
import InfoTooltipUpdate from "../infoTooltipUpdate/infoTooltipUpdate"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile"
import NotFound from "../NotFound/NotFound"
import "./App.css"
import * as api from "../../utils/MainApi"

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  // Стейты
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [savedMovies, setSavedMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isInfoToolTipUpdatePopupOpen, setInfoToolTipUpdatePopupOpen] =
    useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    console.log(jwt)
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies")
            setIsLoggedIn(true)
          }
          navigate(path)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // OТРИСОВКА ДАННЫХ ЕСЛИ ЗАРЕГИСТРИРОВАН
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getRealUserInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo)
        })
        .catch((err) => {
          console.log(err)
        })
      api
        .getMovies()
        .then((cardsData) => {
          console.log(cardsData)
          setSavedMovies(cardsData.reverse())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn])

  // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleRegistrationUser({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
        handleAuthorizationUser({ email, password })
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
  }

  // ЛОГИН ПОЛЬЗОВАТЕЛЯ
  function handleAuthorizationUser({ email, password }) {
    setIsLoading(true)
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setInfoToolTipPopupOpen(true)
          setIsSuccess(true)
          localStorage.setItem("jwt", res.token)
          navigate("/movies", { replace: true })
          setIsLoggedIn(true)
        }
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // РЕДАКТИРОВАНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  function handleEditProfileUser(newUserInfo) {
    setIsLoading(true)
    api
      .editProfileUserInfo(newUserInfo)
      .then((data) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(true)
        setCurrentUser(data)
      })
      .catch((err) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(false)
        console.log(err)
        handleErrorUnauthorized(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

    // УДАЛЕНИЕ КАРТОЧКИ С СОХРАНЕННЫМ ФИЛЬМОМ
    function handleCardFilmDelete(card) {
      api
        .deleteCard(card._id)
        .then(() => {
          setSavedMovies((state) => state.filter((item) => item._id !== card._id))
        })
        .catch((err) => {
          setIsSuccess(false)
          console.log(err)
          handleErrorUnauthorized(err)
        })
    }
  

  // ЛАЙК КАРТОЧКИ С ФИЛЬМОМ
  function handleCardFilmLike(card) {
    api
      .addNewCard(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleErrorUnauthorized(err)
      })
  }


  // ОШИБКА АВТОРИЗАЦИИ
  function handleErrorUnauthorized(err) {
    if (err === "Error: 401") {
      handleSignOut()
    }
  }

  // ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoToolTipUpdatePopupOpen(false)
  }

  // ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ ПО OVERLAY
  function closeByOverlayPopups(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }
 
  const isOpen = isInfoToolTipPopupOpen || isInfoToolTipUpdatePopupOpen


  useEffect(() => {
    function closeByEscapePopups(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscapePopups)
      return () => {
        document.removeEventListener("keydown", closeByEscapePopups)
      }
    }
  }, [isOpen])

  const handleSignOut = () => {
    setIsLoggedIn(false)
    // УДАЛЕНИЕ jwt ПРИ ВЫХОДЕ ИЗ ПРИЛОЖЕНИЯ
    localStorage.removeItem("jwt")
    localStorage.removeItem("movies")
    localStorage.removeItem("movieSearch")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("allMovies")
    // ЧИСТКА ЛОКАЛЬНОГО ХРАНИЛИЩА
    localStorage.clear()
    navigate("/")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login
                    onAuthorization={handleAuthorizationUser}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    onRegister={handleRegistrationUser}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route path={"*"} element={<NotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  component={Movies}
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  handleLikeFilm={handleCardFilmLike}
                  onDeleteCard={handleCardFilmDelete}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  onDeleteCard={handleCardFilmDelete}
                  component={SavedMovies}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  isLoading={isLoading}
                  signOut={handleSignOut}
                  onUpdateUser={handleEditProfileUser}
                  loggedIn={isLoggedIn}
                  component={Profile}
                />
              }
            />
          </Routes>
          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlayPopups}
          />
          <InfoTooltipUpdate
            isOpen={isInfoToolTipUpdatePopupOpen}
            isUpdate={isUpdate}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlayPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
