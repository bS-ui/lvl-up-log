import { Profile } from "../models/profile.js";

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: 'lvlUpLog: Profiles'
    })
  })
}

function show(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    res.render('profiles/show', {
      profile,
      title: `lvlUpLog: ${profile.name}`
    })
  })
}

function setFav(req, res) {
  fetch('https://api.rawg.io/api/genres?page_size=40&key=b658202e9c5c4018973e0e3ce9a98977')
  .then(response => response.json())
  .then(genres => {
    Profile.findById(req.params.profileId)
    .then(profile => {
      if (req.body.genre == undefined) {
        fetch(`https://api.rawg.io/api/games?genres=action&key=b658202e9c5c4018973e0e3ce9a98977`)
        .then(response => response.json())
        .then(games => {
        res.render('profiles/setfavorite', {
          selectedGenre: req.body.genre,
          games,
          genres,
          profile,
          title: `lvlUpLog: ${profile.name}`
        })
      })
      } else {
        fetch(`https://api.rawg.io/api/games?genres=${req.body.genre == 'RPG' ? 'role-playing-games-rpg' : req.body.genre == 'Board Games' ? 'board-games' : req.body.genre == 'Massively Multiplayer' ? 'massively-multiplayer' : (req.body.genre).split(" ").join("").toLowerCase()}&key=b658202e9c5c4018973e0e3ce9a98977`)
        .then(response => response.json())
        .then(games => {
        res.render('profiles/setfavorite', {
          selectedGenre: req.body.genre,
          games,
          genres,
          profile,
          title: `lvlUpLog: ${profile.name}`
        })
      })
      }
    })
  })
  .catch(error => {
    console.error('Error:', error)
  })
}

export {
  index,
  show,
  setFav,
}