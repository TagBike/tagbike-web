import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Button from '@iso/components/uielements/button';

const InjectMessage = props => { 
    const values  = props.values;
    let messages = {};
    if(values) {
        Object.keys(values).forEach(key => {
            if(typeof values[key] === "object" && 'value' in values[key]) {
                if('path' in values[key]) {
                    messages[key] = <Link target="_blank" to={values[key].path}>
                            <Button type="link" size="small">
                                {values[key].value}
                            </Button>
                            </Link>;
                } else {
                    messages[key] = <Button type="link" size="small">
                                {values[key].value}
                            </Button>;
                }
            } else if(typeof values[key] === "object") {
                messages[key] = values[key];
            }  else {
                messages[key] = <Button type="link" size="small">
                        {values[key]}
                    </Button>;
            }           
        });
    }

    return <FormattedMessage {...props} values={messages}/> 
};
export default injectIntl(InjectMessage);
