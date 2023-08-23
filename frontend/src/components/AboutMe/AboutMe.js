import React from "react"
import avatar from "../../images/avatar.jpg"
import "./AboutMe.css"

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text-block">
          <h3 className="about-me__name">Toma Bushtaeva</h3>
          <h4 className="about-me__job">Фронтенд-разработчик, 28 лет</h4>
          <p className="about-me__text">
            Я родилась и живу в Якутии, закончила факультет экономики СГУ. Я
            люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начала писать
            код. С 2015 года работала в компании «СКБ Контур». После того, как
            прошёла курс по веб-разработке, начала заниматься фриланс-заказами и
            ушла с постоянной работы.
          </p>
          <a
            href="https://github.com/mozhnopozhaluysta"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={avatar} alt="Моя фотография" className="about-me__avatar" />
      </div>
    </section>
  )
}

export default AboutMe
