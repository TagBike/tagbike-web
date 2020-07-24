import React from 'react';
import clone from 'clone';
import { Row, Col } from 'antd';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import basicStyle from '@iso/assets/styles/constants';
import IsoWidgetsWrapper from './WidgetsWrapper';
import StickerWidget from './Sticker/StickerWidget';
import SaleWidget from './Sale/SaleWidget';
import VCardWidget from './vCard/vCardWidget';
import SocialWidget from './SocialWidget/SocialWidget';
import { isServer } from '@iso/lib/helpers/isServer';
import {
  TableViews,
  tableinfos,
  dataList,
} from '../Tables/AntTables/AntTables';
import IntlMessages from '@iso/components/utility/intlMessages';

const tableDataList = clone(dataList);
tableDataList.size = 5;
const styles = {
  wisgetPageStyle: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
};


const STICKER_WIDGET = [
  {
    number: '1',
    text: 'CLientes',
    icon: 'ion-email-unread',
    fontColor: '#ffffff',
    bgColor: '#7266BA',
  },
  {
    number: '1',
    text: 'Contratos',
    icon: 'ion-android-camera',
    fontColor: '#ffffff',
    bgColor: '#42A5F6',
  },
  {
    number: '1',
    text: 'Orçamentos ',
    icon: 'ion-chatbubbles',
    fontColor: '#ffffff',
    bgColor: '#7ED320',
  },
  {
    number: '1',
    text: 'Vendas',
    icon: 'ion-android-cart',
    fontColor: '#ffffff',
    bgColor: '#F75D81',
  },
];


export default function() {
  const { rowStyle, colStyle } = basicStyle;

  const chartEvents = [
    {
      eventName: 'select',
      callback(Chart) {},
    },
  ];

  const stackConfig = {
    
    width: !isServer && window.innerWidth < 450 ? 300 : 500,
  };
  return (
    <LayoutWrapper>
      <div style={styles.wisgetPageStyle}>
        <Row style={rowStyle} gutter={0} justify="start">
          {STICKER_WIDGET.map((widget, idx) => (
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle} key={idx}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number={<IntlMessages id={widget.number} />}
                  text={<IntlMessages id={widget.text} />}
                  icon={widget.icon}
                  fontColor={widget.fontColor}
                  bgColor={widget.bgColor}
                />
              </IsoWidgetsWrapper>
            </Col>
          ))}
        </Row>
      </div>
    </LayoutWrapper>
  );
}
