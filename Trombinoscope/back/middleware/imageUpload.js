const uploader = require("../utilities/fileUploader")

const avatarUpload = (req, res, next) => {
    const upload = uploader(
        ["image/jpg", "image/jpeg", "image/png"],
        100000000,
        req,
    );
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatars: {
                        msg: err.message,
                    },
                },
            })
        } else {
            next()
        }
    })
}


module.exports = avatarUpload