const express = require('express');
const nodeWebCam = require('node-webcam');
const axios = require('axios').default;
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();

app.use(express.static(__dirname));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/face-recog');

User.create({
	matricNumber: '16_ENG04_001',
	firstName: 'Mercy',
	lastName: 'Dafe',
	college: 'Engineering',
	department: 'Electrical / Electronics Engineering',
	isLoggedIn: false,
})
	.then((user) => {
		console.log(`Created User Successfully ${user}`);
	})
	.catch((err) => {
		console.log('Error While creating user', err);
	});

const opts = {
	width: 1280,
	height: 720,
	quality: 100,
	frames: 60,
	delay: 0,
	saveShots: true,
	output: 'jpeg',
	device: false,
	callbackReturn: 'location',
	verbose: false,
};

const webcam = nodeWebCam.create(opts);

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/take-photo', (req, res) => {
	res.json({
		matricNumber: '16/ENG04/014',
		firstName: 'Mercy',
		lastName: 'Dafe',
		college: 'Engineering',
		department: 'Electrical / Electronics Engineering',
		isSignedIn: true,
	});
	// res.render('index');
	// webcam.capture('test_picture', async (err, data) => {
	// 	if (err) {
	// 		return console.log(err);
	// 	}
	// 	try {
	// 		console.log('Checking databse......');
	// 		let foundRecord = await axios.post('http://127.0.0.1:5000/verify', {
	// 			img1: 'test_picture.jpg',
	// 		});
	// 		if (foundRecord.data.length < 1) {
	// 			return res.send('Face not recognised');
	// 		}

	// 		let fileName = foundRecord.data[0].identity;

	// 		let h = fileName.split('/');
	// 		let j = h[h.length - 1];
	// 		let l = j.split('.');

	// 		let matric = l[0];

	// 		console.log(matric);

	// 		let user = await User.findOneAndUpdate(
	// 			{ matricNumber: matric },
	// 			{ isLoggedIn: true, loggedInTime: 'D' },
	// 			true
	// 		);

	// 		if (user != null) {
	// 			res.send(user);
	// 		} else {
	// 			res.send('No user found');
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// });
});

app.get('/view-list', async (req, res) => {
	let users = await User.find({ isLoggedIn: true });

	res.render('view_students', { users: users });
});

app.listen(3000, () => console.log("We're up and running"));
