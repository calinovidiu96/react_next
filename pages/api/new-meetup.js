import { MongoClient } from 'mongodb';

// /api/new-meetuo

async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;

		const client = await MongoClient.connect(
			'mongodb+srv://ovidiu:parolamea@cluster0.ijqyr.mongodb.net/meetups?retryWrites=true&w=majority'
		);
		const db = client.db();

		const meetupsCollenction = db.collection('meetups');

		const result = await meetupsCollenction.insertOne(data);

		console.log(result);

		client.close();

		res.status(201).json({ message: 'Meetup inserted.' });
	}
}

export default handler;
