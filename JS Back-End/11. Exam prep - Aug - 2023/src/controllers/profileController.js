const { guestGuard } = require('../middlewares/guards');
const profileService = require('../services/profileService');

const router = require('express').Router();

router.get('/profile', guestGuard, async (req, res) => {
    const posts = await profileService.getUserPosts(req.user._id, 'owner', 'firstName lastName');
    posts.map(post => post.votesCount = post.votes.length);
    res.render('profile', { posts });
    console.log(posts);
});

module.exports = router;
