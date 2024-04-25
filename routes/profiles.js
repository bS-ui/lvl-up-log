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

// GET /profiles/:profileId/editInfo
router.get('/:profileId/edit-info', isLoggedIn, profilesCtrl.editInfo)

// POST /profiles/:profileId/set-fav
router.post('/:profileId/set-fav', isLoggedIn, profilesCtrl.setFav)

// POST /profiles/:profileId/set-rpg
router.post('/:profileId/set-rpg', isLoggedIn,profilesCtrl.setRpg)

// POST /profiles/:profileId/new-fav
router.post('/:profileId/new-fav', isLoggedIn, profilesCtrl.newFav)

// POST /profiles/:profileId/new-rpg
router.post('/:profileId/new-rpg', isLoggedIn, profilesCtrl.newRpg)

// POST /profiles/:profileId/edit-info
router.post('/:profileId/edit-info', isLoggedIn, profilesCtrl.setInfo)

// DELETE /profiles/:/profileId/:gameId
router.delete('/:profileId/:gameId', isLoggedIn, profilesCtrl.deleteRpg)

export {
  router
}
