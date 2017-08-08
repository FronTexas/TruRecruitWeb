import * as FirebaseActions from './firebase';
import * as UserActions from './users';

export const ActionCreators = Object.assign({},
	FirebaseActions,
	UserActions
);