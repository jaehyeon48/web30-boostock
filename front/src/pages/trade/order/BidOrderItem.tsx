import React from 'react';
import { IBidOrderItem } from '@src/types';
import { formatNumber } from '@common/utils';
import ITotalAndMaxAmount from './ITotalAndMaxAmount';

interface IProps {
	bidOrder: IBidOrderItem;
	totalAndMaxAmount: ITotalAndMaxAmount;
	previousClose: number;
	volumeWidth: (amount: number, maxAmount: number) => string;
	setBidAskPrice: (price: number) => void;
	getPriceColorClass: (price: number, previousClose: number) => string;
}

const BidOrderItem = ({
	bidOrder,
	totalAndMaxAmount,
	previousClose,
	volumeWidth,
	setBidAskPrice,
	getPriceColorClass,
}: IProps) => {
	return (
		<tr>
			<td className="order-row-amount sell-amount" />
			<td className="order-row-price">
				<button
					type="button"
					className={`order-row-price-data order-buy ${getPriceColorClass(bidOrder.price, previousClose)}`}
					onClick={() => setBidAskPrice(bidOrder.price)}
				>
					{formatNumber(bidOrder.price)}
				</button>
			</td>
			<td className="order-row-amount buy-amount active">
				<button type="button" className="amount-button" onClick={() => setBidAskPrice(bidOrder.price)}>
					<div
						style={{
							width: volumeWidth(bidOrder.amount, totalAndMaxAmount.maxAmount),
						}}
						className="amount-bar buy-amount-bar"
					>
						&nbsp;
					</div>
					<p className="amount-text buy">{formatNumber(bidOrder.amount)}</p>
				</button>
			</td>
		</tr>
	);
};

export default BidOrderItem;
