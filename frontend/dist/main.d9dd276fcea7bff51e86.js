/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const usersRequest = async () => {
    // const baseURL = `http://localhost:3000/users`;
    const baseURL = `https://mozgotren-clone-api.onrender.com/users`;
    try {
        const response = await fetch(baseURL, {
            method: 'GET',
        });
        return response.json();
    }
    catch (error) {
        console.log(error);
    }
};
(async () => {
    var _a;
    const users = await usersRequest();
    const usersHeader = document.createElement('h2');
    usersHeader.innerHTML = 'Users List';
    const userList = document.createElement('ul');
    for (let i = 0; i < users.length; i += 1) {
        const user = document.createElement('li');
        user.innerHTML = (`userID: ${users[i]._id} ***
       userName: ${users[i].username} ***
       userEmail: ${users[i].email}`);
        user.style.marginBottom = '10px';
        userList.append(user);
    }
    (_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.append(usersHeader, userList);
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (usersRequest);

/******/ })()
;
//# sourceMappingURL=main.d9dd276fcea7bff51e86.js.map