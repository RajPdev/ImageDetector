const handleProfile = (req, res, postgres)=> {
	const { id } = req.params;
	postgres.select('*').from('users').where({
		id: id
	})
	.then(user => {
		if (user.length) {
			res.json(user[0]);
		} else {
			res.status(400).json('not found');
		}
	})
	.catch(err => res.status(400).json('error updating user'));
	
}

module.exports = {
	handleProfile
};