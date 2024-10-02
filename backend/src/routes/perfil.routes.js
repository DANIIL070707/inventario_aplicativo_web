import { Router } from 'express';
import { getImage, sendImage, upload } from '../controllers/perfilController.js';

const router = Router();

router.post('/getImage', getImage);
router.put('/sendImage/:id',upload.single('file-upload'),sendImage)

export default router;
