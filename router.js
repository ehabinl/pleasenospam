const router = require('koa-router')();
const config = require('config');
const email = require('./controllers/email');
const sse = require('./controllers/sse');

router.get('/', async(ctx) => {
	await ctx.render('index', {
		pretty: config.app.prettyHtml,
		title: ' Disposal email',
		defaultAddress: 'ehakawati@' + config.mail.domains[Math.floor(Math.random() * config.mail.domains.length)],
		domains: config.mail.domains
	});
});

router.get('/:email.json', email.get);
router.get('/:email/test', email.test);
router.get('/:email/updates', sse.subscribe);
router.get('/:id.html', email.html);
router.get('/:id.txt', email.text);
router.get('/:id.raw', email.raw);
router.delete('/:id', email.delete);

module.exports = router;
