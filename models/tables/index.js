
module.exports = (db) => {
	/* 顺序应按照先主表 后从表的顺序排列 */
	return {
		User: require('./user')(db),
		Matches: require('./matches')(db),
		Series: require('./series')(db),
		Serie_images: require('./serie_images')(db),
		Organizers: require('./organizers')(db),
		Casinos: require('./casinos')(db),
		Countries: require('./countries')(db),
		Cities: require('./cities')(db),
	}
}
