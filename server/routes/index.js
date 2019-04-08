const router = require('express').Router();
const User = require('../models/User')


module.exports = router;

//npm run dev to start Nodemon, then check for the info inside of res.send(info) in browser.

/**
 * *User Routers.
 */
router.post('/users', (req, res) => {
    console.log(req.body)

    new User(req.body)
        .save().then(user => {
            res.send(user);
        }).catch(err => {
            res.status(400).send(err);
        })
});
router.post('/users/auth', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body)
        if (!user) return res.status(401).send('Wrong credentials')
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})
//find all users
router.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send(err);
    });
})
//find a specific user
router.get('/users/:user_id', (req, res) => {

    User.findById(req.params.user_id).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});
//delete a user
router.delete('/users/:user_id', (req, res) => {

    User.findByIdAndDelete(req.params.user_id).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.patch('/users/:user_id', (req, res) => {

    User.findByIdAndUpdate(
        req.params.user_id, {
            ...req.body
        }, {
            new: true,
            runValidators: true
        }).then(user => res.send(user)).catch(err => {
        res.status(400).send(err)
    })
});

router.put('/users/:user_id', (req, res) => {

    User.findByIdAndUpdate(
        req.params.user_id, {
            $set: {
                ...req.body
            }
        }, {
            new: true,
            runValidators: true
        }).then(user => res.send(user)).catch(err => {
        res.status(400).send(err)
    })
});

// register.hbs partials file info --------------------------------------------

router.get('/register', function (req, res, next) {
    res.render('register', {
        title: 'Sign Up'
    });
});

router.post('/register', function (req, res, next) {
    console.log(req.body);
    new User(req.body)
        .save()
        .then(() => {
            console.log('valid user');
            res.render('register', {
                message: 'User already exists'
            });

        })
        .catch((err) => {
            console.log('invalid registration');
            res.render('invalid registration', {
                error: 'Something went wrong, try again'
            });
        })
});

// Login page -------------------------------------------------------
router.get('/login', function (req, res, next) {
    console.log(req.body);
    res.render('login');
})
router.post('/login', function (req, res, next) {
    User.findOne(req.body)
        .then((user) => {
            console.log('valid login', user);
            if (user) {
                res.render('login', {
                    message: 'Welcome'
                });

            } else {
                res.render('login', {
                    error: 'Invalid login'
                })
            }
        })
})

module.exports = router;