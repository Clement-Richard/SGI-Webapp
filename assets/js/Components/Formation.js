// ./assets/js/components/FormationForm.js
    
import React, {Component} from 'react';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from 'react-select'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import MaterialDatePicker from './MaterialDatePicker';
import FlashMessage from 'react-flash-message'

class Formation extends Component {
    constructor(props) {
        super(props);
        this.options = [
            { value: 1, label: 'Informatique' },
            { value: 2, label: 'Développement' },
            { value: 3, label: 'Systèmes et réseaux' },
            { value: 4, label: 'Autre' }
          ]
        this.state = {
            selectEnabled: false,
            message: "",
            error: ""
        };
        this.enableSelect = this.enableSelect.bind(this);
    }

    getAge(birthday) {
        let d = birthday.split("/");
        let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
        var ageDifMs = Date.now() - dat.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    enableSelect = () => {
        let name = document.getElementById('name').value;
        let firstname = document.getElementById('firstname').value;
        let address = document.getElementById('address').value;
        let birthDate = document.getElementById('birthDate').value;
        const data = {
            name: name,
            firstname: firstname,
            address: address,
            birthDate: birthDate,
        }
        if(this.verifyFields(data)){
            this.setState({message: `Bonjour ${name.toUpperCase()} ${firstname} vous avez ${this.getAge(birthDate)} ans et vous habitez à ${address}`})
            this.setState({ selectEnabled: true });
        }
    };

    verifyFields(data) {
        if(data.name == '') {
            this.setState({error: `Ce champ est requis: Nom`});
            return false
        }
        else if(data.firstname == '') {
            this.setState({error: `Ce champ est requis: Prénom`});
            return false
        }
        else if(data.address == '') {
            this.setState({error: `Ce champ est requis: Adresse`});
            return false
        }
        else if(data.birthDate == '') {
            this.setState({error: `Ce champ est requis: Date de naissance`});
            return false
        }
        else if(data.formation == '') {
            this.setState({error: `Ce champ est requis: Formation`});
            return false
        }
        else return true;
    }

    Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/home">
              SGI-Webapp
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
    }

    formationInSide() {
        const theme = createTheme();
        const handleSubmit = (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);

            const jsonData = {
                name: data.get('name'),
                firstname: data.get('firstname'),
                address: data.get('address'),
                birthDate: data.get('birthDate'),
                formation: data.get('formation')
            };

            console.log(JSON.stringify(jsonData));
    
            if(this.verifyFields(jsonData)){
                fetch("/sendEmail", {
                    method: "POST",
                    body: JSON.stringify(jsonData),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then(response => {
                    console.log(response)
                    if (response.status == 200) {
                        
                    } else {
                    }
                })
            }
        };
        
        return (
            <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?Network,Informatique,Work)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Avatar sx={{ m: 1, bgcolor: 'DodgerBlue' }}>
                    <ImportContactsIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Formation
                    </Typography>
                    <Box component="form" id='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        { this.state.error != '' &&  
                            <FlashMessage duration={15000}>
                                <strong>{this.state.error}</strong>
                            </FlashMessage>
                        }
                        <Typography>{this.state.message}</Typography>
                        <TextField margin="normal" required fullWidth id="name" label="Nom" name="name" type="text" autoComplete="name" autoFocus/>
                        <TextField margin="normal" required fullWidth name="firstname" label="Prénom" type="text" id="firstname" autoComplete="firstname"/>
                        <TextField margin="normal" required fullWidth name="address" label="Adresse" type="text" id="address" autoComplete="address"/>
                        <MaterialDatePicker/>
                        <Select options={this.options} id='formation' name='formation' isDisabled={!this.state.selectEnabled} placeholder='Formation'/>
                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={this.enableSelect}>
                            Confirmer les informations
                        </Button>
                        <Button type="submit" disabled={!this.state.selectEnabled}>
                            Envoyer
                        </Button>
                        <this.Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
                </Grid>
            </Grid>
            </ThemeProvider>
        );
    }

    render() {
        return (
            this.formationInSide()
        );
    }
}
    
export default Formation;