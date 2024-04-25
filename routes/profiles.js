import { Router } from 'express'
import passport from 'passport'
import * as profilesCtrl from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET /profiles
router.get('/', profilesCtrl.index)

// GET /profiles/:profileId
router.get('/:profileId', profilesCtrl.show)

// GET /profiles/:profileId/new-fav
router.get('/:profileId/new-fav', isLoggedIn, profilesCtrl.newFav)

// GET /profiles/:profileId/new-rpg
router.get('/:profileId/new-rpg', isLoggedIn, profilesCtrl.newRpg)

// GET /profiles/:profileId/edit-info
router.get('/:profileId/edit-info', isLoggedIn, profilesCtrl.editInfo)

// POST /profiles/:profileId/create-fav
router.post('/:profileId/create-fav', isLoggedIn, profilesCtrl.createFav)

// POST /profiles/:profileId/create-rpg
router.post('/:profileId/create-rpg', isLoggedIn,profilesCtrl.createRpg)

// POST /profiles/:profileId/new-fav
router.post('/:profileId/new-fav', isLoggedIn, profilesCtrl.newFav)

// POST /profiles/:profileId/new-rpg
router.post('/:profileId/new-rpg', isLoggedIn, profilesCtrl.newRpg)

// POST /profiles/:profileId/update-info
router.post('/:profileId/update-info', isLoggedIn, profilesCtrl.updateInfo)

// DELETE /profiles/:/profileId/:gameId
router.delete('/:profileId/:gameId', isLoggedIn, profilesCtrl.deleteRpg)

export {
  router
}
