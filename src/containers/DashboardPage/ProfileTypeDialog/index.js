import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form/immutable'
import { RadioButton } from 'material-ui/RadioButton'
import {
    RadioButtonGroup, TextField
} from 'redux-form-material-ui'
import { Card, CardHeader, CardTitle, CardText, CardActions } from 'material-ui/Card';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


import RaisedButton from 'material-ui/RaisedButton';

class ProfileTypeDialog extends Component {

    render() {
        const { handleSubmit, pristine, profile, reset, submitting, width } = this.props;

        const PlaceField = props =>
            <PlacesAutocomplete
                inputProps={{
                    ...props.input
                }}
            />

        return (<Card style={{ width: width }}>
            <CardHeader
                title={profile.displayName}
                subtitle={profile.userType || 'Unknown User Type'}
                avatar={profile.avatarUrl}
            />

            <CardTitle title="Welcome! before we can proceed you need to tell us a bit about your situation." subtitle="" />
            <CardText >
                <form onSubmit={handleSubmit}>

                    <Field style={{ marginLeft: "35%" }} name="userType" component={RadioButtonGroup}>
                        <RadioButton value="buyer" label="Buyer" />
                        <RadioButton value="seller" label="Seller" />
                        <RadioButton value="both" label="Both" />
                    </Field>


                    <Field
                        name="addressGoogle"
                        component={PlaceField}
                    />

                    <CardActions style={{ width: '100%', textAlign: 'right' }}>
                        <RaisedButton primary={true} type="submit" disabled={submitting} label="Save" />
                    </CardActions>

                </form>
            </CardText>

        </Card>
        )
    }
}




ProfileTypeDialog = reduxForm({
    form: 'profileTypeForm',
    initialValues: {
        userType: 'buyer'
    }
})(ProfileTypeDialog);



export default ProfileTypeDialog;