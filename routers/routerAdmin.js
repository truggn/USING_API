const router = require("express-promise-router")();// handle try catch
const admin_Con = require("../App/http/controllers/adminController");
const {validateBody , validateParams, schemas } = require('../App/http/middleware/validate')
const multer = require('multer')
const path = require("path");


const storage = multer.diskStorage({
        destination: "./public/uploads",
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
router.route('/delete/:idMon').delete(admin_Con.destroy)
router.route('/phuc-hoi/:idMon')
        .patch(admin_Con.phuchoiData)
router.route('/:idMon/edit')
        .get(admin_Con.viewUpdateMon)
        .put(admin_Con.edit)
router.route('/logout-page')
      .post(admin_Con.logoutPage)

module.exports = router;