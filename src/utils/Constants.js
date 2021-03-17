const path = require('path');

function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define('IMAGE_EXTENSIONS' , /\.(jpe?g|png)$/i);
define('USER_TYPE_CUSTOMER','CUSTOMER');
define('FILE_TYPE','base64');
define('FOLDER_NAME','profile_image');
define('constants.DEFAULT_LIMIT',10);
define('constants.DEFAULT_OFFSET',0)