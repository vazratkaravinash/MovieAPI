
const express = require('express');
const router = express.Router();


const MovieController = require('../src/controllers/MoviesController');

/**
 * @swagger
 *   /movie:
 *   post:
 *     tags:
 *       - Movies
 *     name: Add movie
 *     summary: Add new movie
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             year:
 *               type: string
 *             director:
 *               type: string
 *         required:
 *           - name
 *           - year
 *           - director
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *       500:
 *         description: Error occurred
 */
router.post('/movie', MovieController.addMovie);

/**
 * @swagger
 *   /movies:
 *   post:
 *     tags:
 *       - Movies
 *     name: Add movies
 *     summary: Add new movies
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: array
 *           items:
 *             properties:
 *               name:
 *                 type: string
 *               year:
 *                 type: string
 *               director:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *       500:
 *         description: Error occurred
 */
router.post('/movies', MovieController.addMovies);
/**
 * @swagger
 *   /movies:
 *   get:
 *     tags:
 *       - Movies
 *     name: Get Movies
 *     summary: Get moviesr
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string  
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *       500:
 *         description: Error occurred
 */
router.get('/movies', MovieController.getMovies);

module.exports = router;