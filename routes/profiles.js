import { Router } from 'express'
import passport from 'passport'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET /profiles
router.get('/', profilesCtrl.index)

// GET /profiles/:profileId
router.get('/:profileId', profilesCtrl.show)

// GET /profiles/:profileId/set-fav
router.get('/:profileId/set-fav', isLoggedIn, profilesCtrl.setFav)

// GET /profiles/:profileId/set-rpg
router.get('/:profileId/set-rpg', isLoggedIn, profilesCtrl.setRpg)

// POST /profiles/:profileID/set-fav
router.post('/:profileId/set-fav', isLoggedIn, profilesCtrl.setFav)

// POST /profiles/:profileID/set-rpg
router.post('/:profileId/set-rpg', isLoggedIn,profilesCtrl.setRpg)

// POST /profiles/:profileID/new-fav
router.post('/:profileId/new-fav', isLoggedIn, profilesCtrl.newFav)

// POST /profiles/:profileID/new-rpg
router.post('/:profileId/new-rpg', isLoggedIn, profilesCtrl.newRpg)

// DELETE /profiles/:/profileId/:gameId
router.delete('/:profileId/:gameId', isLoggedIn, profilesCtrl.deleteRpg)

export {
  router
}
