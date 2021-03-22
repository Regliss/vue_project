export default function authGuard({ next, router }) {
	if (!localStorage.getItem('token')) {
		return false;
	}
	return next();
}