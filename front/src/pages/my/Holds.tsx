import React from 'react';
import { IUserHoldItem } from '@src/types';
import { caretIcon, formatInteger } from '@common/utils';
import './Holds.scss';

interface HoldsProps {
	holds: IUserHoldItem[];
}

const Holds = (props: HoldsProps) => {
	const { holds } = props;

	const getHold = (hold: IUserHoldItem) => {
		let status = ' ';
		if (hold.totalValuationProfit > 0) status = ' my__item--up';
		else if (hold.totalValuationProfit < 0) status = ' my__item--down';

		const profitRate = (hold.totalValuationPrice / hold.totalAskPrice) * 100 - 100;
		return (
			<tr className="my__item" key={hold.stockCode}>
				<td>
					<span className="my__item-unit">{hold.stockCode}</span>
					<br />
					<span className="my__item-title">{hold.stockName}</span>
				</td>
				<td className="my__item-center">{hold.holdAmount.toLocaleString()}</td>
				<td className="my__item-number">{formatInteger(hold.averageAskPrice)}</td>
				<td className="my__item-number">{formatInteger(hold.totalAskPrice)}</td>
				<td className={`my__item-number${status}`}>{formatInteger(hold.totalValuationPrice)}</td>
				<td className={`my__item-number${status}`}>
					{caretIcon(profitRate)} {profitRate.toLocaleString(undefined, { maximumFractionDigits: 2 })} %
				</td>
			</tr>
		);
	};

	return (
		<table className="my-holds">
			<thead className="my__legend">
				<tr className="my-legend-row">
					<th className="my__legend-left">종목명</th>
					<th className="my__legend-center">보유수량 (주)</th>
					<th className="my__legend-number">평균매수가 (원)</th>
					<th className="my__legend-number">매수금액 (원)</th>
					<th className="my__legend-number">평가금액 (원)</th>
					<th className="my__legend-number">평가손익</th>
				</tr>
			</thead>
			<tbody className="hold-items">
				{holds.length > 0 ? (
					holds.map((hold: IUserHoldItem) => getHold(hold))
				) : (
					<tr className="my__item">
						<td className="my__item-center">보유 종목이 없습니다.</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default Holds;
