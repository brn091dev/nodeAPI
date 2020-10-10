import { Router } from 'express'
import exercisesController from '../controllers/ExercisesController'


const router = new Router()

router.get('/identificaciones', exercisesController.identificaciones)

router.get('/exercises', exercisesController.index)

router.post('/iperson', exercisesController.store)

export default router
