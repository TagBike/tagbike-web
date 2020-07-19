import styled from 'styled-components';
import { palette } from 'styled-theme';
import {
  boxShadow,
  borderRadius,
  transition,
} from '@iso/lib/helpers/style_utils';
import WithDirection from '@iso/lib/helpers/rtl';

const MapWrapper = styled.div`
    width: 100%;
    height: 100%;
    .mapboxgl-popup {
        max-width: 400px;
        height: 100px;
        font: 12px/20px 'Helvetica Neue', Arial, Helvetica,Roboto, sans-serif;
    }
`;

export default WithDirection(MapWrapper);
