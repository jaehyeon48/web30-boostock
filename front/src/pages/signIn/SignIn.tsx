import React from 'react';
import { useRecoilState } from 'recoil';
import TOAST from '@lib/toastify';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { IUser } from '@src/types';
import { userAtom } from '@recoil';
import { Emitter, getCookie } from '@common/utils';

import './SignIn.scss';

const SignIn = () => {
	const history = useHistory();
	const { pathname, search } = useLocation();
	const query = new URLSearchParams(search);
	const [userState, setUserState] = useRecoilState<IUser>(userAtom);

	const isSignUp = pathname === '/auth/signup';

	const TEXT = isSignUp ? '회원가입' : '로그인';
	const SWITCH_URL = isSignUp ? '/auth/signin' : '/auth/signup';
	const SWITCH_TEXT = isSignUp ? '기존 계정으로 로그인' : '새로운 계정으로 회원가입';

	if (userState.isLoggedIn) {
		return <Redirect to="/" />;
	}

	if (query.get('code')) {
		fetch(`${process.env.SERVER_URL}/api/auth/github/signin`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ code: query.get('code') }),
		}).then(async (res: Response) => {
			if (res.ok) {
				await res.json();
				Emitter.emit('REGISTER_ALARM', getCookie('alarm_token'));
				setUserState({ ...userState, isLoggedIn: true });
				history.push('/');
				TOAST.success('성공적으로 로그인 되었습니다.');
			} else {
				history.push('/auth/signin');
				TOAST.error('로그인에 실패했습니다. 잠시 후 재시도 해주세요.');
			}
		});
	}

	return (
		<div className="signin">
			<h1 className="sign-page-header">{TEXT}</h1>
			<a
				className="signin-button github-type"
				href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT}&redirect_uri=${window.location.href}/callback`}
			>
				Github로 {TEXT}
			</a>
			<div className="signin-hr">
				<div className="signin-hr-line" />
				<span>또는</span>
				<div className="signin-hr-line" />
			</div>
			<Link className="signin-button signup-type" to={SWITCH_URL}>
				{SWITCH_TEXT}
			</Link>
		</div>
	);
};

export default SignIn;
