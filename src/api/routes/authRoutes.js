const Router = require('express').Router;
const AuthService = require('../../services/authService');

const route = Router();

function authRoutes(app) {
   app.use('/auth', route);
   
   route.post(
       '/signup',
       async (req, res, next) => {
            try {
                const authService = new AuthService();
                const result = await authService.SignUp(req.body);
                return res.status(201).json(result);
            } catch (err) {
                console.log(err);
                return next(err);
            }
       }
   );

   route.post(
       '/signin',
       async (req, res, next) => {
           try {
               const authService = new AuthService();
               const result = await authService.SignIn(req.body);
               return res.json(result);
           } catch (err) {
               console.log(err);
               return next(err);
           }
       }
   )
}

module.exports = authRoutes;