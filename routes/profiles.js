import { Router } from 'express'
import passport from 'passport'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

// GET /profiles
router.get('/', profilesCtrl.index)

// GET /profiles/:profileId
router.get('/:profileId', profilesCtrl.show)

// GET /profiles/:profileId/set-fav
router.get('/:profileId/set-fav', profilesCtrl.setFav)

// POST /profiles/:profileID/set-fav
router.post('/:profileId/set-fav', profilesCtrl.setFav)

// POST /profiles/:profileID/new-fav
router.post('/:profileId/new-fav', profilesCtrl.newFav)
export {
  router
}
