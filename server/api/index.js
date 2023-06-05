const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // for authenticatoin with jsonwebtokens

// for user authentication below 
// router.use(async (req, res, next) => {
//     const prefix = 'Bearer ';
//     const auth = req.header('Authorization');
  
//     if (!auth) { // nothing to see here
//       next();
//     } else if (auth.startsWith(prefix)) {
//       const token = auth.slice(prefix.length);
  
//       try {
//         const { id } = jwt.verify(token, process.env.JWT_SECRET);
  
//         if (id) {
//           req.user = await getUserById(id);
//           next();
//         }
//       } catch ({ name, message }) {
//         next({ name, message });
//       }
//     } else {
//       next({
//         name: 'AuthorizationHeaderError',
//         message: `Authorization token must start with ${ prefix }`
//       });
//     }
//   });

router.get('/health', async (req, res, next) => {
    res.status(200).json({
        uptime: process.uptime(),
        message: 'All is well',
        timestamp: Date.now()
    });
    next()
});


module.exports = router;