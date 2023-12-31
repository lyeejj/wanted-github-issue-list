import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { IssueListType } from '../types/issueList.interface';
import { getIssueDetail } from '../api/api';
import IssueItem from '../components/IssueItem';
import Spinner from '../components/layout/Spinner';
import styles from '../styles/IssueDetail.module.scss';

function IssueDetail() {
	const [detail, setDetail] = useState<IssueListType>();
	const [loading, setLoading] = useState<boolean>(true);
	const { issue_number } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		getIssueDetail(Number(issue_number))
			.then((issue: any) => {
				setDetail(issue);
				setLoading(false);
			})
			.catch(error => {
				navigate('/error');
			});
	}, [issue_number, navigate]);

	if (loading) return <Spinner />;

	return (
		<>
			{detail && (
				<>
					<div className={styles['detail-info']}>
						<img src={detail.user?.avatar_url} alt="user-avatar-img" />
						<IssueItem item={detail} key={detail.id} />
					</div>
					<div className={styles['markdown-container']}>
						<ReactMarkdown>{detail.body}</ReactMarkdown>
					</div>
				</>
			)}
		</>
	);
}

export default IssueDetail;
