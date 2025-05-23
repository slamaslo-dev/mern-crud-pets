const Pet = require('../models/pet')
const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/verify-token');


// CREATE
router.post('/', verifyToken, async (req, res) => {
    try {
        const createdPet = await Pet.create({...req.body, owner: req.user._id})
        res.status(201).json(createdPet)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

// READ ALL (INDEX)
router.get('/', verifyToken, async (req, res) => {
    try {
        const foundPets = await Pet.find({owner: req.user._id})
        res.status(200).json(foundPets)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

// READ ONE (SHOW)
router.get('/:petId', verifyToken, async (req, res) => {
    try {
        const foundPet = await Pet.findOne({
            _id: req.params.petId,
            owner: req.user._id
        })
        if (!foundPet) {
            return res.status(404).json({ err: 'Pet not found' })
        }
        res.status(200).json(foundPet)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

// UPDATE
router.put('/:petId', verifyToken, async (req, res) => {
    try {
        const updatedPet = await Pet.findOneAndUpdate(
            { _id: req.params.petId, owner: req.user._id },
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
router.delete('/:petId', verifyToken, async (req, res) => {
    try {
        const deletedPet = await Pet.findOneAndDelete({
            _id: req.params.petId,
            owner: req.user._id
        })
        if (!deletedPet) {
            return res.status(404).json({ err: 'Pet not found' })
        }
        res.status(200).json(deletedPet)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

module.exports = router