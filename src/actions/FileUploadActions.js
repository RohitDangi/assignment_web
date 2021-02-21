import Agent from '../services/RequestInstance';
import { ServerError } from '../utils/helpers';

import config from '../config/Config';
const BACKEND_URL = config.BACKEND_URL;

function uploadFile(payload, cb) {   
      Agent
        .fire('post', `${BACKEND_URL}/upload`)
        .send(payload)
        .end((err, res) => {
            var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
            if (typeof cb === 'function') return cb(error, res && res.body);
        });
}

function deleteFile(payload, cb) { 
    Agent
        .fire('delete', `${BACKEND_URL}/upload/removeFile`)
        .send(payload)
        .end((err, res) => {
            var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
            if (typeof cb === 'function') return cb(error, res && res.body);
        });
}
export default {
    uploadFile,
    deleteFile
}