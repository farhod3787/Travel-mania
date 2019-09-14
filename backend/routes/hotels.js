const express = require("express")
const router = express.Router()
const Hotel = require("./../model/hotels")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Errorrr");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/photos");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
})

// router.get('/', (req, res) => {
//     res.status(200).json({ msg: "Sdk" })
// })

router.post('/create', multer({ storage: storage }).any('photos'), (req, res) => {

    let body = {
        name: req.body.name,
        photos: [],
        description: req.body.description
    }

    if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
            body.photos.push({ url: req.files[i].filename })
        }
    }

    let newHotel = new Hotel(body)

    newHotel.save().then((result) => {
        res.status(200).json()
    }).catch(e => {
        console.log(e);
        res.status(400).json()
    })

    res.json({ msg: "Success" })
})

router.get('/', (req, res) => {
    Hotel.find().then((result) => {
        res.status(200).json({ countries: result })
    }).catch(e => {
        console.log(e);
        res.status(400).json()
    })

})

router.get('/view/:id', (req, res) => {
    let id = req.params.id

    Hotel.findById(id).then((result) => {

        if (!result) {
            res.status(404).json()
        } else {
            res.status(200).json(result)
        }
    }).catch(e => {
        console.log(e);
        res.status(400).json()
    })

})

router.delete('/:id', (req, res) => {
    let id = req.params.id

    Hotel.findByIdAndRemove(id).then((result) => {

        if (!result) {
            res.status(404).json()
        } else {
            res.status(200).json()
        }
    }).catch(e => {
        console.log(e);
        res.status(400).json()
    })
})

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
}

module.exports = router