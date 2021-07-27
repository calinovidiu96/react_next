import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';

const DUMMY_MEETUPS = [
	{
		id: 'm1',
		title: 'A First Meetup',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/2560px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg',
		address: 'Some address 1, 12345 Some City',
		description: 'This is a first meetup!',
	},
	{
		id: 'm2',
		title: 'A Second Meetup',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/7/79/Westminster_Abbey_by_Canaletto%2C_1749.jpg',
		address: 'Some address 2, 12345 Some City',
		description: 'This is a second meetup!',
	},
];

function HomePage(props) {
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta
					name='description'
					content='Some description for the meetup application'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</Fragment>
	);
}

// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;

// 	//fetch data from an API

// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export async function getStaticProps() {
	// getStaticProps() runs on server-side
	const client = await MongoClient.connect(
		'mongodb+srv://ovidiu:parolamea@cluster0.ijqyr.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollenction = db.collection('meetups');

	const meetups = await meetupsCollenction.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
