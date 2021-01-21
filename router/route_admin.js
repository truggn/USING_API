const router = require("express-promise-router")();// handle try catch
const admin_Con = require("../controller/admin_Con");
const {validateBody , validateParams, schemas } = require('../helper/validate')
const multer = require('multer')
const path = require("path");


const storage = multer.diskStorage({
        destination: "./uploads/images",
        filename: (req, file, cb) => {
          return cb(null, `product_${Date.now()}${path.extname(file.originalname)}`);
        },
      });
      
      const upload = multer({
        storage: storage,
        limits: {
          fileSize: 10000000,
        },      
      })

router.route('/san-pham')
        .get(admin_Con.pageAdmin)
router.route('/san-pham/them-mon-an')
        .post(upload.single('hinhAnhThem'), validateBody(schemas.postproductSchema),  admin_Con.themMon)
router.route('/:idMon')
        .delete(admin_Con.deleteMon)
router.route('/phuc-hoi/:idMon')
        .patch(admin_Con.phuchoiData)
router.route('/:idMon/edit')
        .get(admin_Con.viewUpdateMon)
        .put(admin_Con.edit)

module.exports = router;