const router = require('express').Router();

const userManager = require('../managers/userManager');

router.get('/:userId/profile', async (req, res) => {
    const userId = req.params.userId;

    const result = await userManager.getProfile(userId);
    res.json(result);
});

router.post('/register',async (req, res) => {
        const {username} = req.body;
        req.user = username;

    try {
        const result = await userManager.register(username);

        res.json(result);
        
    } catch (err) {
        res.status(400).json({
            message: 'Email already exists!',
        })
    }
});

router.post('/login', async (req, res) => {
    const {email} = req.body;
    req.user = email;
    try {
        const result = await userManager.login(email);

        res.json(result);
    } catch (err) {
            res.status(400).json({
                message: err.message
            });
    }

});

router.get('/logout', (req, res) => {
    // TODO: invalidate token
    res.end();
})

router.patch('/my-profile/edit', async (req, res) => {
    const userId = req.body._id;
    const editUser = await userManager.edit(userId, req.body);
    res.json(editUser);
});



module.exports = router;