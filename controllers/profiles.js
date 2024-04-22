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

export {
  index,
  show,
}