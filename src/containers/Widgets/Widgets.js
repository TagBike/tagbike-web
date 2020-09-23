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
  widgetPageStyle: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
};


const STICKER_WIDGET = [
  {
    number: '1000',
    text: 'Clientes',
    icon: 'ion-ios-people',
    bgColor: '#ffffff',
  },
  {
    number: '1000',
    text: 'Bicicletas ',
    icon: 'ion-android-bicycle',
    bgColor: '#ffffff',
  },
  {
    number: '1000',
    text: 'Etiquetas',
    icon: 'ion-ios-pricetag',
    bgColor: '#ffffff',
  },
];


export default function() {
  //const { rowStyle, colStyle } = basicStyle;

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
      <div style={styles.widgetPageStyle}>
        <Row style={{width:'100%'}}>
          {STICKER_WIDGET.map((widget, idx) => (
            <Col lg={8} md={12} sm={12} xs={12} key={idx}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <StickerWidget
                  number={widget.number}
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
