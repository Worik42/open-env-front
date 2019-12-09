import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createOrganisation } from '../api'

const Container = styled('div')`
`;

const FormContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 500px;
`

const ContainerContent = styled('div')`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 25px;
`

const SubmitButton = styled(Button)`
margin-top: 25px !important;
`

declare interface IDashboard {
}

class Dashboard extends Component<IDashboard> {
    state = {
        name: '',
        lon: 0,
        lat: 0,
        desc: ''
    };

    public componentDidMount() { }

    private submit = () => {
        const { desc, lat, lon, name } = this.state
        createOrganisation(name, lat, lon, desc).then((res) => {})
    }

    private handlerName = (value: any) => {
        this.setState({ name: value.target.value })
    }



    public render(): JSX.Element {
        return (
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            OpenEnv
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ContainerContent>
                    <Typography> Создание организации:</Typography>
                    <FormContainer>
                        <TextField id="standard-basic" onChange={this.handlerName} label="Введите название организации/мероприятия" variant="standard" />

                        <TextField id="filled-basic" label="Введите ширину" variant="standard" />

                        <TextField id="outlined-basic" label="Введите долготу" variant="standard" />
                        <TextField id="outlined-basic" label="Введите описание организации/мероприятия" variant="standard" />
                    </FormContainer>
                    <SubmitButton onClick={this.submit} variant="outlined">
                        Создать
                </SubmitButton>
                </ContainerContent>
            </Container>
        );
    }
}
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
