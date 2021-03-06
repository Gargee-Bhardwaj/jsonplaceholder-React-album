import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Spinner from 'react-bootstrap/Spinner';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { updateIcon, deleteIcon } from '../../services/icons';
import { loadingImageUrl } from '../../services/consts';
import PhotoModal from '../PhotoModal';

const Presentation = props => {
	const cards = props.photos.map((photo, index) => {
		const title =
			props.isUpdating === index || props.isDeleting === index
				? 'Updating ...'
				: photo.title;
		const url =
			props.isUpdating === index || props.isDeleting === index
				? loadingImageUrl
				: photo.url;
		const isDisabled = props.isUpdating === index || props.isDeleting === index;

		return (
			<Card key={index}>
				<Card.Img
					variant='top'
					src={url}
					alt={`Invalid Url for Image #${photo.id}`}
				/>
				<Card.Body>
					<Card.Text>{title}</Card.Text>
					<ButtonGroup>
						<OverlayTrigger
							placement='bottom'
							overlay={<Tooltip>Update the Card</Tooltip>}
						>
							<Button
								variant='outline-info'
								onClick={props.onUpdateFormOpen(photo, index)}
								disabled={isDisabled}
							>
								{updateIcon}
							</Button>
						</OverlayTrigger>

						<OverlayTrigger
							placement='bottom'
							overlay={<Tooltip>Delete the Card</Tooltip>}
						>
							<Button
								variant='outline-danger'
								onClick={props.onCardDelete(photo, index)}
								disabled={isDisabled}
							>
								{deleteIcon}
							</Button>
						</OverlayTrigger>
					</ButtonGroup>
				</Card.Body>
			</Card>
		);
	});

	let render =
		props.isLoadingAlbum === true ? (
			<Alert show={true} variant='info' className='text-center'>
				<Alert.Heading>Loading the Current Album</Alert.Heading>
				<div>
					Please wait while the data is loading..
				</div>
				<div>
					If it takes longer than you can go back to the Home Page or reload.
				</div>
				<hr />
				<div className='text-right'>
					<Spinner animation='border' />
				</div>
			</Alert>
		) : cards.length <= 0 ? (
			<Alert show={true} variant='danger' className='text-center'>
				<Alert.Heading>This is an Invalid Album</Alert.Heading>
				<div>
					Please Enter a valid ID !
				</div>
				<hr />
				<div>
					You can go back to the{' '}
					<Alert.Link as={Link} to='/'>
						Home Page
					</Alert.Link>{' '}
					and try again.
				</div>
			</Alert>
		) : (
			<React.Fragment>
				<Button as={Link} to='/' block variant='secondary' className='mb-4'>
					Return to Home Page
				</Button>
				<CardColumns>{cards}</CardColumns>
				<Button block variant='primary' onClick={props.onCreateFormOpen}>
					Create a New Card
				</Button>
			</React.Fragment>
		);

	return (
		<React.Fragment>
			<Jumbotron>{render}</Jumbotron>

			<PhotoModal
				photo={props.updateFormPhoto}
				show={props.updateFormPhoto !== null}
				handleClose={props.onUpdateFormClose}
				handleSubmit={props.onUpdateFormSubmit}
			/>
			<PhotoModal
				show={props.createFormShow}
				handleClose={props.onCreateFormClose}
				handleSubmit={props.onCreateFormSubmit}
			/>
		</React.Fragment>
	);
};

export default Presentation;
