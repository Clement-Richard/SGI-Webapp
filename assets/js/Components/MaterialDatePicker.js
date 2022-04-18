import React, {Component} from 'react';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from'@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export default class MaterialDatePicker extends Component {
    constructor() {
        super()
        this.date = new Date()
        this.state = {
            birthDate: null
        }
    }

    render() {
      return (
          <LocalizationProvider 
          dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            label="Date de naissance"
            value={this.date}
            onChange= {(newDate) => {
                if(newDate != null){
                    this.date.setMonth(newDate.getMonth(), newDate.getDate());
                    this.date.setFullYear(newDate.getFullYear());
                    this.setState({
                        birthDate: newDate.toLocaleDateString()
                    });
                }
            }}
            renderInput={(params) => <TextField fullWidth margin="normal" required id="birthDate" name='birthDate' {...params} />}
          />
        </LocalizationProvider>
      );
    };
}