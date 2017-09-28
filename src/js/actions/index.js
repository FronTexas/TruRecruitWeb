import * as EmailActions from './email';
import * as FirebaseActions from './firebase';
import * as UserActions from './users';
import * as TwilioActions from './twilio';

export const ActionCreators = Object.assign({},
	EmailActions,
	FirebaseActions,
	UserActions,
	TwilioActions
);