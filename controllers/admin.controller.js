const Pet = require("../models/pet.model");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");

exports.createPet = async (req, res) => {
    const { breedname, age, image, price } = req.body;
    try {
        const uploadToCloudinary = await cloudinary.uploader.upload(req.file.path);
        const pet = await Pet.create({
            breedname,
            age,
            image: uploadToCloudinary.secure_url,
            price,
        });
        return res.status(201).json({
            message: "Pet created successfully",
            pet,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};


// edit existing pet

exports.editPet = async (req, res) => {
    const { breedname, age, image, price } = req.body;
    const id = req.params.id;
    try {

        const pet = await Pet.findByIdAndUpdate(
            id,
            {
                breedname,
                age,
                image,
                price,
            },
            { new: true }
        );
        return res.status(200).json({
            message: "Pet updated successfully",
            pet,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// delete pet

exports.deletePet = async (req, res) => {
    const id = req.params.id;
    try {
        const pet = await Pet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Pet deleted successfully",
            pet,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// reduce pet amount if pet is sold

exports.reducePetAmount = async (req, res) => {
    const breedname = req.body.breedname;
    try {
        const pet = await Pet.findOneAndDelete(breedname);
       
        return res.status(200).json({
            message: "Pet amount reduced successfully",
            pet,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};
