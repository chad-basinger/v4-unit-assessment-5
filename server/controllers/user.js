const { getQueriesForElement } = require("@testing-library/dom");
const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body;


        try {
            const results = await db.user.find_user_by_username([username])
            const existingUser = results[0]

            if(existingUser){
                return res.status(409).send('Username exists already')
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const {profile_pic} = `https://robohash.org/${username}.png`

            //add the user to the db and get back their id
            const registeredUser = await db.create_user([username, hash, profile_pic])
            //create a session for the user using the db response
            const user = registeredUser[0];
            req.session.user = {
                id: user.id,
                username: user.username,
                profile_pic: user.profile_pic
                
            }

            //send a response that includes the user session info
            res.status(201).send(req.session.user)
        }
        catch(err){
            console.log(err)
            return res.sendStatus(500)
        }
        
    },



    login: async(req, res) => {
        const {username, password} = req.body
        const foundUser = await req.app.get('db').user.find_user_by_username([username])

        const user = foundUser[0]

        if(!user){
            return res.status(403).send('Username does not exist.')
        }

        const isAuthenticated = bcrypt.compareSync(password, user.password)

        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password');
          }
        req.session.user = {
            id: user.id,
            username: user.username,
            profile_pic: user.profile_pic
        }
        return res.send(req.session.user)

    },

    getUser: (req, res) => {
        if(req.session.user){
            return res.send(req.session.user)
        }
        return res.status(404).send('no user logged in')
    },


    logout: async(req, res) => {
        req.session.destroy();
        return res.sendStatus(200)
    }
}