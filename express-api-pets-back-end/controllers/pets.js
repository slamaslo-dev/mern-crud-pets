const Pet = require('../models/pet')
const express = require('express')
const router = express.Router()

// CREATE
router.post('/', async (req, res) => {
    try {
        const createdPet = await Pet.create(req.body)
        res.status(201).json(createdPet)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

// READ ALL (INDEX)
router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find()
        res.status(200).json(foundPets)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

// READ ONE (SHOW)
router.get('/:petId', async (req, res) => {
    try {
        const foundPet = await Pet.findById(req.params.petId)
        if (!foundPet) {
            return res.status(404).json({ err: 'Pet not found' })
        }
        res.status(200).json(foundPet)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

// UPDATE
router.put('/:petId', async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(
            req.params.petId, 
            req.body, 
            { new: true, runValidators: true }
        )
        if (!updatedPet) {
            return res.status(404).json({ err: 'Pet not found' })
        }
        res.status(200).json(updatedPet)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

// DELETE
router.delete('/:petId', async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.petId)
        if (!deletedPet) {
            return res.status(404).json({ err: 'Pet not found' })
        }
        res.status(200).json(deletedPet)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

module.exports = router