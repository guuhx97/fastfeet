import multer from 'multer';

// configs
import multerConfig from '../../config/multer';

const upload = multer(multerConfig);

export default upload.single('file');
