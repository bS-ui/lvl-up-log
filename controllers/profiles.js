import { Profile } from "../models/profile.js";

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: 'lvlUpLog: Profiles'
    })
  })
  .catch(error => {
    console.error('Error:', error)
    res.redirect(`/profiles`)
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
  .catch(error => {
    console.error('Error:', error)
    res.redirect(`/profiles`)
  })
}

function createFav(req, res) {
  fetch('https://api.rawg.io/api/genres?page_size=40&key=')
  .then(response => response.json())
  .then(genres => {
    Profile.findById(req.params.profileId)
    .then(profile => {
      if (req.body.genre == undefined) {
        fetch(`https://api.rawg.io/api/games?genres=action&key=`)
        .then(response => response.json())
        .then(games => {
          res.render('profiles/set-favorite', {
            selectedGenre: req.body.genre,
            games,
            genres,
            profile,
            title: `lvlUpLog: ${profile.name}`
          })
        })
        .catch(error => {
          console.error('Error:', error)
          res.redirect(`/profiles`)
        })
      } else {
        fetch(`https://api.rawg.io/api/games?genres=${req.body.genre == 'RPG' ? 'role-playing-games-rpg' : req.body.genre == 'Board Games' ? 'board-games' : req.body.genre == 'Massively Multiplayer' ? 'massively-multiplayer' : (req.body.genre).split(" ").join("").toLowerCase()}&key=`)
        .then(response => response.json())
        .then(games => {
          res.render('profiles/set-favorite', {
            selectedGenre: req.body.genre,
            games,
            genres,
            profile,
            title: `lvlUpLog: ${profile.name}`
          })
        })
        .catch(error => {
          console.error('Error:', error)
          res.redirect(`/profiles`)
        })
      }
    })
    .catch(error => {
      console.error('Error:', error)
      res.redirect(`/profiles`)
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
      fetch(`https://api.rawg.io/api/games/${(profile.favoriteGame.name).replace(/\s+/g, '-').toLowerCase()}?key=`)
      .then(response => response.json())
      .then(game => {
        profile.favoriteGame.imageUrl = game.background_image
        profile.save()
        .then
          res.redirect(`/profiles/${profile._id}`)
      })
      .catch(error => {
        console.error('Error:', error)
        res.redirect(`/profiles`)
      })
  })
  .catch(error => {
    console.error('Error:', error)
    res.redirect(`/profiles`)
  })
}

function createRpg(req, res) {
  fetch('https://api.rawg.io/api/genres?page_size=40&key=')
  .then(response => response.json())
  .then(genres => {
    Profile.findById(req.params.profileId)
    .then(profile => {
      if (req.body.genre == undefined) {
        fetch(`https://api.rawg.io/api/games?genres=action&key=`)
        .then(response => response.json())
        .then(games => {
          res.render('profiles/set-recently-played-game', {
            selectedGenre: req.body.genre,
            games,
            genres,
            profile,
            title: `lvlUpLog: ${profile.name}`
          })
        })
        .catch(error => {
          console.error('Error:', error)
          res.redirect(`/profiles`)
        })
      } else {
        fetch(`https://api.rawg.io/api/games?genres=${req.body.genre == 'RPG' ? 'role-playing-games-rpg' : req.body.genre == 'Board Games' ? 'board-games' : req.body.genre == 'Massively Multiplayer' ? 'massively-multiplayer' : (req.body.genre).split(" ").join("").toLowerCase()}&key=`)
        .then(response => response.json())
        .then(games => {
          res.render('profiles/set-recently-played-game', {
            selectedGenre: req.body.genre,
            games,
            genres,
            profile,
            title: `lvlUpLog: ${profile.name}`
          })
        })
        .catch(error => {
          console.error('Error:', error)
          res.redirect(`/profiles`)
        })
      }
    })
    .catch(error => {
      console.error('Error:', error)
      res.redirect(`/profiles`)
    })
  })
  .catch(error => {
    console.error('Error:', error)
    res.redirect(`/profiles`)
  })
}

function newRpg(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    profile.recentlyPlayedGames.push(req.body)
    profile.recentlyPlayedGames[profile.recentlyPlayedGames.length-1].review = req.body
    profile.save()
    .then
      fetch(`https://api.rawg.io/api/games/${(profile.recentlyPlayedGames[profile.recentlyPlayedGames.length-1].name).replace(/\s+/g, '-').toLowerCase()}?key=`)
      .then(response => response.json())
      .then(game => {
        profile.recentlyPlayedGames[profile.recentlyPlayedGames.length-1].imageUrl = game.background_image
        profile.save()
        .then
          res.redirect(`/profiles/${profile._id}`)
      })
      .catch(error => {
        console.error('Error:', error)
        res.redirect(`/profiles`)
      })
  })
  .catch(error => {
    console.error('Error:', error)
    res.redirect(`/profiles`)
  })
}

function deleteRpg(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    profile.recentlyPlayedGames.remove({_id: req.params.gameId})
    profile.save()
    .then
      res.redirect(`/profiles/${profile._id}`)
  })
  .catch(error => {
    console.error('Error:', error)
    res.redirect(`/profiles`)
  })
}

function editInfo(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    res.render('profiles/edit-info', {
      profile,
      title: `lvlUpLog: ${profile.name}`
    })
  })
  .catch(error => {
    console.error('Error:', error)
    res.redirect(`/profiles`)
  })
}

function updateInfo(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    profile.steam = req.body.steam
    profile.location = req.body.location
    profile.discord = req.body.discord
    profile.save()
    .then
      res.redirect(`/profiles/${profile._id}`)
  })
  .catch(error => {
    console.error('Error:', error)
    res.redirect(`/profiles`)
  })
}
export {
  index,
  show,
  createFav,
  newFav,
  createRpg,
  newRpg,
  deleteRpg,
  editInfo,
  updateInfo,
}