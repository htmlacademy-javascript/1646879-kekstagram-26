import './big-picture.js';
import './picture-effect.js';
import {renderPictures} from './pictures.js';
// import './form-validator.js';
import {setUserFormSubmit} from './form-validator.js';
import {getData} from './api.js';
import {closeUserModal} from './user-modal.js';


getData(renderPictures);
setUserFormSubmit(closeUserModal);

