'use strict';

const Router = require('koa-router');
const passport = require('koa-passport');

const Post = require('../models/Post');

const router = new Router().prefix('/posts');

//Create posts routes
router.post('/', passport.authenticate('jwt', { session: false }),
  async ctx => {
    const { body } = ctx.request.body;
    const { user } = ctx.state;
    ctx.body = await new Post({ body, user: user._id }).save();
    ctx.status = 201;
  });

router.get('/', async ctx => {
  const { query } = ctx;
  const { skip, limit } = query;
  delete query.skip;
  delete query.limit;
  const q = 'users' in query ?
    { user: { $in: query.users.split(',') } } : query;
  ctx.set('x-total-count', await Post.count(q));
  ctx.body = await Post
    .find(q)
    .sort({ createdDate: -1 })
    .skip(+skip)
    .limit(+limit);
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const post = await Post.findById(id);
  if (post) {
    ctx.body = post;
  } else {
    ctx.throw(404, 'Post has not been found');
  }
});

router.put('/', passport.authenticate('jwt', { session: false},
  async ctx => {
    const { _id, body } = ctx.request.body;
    const user = ctx.state.user._id;
    ctx.body = await Post.findOneAndUpdate(
      { _id, user },
      { $set: { body } },
      { new: true }
    );
  }
));

router.delete('/:_id', passport.authenticate('jwt', { session: false }),
  async ctx => {
    const { _id } = ctx.params;
    const user = ctx.state.user._id;
    await Post.findOneAndRemove({ _id, user });
    ctx.body = { message: 'Post has been deleted' };
  }
);

module.exports = router.routes();
