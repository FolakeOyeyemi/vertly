const express = require("express");
const router = express.Router();
const multer = require("multer");
const Pet = require("../models/pet.model");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const { userSignup, userLogin} = require("../controllers/user.controller");
const { createPet, editPet, deletePet, reducePetAmount } = require("../controllers/admin.controller");
const { isAuth, authorize } = require("../utils/middleware/isAuth");

const { validateRequest, schemas } = require('../utils/middleware/validation');


router.post("/signup", validateRequest(schemas.userSchema), userSignup);
router.post("/login", validateRequest(schemas.loginSchema), userLogin);

// admin

router.post("/new-pet", upload.single("image"), isAuth, authorize("admin"), createPet);
router.put("/edit-pet/:id", upload.single("image"), isAuth, authorize("admin"), editPet);
router.delete("/delete-pet/:id", isAuth, authorize("admin"), deletePet);
router.put("/reduce-pet", isAuth, authorize("admin"), reducePetAmount);



module.exports = router;