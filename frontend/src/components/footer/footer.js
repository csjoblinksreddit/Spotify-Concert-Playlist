import React from 'react';
import { Row, Col } from 'antd';
import './footer.scss';

const Footer = () => {
	return(
		<Row id="footer-row">
			<Col style={{width: '50%'}}>Made by Miguel Zavala, Miguel VillAnueva and Hüseyin Bera Bulut</Col>
			<Col>@2020</Col>
		</Row>
	)
}

export default Footer