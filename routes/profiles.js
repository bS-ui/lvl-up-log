import { Router } from 'express'
import passport from 'passport'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

// GET /profiles
router.get('/', profilesCtrl.index)

// GET /profiles/:profileId
router.get('/:profileId', profilesCtrl.show)

export {
  router
}
