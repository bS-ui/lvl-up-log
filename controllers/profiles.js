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

function newFav(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    profile.favoriteGame = req.body
    profile.favoriteGame.review = req.body
    profile.save()
    .then
      fetch(`https://api.rawg.io/api/games/${(profile.favoriteGame.name).replace(/\s+/g, '-').toLowerCase()}?key=b658202e9c5c4018973e0e3ce9a98977`)
      .then(response => response.json())
      .then(game => {
        profile.favoriteGame.imageUrl = game.background_image
        profile.save()
        .then
          res.redirect(`/profiles/${profile._id}`)
      })
  })
}

function setRpg(req, res) {
  fetch('https://api.rawg.io/api/genres?page_size=40&key=b658202e9c5c4018973e0e3ce9a98977')
  .then(response => response.json())
  .then(genres => {
    Profile.findById(req.params.profileId)
    .then(profile => {
      if (req.body.genre == undefined) {
        fetch(`https://api.rawg.io/api/games?genres=action&key=b658202e9c5c4018973e0e3ce9a98977`)
        .then(response => response.json())
        .then(games => {
        res.render('profiles/setrecentlyplayedgame', {
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
        res.render('profiles/setrecentlyplayedgame', {
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

function newRpg(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    profile.recentlyPlayedGames.push(req.body)
    profile.recentlyPlayedGames[profile.recentlyPlayedGames.length-1].review = req.body
    profile.save()
    .then
      fetch(`https://api.rawg.io/api/games/${(profile.recentlyPlayedGames[profile.recentlyPlayedGames.length-1].name).replace(/\s+/g, '-').toLowerCase()}?key=b658202e9c5c4018973e0e3ce9a98977`)
      .then(response => response.json())
      .then(game => {
        profile.recentlyPlayedGames[profile.recentlyPlayedGames.length-1].imageUrl = game.background_image
        profile.save()
        .then
          res.redirect(`/profiles/${profile._id}`)
      })
  })
}

export {
  index,
  show,
  setFav,
  newFav,
  setRpg,
  newRpg,
}